import { AuthOptions, TokenSet } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { JWT } from "next-auth/jwt";

function requestRefreshOfAccessToken(token: JWT) {
  return fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: `${process.env.KEYCLOAK_CLIENT_ID}`,
      client_secret: `${process.env.KEYCLOAK_CLIENT_SECRET}`,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken!,
    }),
    method: "POST",
    cache: "no-store",
  });
}

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: `${process.env.KEYCLOAK_CLIENT_ID}`,
      clientSecret: `${process.env.KEYCLOAK_CLIENT_SECRET}`,
      issuer: `${process.env.KEYCLOAK_ISSUER}`,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 30,
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.idToken = account.id_token;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
        return token;
      }

      if (Date.now() < token.expiresAt! * 1000 - 60 * 1000) {
        return token;
      } else {
        console.log("Token has expired. Will refresh...");
        try {
          const response = await requestRefreshOfAccessToken(token);
          const tokens: TokenSet = await response.json();

          if (!response.ok) throw tokens;

          const updatedToken: JWT = {
            ...token,
            idToken: tokens.id_token,
            accessToken: tokens.access_token,
            expiresAt: Math.floor(
              Date.now() / 1000 + (tokens.expires_in as number)
            ),
            refreshToken: tokens.refresh_token ?? token.refreshToken,
          };
          console.log("Token is refreshed.");
          return updatedToken;
        } catch (error) {
          console.error("Error refreshing access token", error);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
  events: {
    async signOut({ token }: { token: JWT }) {
      const logOutUrl = new URL(
        `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout`
      );
      logOutUrl.searchParams.set("id_token_hint", token.idToken!);
      await fetch(logOutUrl);
    },
  },
};