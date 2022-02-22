import React from 'react';
import UserLogin from '../components/UserLogin';
import UserService from '../services/UserService'


export class LoginView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    login(user) {
        // console.log("logın functıon....."+ user.email + user.password);
        UserService.login(user.email, user.password).then((data) => {
            this.props.history.push('/');
        }).catch((e) => {
            console.error(e);
            this.setState({
                error: e
            });
        });
    }
                
    render() {
        return (
            <div>
                <img className="user-login-bg"
                    src={require('../img/bg-1.jpg')}
                    width="100%"
                    height="auto"
                />

                <UserLogin onSubmit={(user) => { console.log("this is called"+ user); this.login(user)}} error={this.state.error}></UserLogin>
            </div>
           
        );
    }
}