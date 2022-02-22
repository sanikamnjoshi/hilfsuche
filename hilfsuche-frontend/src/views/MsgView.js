import React, { Component } from 'react';
import axios from 'axios';
import { FormControl, Row, Col, Container } from 'react-bootstrap';
import UserService from '../services/UserService';
import MailService from '../services/MailService';
import Page from '../components/Page'

export default class MsgView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fromUserId: '',
      toUserId: '',
      subject: '',
      msgContent: ''
    };

    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.onChangeMsgContent = this.onChangeMsgContent.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3000/posts/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          subject: response.data.title,
          toUserId: response.data.creatorUserId
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  onChangeSubject(e) {
    console.log('OCSubject called')
    this.setState({
      subject: e.target.value
    });
  }

  onChangeMsgContent(e) {
    console.log('OCMC called')
    this.setState({
      msgContent: e.target.value
    });
  }


  // onsubmit
  onSubmit(e) {
    e.preventDefault();

    const newMsg = {
      toUserId: this.state.toUserId,
      fromUserId: UserService.getCurrentUser().id,
      title: this.state.subject,
      content: this.state.msgContent
    };

    console.log(newMsg)

    axios.post('http://localhost:3000/msg', newMsg)
      .then(res => console.log(res.data)).then(alert("Message sent successfully!")).then(this.props.history.push('/'))
  }

  render() {
    return (
      <Page>
        <Container style={{padding:'5% 0 30% 0'}} >
        <Row className="justify-content-center">
          <h3>Message on Post</h3>
        </Row>
        <Row className="justify-content-center">
          <Col xs={8}>

            <form onSubmit={this.onSubmit}>


              <div className="form-group">
                <label>Subject: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.subject}
                  onChange={this.onChangeSubject}
                  required={true}
                />
              </div>


              <div className="form-group">
                <label>Message: </label>
                <textarea
                  className="form-control"
                  value={this.state.msgContent}
                  onChange={this.onChangeMsgContent}
                  required={true}
                  rows={4}
                />
              </div>


              <div className="form-group">
                <input type="submit" value="Send Message" className="btn btn-primary" />
              </div>

            </form>
          </Col>
        </Row>
        </Container>
        </Page>
    )
  }
}