import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, Button, Container } from 'react-bootstrap';
import UserService from '../services/UserService';
import { SimpleLink } from './SimpleLink';
import Page from '../components/Page';

export default class PostDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: '',
      title: '',
      location: [],
      locationName: '',
      category: '',
      content: '',
      isGiver: '',
      isFullfilled: false,
      creatorUserId: ''
    }
  }


  componentDidMount() {
    axios.get('http://localhost:3000/posts/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          id: response.data._id,
          title: response.data.title,
          location: response.data.location,
          locationName: response.data.locationName,
          category: response.data.category,
          content: response.data.content,
          isFullfilled: response.data.isFullfilled,
          creatorUserId: response.data.creatorUserId
        })
      })
      .catch(function (error) {
        console.log(error);
      })

    console.log('user Id fetched: ' + UserService.getCurrentUser().id)
  }

  onClickContact() {
    this.props.history.push("/sendmessage/"+this.state.id);
  }

  onClickEdit() {
    this.props.history.push("/editpost/"+this.state.id);
  }

  render() {
    return (
      <Page>
        <Container style={{padding:'5% 0 30% 0'}} >
        <Row className="justify-content-center m-5">
          <h3>Post Details</h3>
        </Row>
        <Row className="justify-content-center">
          <Col xs={8}>


            <form>
              <div className="form-group">
                <label>Title: </label>
                <input type="text"
                  className="form-control"
                  value={this.state.title}
                  disabled
                />
              </div>

              {/* this has to be autocomplete / dropdown, ideally */}
              <div className="form-group">
                <label>Location: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.locationName}
                  disabled
                />
              </div>

              {/* this has to be a dropdown, ideally */}
              <div className="form-group">
                <label>Category: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.category}
                  disabled
                />
              </div>

              <div className="form-group">
                <label>Description: </label>
                <textarea
                  type="text"
                  className="form-control"
                  value={this.state.content}
                  rows={4}
                  disabled
                />
              </div>

              <div className="form-check">
                <input className="form-check-input"
                  id="completedCheckbox"
                  type="checkbox"
                  name="completedCheckbox"
                  checked={this.state.isFullfilled}
                  value={this.state.isFullfilled}
                  disabled
                />
                <label className="form-check-label" htmlFor="completedCheckbox">
                  This post has been fulfilled.
                </label>
              </div>

              {this.state.creatorUserId == UserService.getCurrentUser().id ? 
                <Button className="btn-main" size="lg" onClick={this.onClickEdit.bind(this)}>
                 {/* <SimpleLink to={`/editpost/${this.state.id}`} >Edit</SimpleLink> */}
                  Edit
                </Button> 
                :
                <Button className="btn-main" size="lg" onClick={this.onClickContact.bind(this)}>
                  Contact
                </Button>}
                
            </form>
          </Col>
        </Row>
        </Container>
      </Page>
    )
  }
}
