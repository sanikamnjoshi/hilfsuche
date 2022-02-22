import React from 'react';
import { Card,CardTitle,CardText, Button, TextField } from 'react-md';
import { withRouter, Link } from 'react-router-dom';

import { AlertMessage } from './AlertMessage';


const style = { maxWidth: 500 };


class UserLogin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email : '',
            password : ''
        };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeEmail(value) {
        this.setState(Object.assign({}, this.state, {email: value}));
    }

    handleChangePassword(value) {
        this.setState(Object.assign({}, this.state, {password: value}));
    }

    handleSubmit(event) {
        event.preventDefault();

        let user = {
            email: this.state.email,
            password: this.state.password
        };
        
        this.props.onSubmit(user);
    }

    render() {
        return (
                <Card style={style} className="md-block-centered card-login">
                    <CardTitle title="User Login" subtitle="Welcome back!" />
                    <CardText>
                        <form onSubmit={this.handleSubmit} onReset={() => this.props.history.goBack()}>
                            <TextField
                                label="E-mail"
                                id="LoginField"
                                type="text"
                                className="md-row"
                                required={true}
                                value={this.state.email}
                                onChange={this.handleChangeEmail}
                                errorText="Login is required"/>
                            <TextField
                                label="Password"
                                id="PasswordField"
                                type="password"
                                className="md-row"
                                required={true}
                                value={this.state.password}
                                onChange={this.handleChangePassword}
                                errorText="Password is required"/>

                            <Button id="submit" type="submit"
                                    disabled={this.state.email == undefined || this.state.email == '' || this.state.password == undefined || this.state.password == '' ? true : false}
                                    raised primary className="md-cell md-cell--2"
                                    >Login</Button>
                            <Button id="reset" type="reset" raised secondary className="md-cell md-cell--2">Dismiss</Button>
                            <Link to={'/register'} className="md-cell">Not registered yet?</Link>
                            <AlertMessage className="md-row md-full-width" >{this.props.error ? `${this.props.error}` : ''}</AlertMessage>
                        </form>
                    </CardText>
                </Card>
           
        );
    }
};

export default withRouter(UserLogin);