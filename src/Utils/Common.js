  export const setTokenLocal = (token,language) => {
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('language', JSON.stringify(language));
  }
  export const getTokenLocal = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken
  }
  export const getlanguage = () => {
    let language = localStorage.getItem('language');
    let userlanguage = JSON.parse(language);
    if(userlanguage) {
      return userlanguage
    }else{
      return 'en'
    }
  }



