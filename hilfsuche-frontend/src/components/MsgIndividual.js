import React, { Component } from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';
import UserService from '../services/UserService';
import Page from '../components/Page';
import MsgService from '../services/MsgService';

export default class PostDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      msgId: '',
      subject: '',
      msgContent: '',
      fromUserId: ''
    }
  }


  componentDidMount() {

    MsgService.getMsg(this.props.match.params.id).then((data) => {
      this.setState({
        msgId: data._id,
        subject: data.title,
        msgContent: data.content,
        fromUserId: data.fromUserId
      });
    }).catch((e) => {
      console.error(e);
    });
  }

  onClickReply() {
    this.props.history.push("/sendreply/" + this.state.fromUserId);
  }

  render() {
    return (
      <Page>
        <Container style={{ padding: '5% 0 30% 0' }} >
          <Row className="justify-content-center">
            <h3>Message</h3>
          </Row>
          <Row className="justify-content-center">
            <Col xs={8}>


              <form>
                <div className="form-group">
                  <label>Subject: </label>
                  <input type="text"
                    className="form-control"
                    value={this.state.subject}
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label>Message: </label>
                  <textarea
                    className="form-control"
                    value={this.state.msgContent}
                    disabled
                    rows={4}
                  />
                </div>

                {this.state.fromUserId != UserService.getCurrentUser().id ?
                  <Button className="btn-main" size="lg" onClick={this.onClickReply.bind(this)}>
                    Reply
              </Button>
                  :
                  <div></div>}

              </form>
            </Col>
          </Row>
        </Container>
      </Page>
    )
  }
}
