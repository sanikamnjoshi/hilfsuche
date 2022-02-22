import React from 'react';
import Page from '../components/Page';
import {Container, Row, Col} from 'react-bootstrap';
import UserService from '../services/UserService';

export class UserProfileView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            current: UserService.getCurrentUser(),
            hide: 1
        };
    }

    render() {

        return (
            <Page>
                <Row className="justify-content-center m-5">
                    <h1>Persönliche Information</h1>
                </Row>

                <Row className="justify-content-center">
                    <Col xs={3}>
                        <img href="#" className="mb-3" style={{height: '100px', width: '100px', background: '#000'}}/>
                        <h3 alt="username">{this.state.current.firstName}</h3>

                    </Col>
                    <Col xs={2}>
                        <p className="item-tag">First Name:  </p>
                        <p className="item-tag">Last Name:  </p>
                        <p className="item-tag">Email:</p>
                        <p className="item-tag">Tel:</p>
                    </Col>
                    <Col xs={3}>
                        <p>{this.state.current.firstName}</p>
                        <p>{this.state.current.lastName} </p> 
                        <p>{this.state.current.email} </p>
                        <p>{this.state.current.phoneNr}</p>
                    </Col>
                </Row>
            </Page>
        );
    }
}