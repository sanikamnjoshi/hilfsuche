import React from 'react';
import Page from '../components/Page';
import MsgService from '../services/MsgService';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import MsgList from '../components/MsgList';
import UserService from '../services/UserService';

export class UserMessageView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      msgs: [],
      msgsSent: [],
      msgsReceived: [],
      activeKey: 1
    };

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  componentWillMount() {
    this.setState({
      loading: true
    });

    MsgService.getMsgList().then((data) => {
      this.setState({
        msgs: [...data],
        loading: false
      });
    }).catch((e) => {
      console.error(e);
    });

  }


  handleTabChange(value) {
    console.log("activeKey: " + value);
    this.setState({
      activeKey: value
    });
  }


  render() {
    return (
      <Page>
        <Container style={{padding:'5% 0 30% 0'}} >
          <Row className="justify-content-center m-5">
            <h1>Inbox</h1>
          </Row>
          <Row className="justify-content-center">
            <Col xs={10}>
              <Tabs id="uncontrolled-tab-example" className="something" activeKey={this.state.activeKey} onSelect={this.handleTabChange}>
                <Tab eventKey="1" title="All">
                  <MsgList msgs={this.state.msgs} keyValue={this.state.activeKey} />
                </Tab>
                <Tab eventKey="2" title="Received">
                  <MsgList msgs={this.state.msgs} keyValue={this.state.activeKey} />
                </Tab>
                <Tab eventKey="3" title="Sent">
                  <MsgList msgs={this.state.msgs} keyValue={this.state.activeKey} />
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>
      </Page>
    );
  }
}