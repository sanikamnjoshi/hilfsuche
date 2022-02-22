import HttpService from './HttpService';
import UserService from './UserService';

export default class MsgService {
    constructor() {
        this.state = {
            userId: UserService.getCurrentUser().id     // @TODO: Do I need to repeat this?
        };
    }
    
    static baseURL() {return "http://localhost:3000/msg"; }
    

    static getMsgList() {
        console.log('----> MsgService: getMsgList() ----- get all msgs!!!');
        return new Promise((resolve, reject) => {
            HttpService.get(`${MsgService.baseURL()}`, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    /* get msg with id - msg detail view*/
    static getMsg(id) {
        console.log('----> MsgService: getMsg()');

        return new Promise((resolve, reject) => {
            HttpService.get(`${MsgService.baseURL()}/${id}`, function(data) {
                if(data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving msg');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
 
    /* send msg */
    static sendMsg(msg) {
        console.log('----> MsgService: sendMsg()');
        
        return new Promise((resolve, reject) => {
            HttpService.post(MsgService.baseURL(), msg, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
}
