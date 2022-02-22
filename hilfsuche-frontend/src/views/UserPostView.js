import React from 'react';
import Page from '../components/Page';
import PostList from '../components/PostList'
import { Container, Row, Col } from 'react-bootstrap';
import UserService from '../services/UserService';

export class UserPostView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userId: '',
      hide: 1
    }
  }

  componentDidMount() {
    const localUserId = UserService.getCurrentUser().id
    this.setState({
      userId: localUserId
    })
    console.log('user Id fetched: '+ UserService.getCurrentUser().id)
  }
  /*
      componentWillMount(props){
          this.setState({
              loading: true
          });
  
          let id = this.props.match.params.id;
      }
  */
  render() {
    console.log('user Id saved: '+ this.state.userId)

    return (
      <Page>
        <Container style={{padding:'5% 0 30% 0'}} >

          <Row className="justify-content-center m-5">
            <h1>My Posts</h1>
          </Row>

          <Row className="justify-content-center">
            <Col xs={10}>
              <PostList userId={this.state.userId} />
            </Col>
          </Row>
        </Container>
      </Page>
    );
  }
}