  import LocalStorageConstants from '../Constants/LocalStorageConstants'
  export const setTokenLocal = (token) => {
    localStorage.setItem(LocalStorageConstants.KEYS.JWTToken, JSON.stringify(token));
  }
  export const getTokenLocal = () => {
    const tokenString = localStorage.getItem(LocalStorageConstants.KEYS.JWTToken);
    const userToken = JSON.parse(tokenString);
    return userToken
  }




