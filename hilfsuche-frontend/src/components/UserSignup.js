import React from 'react';
import { Card, CardTitle, CardText, Button, TextField, SelectionControl } from 'react-md';
import { withRouter } from 'react-router-dom';
import { AlertMessage } from './AlertMessage';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";


class UserSignup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            phoneNr: '',
            firstName: '',
            lastName: '',
            userName : '',
            password : '',
            subscribe: 'true'
        };
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeSubscribe = this.handleChangeSubscribe.bind(this);
        this.handleChangephoneNr = this.handleChangephoneNr.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangephoneNr(value) {
        this.setState(Object.assign({}, this.state, {phoneNr: value}));
    }

    handleChangeEmail(value) {
        this.setState(Object.assign({}, this.state, {email: value}));
    }

    handleChangeUserName(value) {
        this.setState(Object.assign({}, this.state, {userName: value}));
    }

    handleChangeFirstName(value) {
        this.setState(Object.assign({}, this.state, {firstName: value}));
    }

    handleChangeLastName(value) {
        this.setState(Object.assign({}, this.state, {lastName: value}));
    }


    handleChangePassword(value) {
        this.setState(Object.assign({}, this.state, {password: value}));
    }

    handleChangeSubscribe(value) {
        this.setState(Object.assign({}, this.state, {subscribe: value}));
    }

    handleSubmit(event) {
        event.preventDefault();

        let user = {
            userName: this.state.userName,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phoneNr: this.state.phoneNr,
            password: this.state.password,
            subscribe: this.state.subscribe
        };
        console.log('register' + JSON.stringify(user));

        this.props.onSubmit(user);
    }

    /**
     * ATTENTION:
     * fist TextField: I thought we are going to use Email instead of UserName
     */
    render() {
        return (
            <Card className="md-block-centered card-register">
                 <CardTitle title="Register with E-Mail" subtitle=""/>
                    <CardText>
                    <form onSubmit={this.handleSubmit} onReset={() => this.props.history.goBack()}>
                        <TextField
                            label="Email"
                            id="EmailField"
                            type="email"
                            className="md-row"
                            required={true}
                            value={this.state.email}
                            onChange={this.handleChangeEmail}
                            errorText="Please enter a valid email adress"/>

                        <TextField
                            label="firstName"
                            id="firstNameField"
                            type="text"
                            className="md-cell--6"
                            required={true}
                            value={this.state.firstName}
                            onChange={this.handleChangeFirstName}
                            errorText="first name is required"
                            fullWidth={false}/>

                        <TextField
                            label="lastName"
                            id="lastNameField"
                            type="text"
                            className="md-cell--6"
                            required={true}
                            value={this.state.lastName}
                            onChange={this.handleChangeLastName}
                            errorText="last name is required"
                            fullWidth={false}/>

                        <TextField
                            label="UserName"
                            id="UserNameField"
                            type="text"
                            className="md-row"
                            required={true}
                            value={this.state.userName}
                            onChange={this.handleChangeUserName}
                            errorText="Username is required"/>

                        <TextField
                            label="Password"
                            id="PasswordField"
                            type="password"
                            className="md-row"
                            required={true}
                            value={this.state.password}
                            onChange={this.handleChangePassword}
                            errorText="Password is required"/>
                        
                        <TextField
                            id="phone-number-with-icon-left"
                            label="Phone"
                            type="tel"
                            required={true}
                            rightIcon={<FontAwesomeIcon icon={faPhone} className="fa-xs"/>}
                            value={this.state.phoneNr}
                            onChange={this.handleChangephoneNr}
                            errorText="Please enter a valid phone number"
                        />

                        <SelectionControl
                            id="register-sub-check"
                            name="simple-checkboxes[]"
                            label="Subscribe Newsletter"
                            type="checkbox"
                            value={this.state.message}
                            onChange={this.handleChangeSubscribe}
                            defaultChecked
                            />

                        <Button id="submit" type="submit"
                                disabled={this.state.userName == undefined || this.state.userName == '' || this.state.password == undefined || this.state.password == '' ? true : false}
                                raised primary className="md-cell md-cell--2">Register</Button>
                        <Button id="reset" type="reset" raised secondary className="md-cell md-cell--2">Dismiss</Button>
                        <AlertMessage className="md-row md-full-width" >{this.props.error ? `${this.props.error}` : ''}</AlertMessage>
                    </form>
                </CardText>
            </Card>
        );
    }
};

export default withRouter(UserSignup);