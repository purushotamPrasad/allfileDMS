import Cookies from 'js-cookie';
const ACCESS_TOKEN_KEY = 'admin_auth_token';
const REFRESH_TOKEN_KEY = 'admin_refresh_token';



export const setToken = (accessToken: string, accessTokenExpiresAt: any, refreshToken: any, refreshTokenExpiresAt: any): void => {


  const accessTokenExpirationDate = new Date(Date.now() + accessTokenExpiresAt);
  const refreshTokenExpirationDate = new Date(Date.now() + refreshTokenExpiresAt);
  
  Cookies.set(ACCESS_TOKEN_KEY, accessToken, { expires: accessTokenExpirationDate });
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { expires: refreshTokenExpirationDate });

};

export const getToken = ():  string | undefined => {
  if(!Cookies.get(ACCESS_TOKEN_KEY)){
    
    if(!Cookies.get(REFRESH_TOKEN_KEY)){
      return undefined;
    }
    else{
      return Cookies.get(REFRESH_TOKEN_KEY)
    }
  } else {
    return Cookies.get(ACCESS_TOKEN_KEY);
  }
};


export const removeToken = (): void => {
  Cookies.remove(ACCESS_TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
};

export const logout = (): void => {
   removeToken();
    // Clear the inactivity timer
   
};