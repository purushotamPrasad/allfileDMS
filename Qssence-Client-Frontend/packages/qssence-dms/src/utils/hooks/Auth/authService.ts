import Cookies from 'js-cookie';
const ACCESS_TOKEN_KEY = 'admin_auth_token';
const REFRESH_TOKEN_KEY = 'admin_refresh_token';

let inactivityTimer: NodeJS.Timeout | null = null;
const INACTIVITY_TIMEOUT = 60 * 60 * 1000;

const startInactivityTimer = (): void => {
  if (inactivityTimer) {
    clearTimeout(inactivityTimer);
  }
  inactivityTimer = setTimeout(() => {
    logout();
  }, INACTIVITY_TIMEOUT);
};

const resetInactivityTimer = (): void => {
  startInactivityTimer();
};

export const setToken = (accessToken: string, accessTokenExpiry: any, refreshToken: string): void => {
  const now = new Date();
  const futureExpirationTime = new Date(now.getTime() + Number(accessTokenExpiry) * 1000);
  Cookies.set(ACCESS_TOKEN_KEY, accessToken, { expires: futureExpirationTime});
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken);

  startInactivityTimer();
};

export const getToken = ():  string | undefined => {
  if(!Cookies.get(ACCESS_TOKEN_KEY)){
    return undefined;
  } else {
    return Cookies.get(ACCESS_TOKEN_KEY);
  }
};

export const getRefreshToken = (): string | undefined => {
  return Cookies.get(REFRESH_TOKEN_KEY);
};

export const removeToken = (): void => {
  Cookies.remove(ACCESS_TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
};

export const logout = (): void => {
 // removeToken();
    // Clear the inactivity timer
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }
};

// Set up event listeners to reset inactivity timer on user activity
// ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'].forEach(event => {
//   window.addEventListener(event, resetInactivityTimer);
// });
