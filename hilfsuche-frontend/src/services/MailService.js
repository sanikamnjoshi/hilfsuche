import HttpService from './HttpService';

export default class MailService {
    constructor() {
    }
    
    static baseURL() {return "http://localhost:3000/mail"; }
/*
    static sendmail (mail) {
        alert('MailService💃');
        console.log('HTTPSERVICE url: ' + MailService.baseURL() + '/sendemail');
        console.log('MAIL:' + mail);
    
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${MailService.baseURL()}/sendemail`, 
                {mail: mail}, 
                function(data) {
                    console.log('POST SUCCESS');
                    resolve(data);
                }, 
                function(e) {
                    // console.log('POST FAILED');
                    reject(e)
                });
        })
    }
*/

    static sendmail(userName, email, subscribe) {
        console.log('Mailservice sendmail()' + userName + email + subscribe);
        return new Promise((resolve, reject) => {
            HttpService.post(`${MailService.baseURL()}/sendemail`, {
                userName: userName,
                email: email,
                subscribe: subscribe
            }, function(data) {
                // console.log('MailService: sendmail() resolve '+ data);
                resolve(data); 
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }


}
