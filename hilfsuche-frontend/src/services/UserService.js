import HttpService from './HttpService';

export default class UserService {
    constructor() {
    }

  static baseURL() { return "http://localhost:3000/auth"; }

  static register(data) {
    return new Promise((resolve, reject) => {
        HttpService.post(`${UserService.baseURL()}/register`, {
            userName: data.userName,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNr: data.phoneNr,
            password: data.password,
            subscribe: data.subscribe
        }, function(data) {
            resolve(data);
        }, function(textStatus) {
            reject(textStatus);
        });
    });
}


  static login(email, pass) {
    return new Promise((resolve, reject) => {
      HttpService.post(`${UserService.baseURL()}/login`, {
        email: email,
        password: pass
      }, function (data) {
        resolve(data);  // token Info
      }, function (textStatus) {
        reject(textStatus);
      });
    });
  }

  // don't need to contact server at all, just delete the token
  static logout() {
    window.localStorage.removeItem('jwtToken');
  }

  // save user name in token => get token using string-bearbeitung func
  // @TODO: Get more info about currentUser using HttpService
  static getCurrentUser() {
    let token = window.localStorage['jwtToken'];
    if (!token) return {};

    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');

    return {
      id: JSON.parse(window.atob(base64)).id,
      username: JSON.parse(window.atob(base64)).username,
      firstName: JSON.parse(window.atob(base64)).firstName,
      lastName: JSON.parse(window.atob(base64)).lastName,
      email: JSON.parse(window.atob(base64)).email,
      tel: JSON.parse(window.atob(base64)).phoneNr,
      subscribe: JSON.parse(window.atob(base64)).subscribe
    };

  }

  static isAuthenticated() {
    console.log(window.localStorage['jwtToken']);
    return !!window.localStorage['jwtToken'];
  }
}
