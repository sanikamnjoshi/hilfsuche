import React from 'react';
import UserSignup from '../components/UserSignup';
import UserService from '../services/UserService';
import MailService from '../services/MailService';


export class SignUpView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    signup(user) {
        console.log('singupview: ' + JSON.stringify(user));
        
        UserService.register(user).then((data) => {
            this.props.history.push('/');
        }).catch((e) => {
            console.error(e);
            this.setState({
                error: e
            });
        });

        // (3) subscribe
        MailService.sendmail(user.userName ,user.email, user.subscribe);
    }

    render() {
        return (
            <div>
                <img className="user-login-bg"
                    src={require('../img/bg-2.jpg')}
                    width="100%"
                    height="auto"
                />
            
                <UserSignup onSubmit={(user) => this.signup(user)} error={this.state.error}></UserSignup>
            </div>
        );
    }
}