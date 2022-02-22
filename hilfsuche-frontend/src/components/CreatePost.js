import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, Container, Dropdown } from 'react-bootstrap';
import UserService from '../services/UserService';
import { GeoSearch } from '../components/GeoSearch';
import Page from '../components/Page';

export default class CreatePost extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      location: [],
      locationName: '',
      category: 'Other',
      content: '',
      isGiver: false,
      isFullfilled: false,
      creatorUserId: ''
    };

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onChangeIsGiver = this.onChangeIsGiver.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // not sure if need to bind these last two
    this.handlePlaceSelectCP = this.handlePlaceSelectCP.bind(this);
    this.handlePlaceNameCP = this.handlePlaceNameCP.bind(this);

    console.log("CreatePost called!!!");
  }

  // methods to update state properties of post object
  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }
  onChangeLocation(e) {
    this.setState({
      location: e.target.value
    });
  }
  onChangeCategory(value) {
    this.setState({
      category: value
    });
  }
  onChangeContent(e) {
    this.setState({
      content: e.target.value
    });
  }
  onChangeIsGiver(e) {
    this.setState({
      isGiver: !this.state.isGiver
    });
  }

  handlePlaceSelectCP = (newCoordsCP) => {
    this.setState({
      location: newCoordsCP
    })
  }

  handlePlaceNameCP = (newPlaceName) => {
    this.setState({
      locationName: newPlaceName
    })
  }


  // onsubmit
  onSubmit(e) {
    e.preventDefault();

    console.log(`Form submitted:`);
    console.log(`Post Title: ${this.state.title}`);
    console.log(`Post Location: ${this.state.location}`);
    console.log(`Post Location Name: ${this.state.locationName}`);
    // console.log(`Post Category: ${this.state.category}`);
    console.log(`Post Content: ${this.state.content}`);
    console.log(`Post IsGiver: ${this.state.isGiver}`);
    console.log(`Post IsFullfilled: ${this.state.isFullfilled}`);
    console.log(`Post Creator User ID: ${this.state.creatorUserId}`);

    const newPost = {
      title: this.state.title,
      location: this.state.location,
      locationName: this.state.locationName,
      category: this.state.category,
      content: this.state.content,
      isFullfilled: this.state.isFullfilled,
      isGiver: this.state.isGiver,
      creatorUserId: UserService.getCurrentUser().id
    };


    this.setState({
      title: '',
      location: [],
      locationName: '',
      category: '',
      content: '',
      isGiver: false,
      isFullfilled: false,
      creatorUserId: ''
    })

    axios.post('http://localhost:3000/posts/add', newPost)
      .then(res => console.log(res.data)).then(alert("alert: Post is created successfully!")).then(this.props.history.push('/'))
  }

  render() {
    return (
      <Container style={{ padding: '5% 0 30% 0' }} >
        <Row className="justify-content-center m-5">
          <h3>Create New Post</h3>
        </Row>
        <Row className="justify-content-center">
          <Col xs={8}>
            <form onSubmit={this.onSubmit}>
              <div className="form-check">
                <input className="form-check-input"
                  id="completedCheckbox"
                  type="checkbox"
                  name="completedCheckbox"
                  onChange={this.onChangeIsGiver}
                  checked={this.state.isGiver}
                  value={this.state.isGiver}

                />
                <label className="form-check-label" htmlFor="completedCheckbox">
                  I am posting as a giver.
                                    </label>
              </div>


              <div className="form-group">
                <label>Title: </label>
                <input type="text"
                  className="form-control"
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                  required={true}
                />
              </div>


              <div className="form-group">
                <label>Location: </label>
                <GeoSearch newCoordsNav={this.handlePlaceSelectCP} newPlaceName={this.handlePlaceNameCP} >
                </GeoSearch>
              </div>

              <div className="form-group">
                <label>Category: </label>
                <Dropdown title="CategoryDropdown" id="collasible-nav-dropdown" onSelect={this.onChangeCategory.bind(this)}>
                  <Dropdown.Toggle id="dropdown-basic" className="btn-main">
                  {this.state.category != 'Other' ? this.state.category : 'Select a Category'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                  <Dropdown.Item eventKey='Appliances / Devices'>Appliances / Devices</Dropdown.Item>
                  <Dropdown.Item eventKey='Art / Culture'>Art / Culture</Dropdown.Item>
                  <Dropdown.Item eventKey='Babies / Childcare'>Babies / Childcare</Dropdown.Item>
                  <Dropdown.Item eventKey='Books / Education'>Books / Education</Dropdown.Item>
                  <Dropdown.Item eventKey='Clothing'>Clothing</Dropdown.Item>
                  <Dropdown.Item eventKey='Food'>Food</Dropdown.Item>
                  <Dropdown.Item eventKey='Furniture'>Furniture</Dropdown.Item>
                  <Dropdown.Item eventKey='Health / Hygiene'>Health / Hygiene</Dropdown.Item>
                  <Dropdown.Item eventKey='Household Items'>Household Items</Dropdown.Item>
                  <Dropdown.Item eventKey='Shelter'>Shelter</Dropdown.Item>
                  <Dropdown.Item eventKey='Sports / Games / Toys'>Sports / Games / Toys</Dropdown.Item>
                  <Dropdown.Item eventKey='Transportation'>Transportation</Dropdown.Item>
                  <Dropdown.Item eventKey='Voluntary Work - Skilled'>Voluntary Work - Skilled</Dropdown.Item>
                  <Dropdown.Item eventKey='Voluntary Work - Flexible'>Voluntary Work - Flexible</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div className="form-group">
                <label>Description: </label>
                <textarea
                  className="form-control"
                  value={this.state.content}
                  onChange={this.onChangeContent}
                  required={true}
                  rows={4}
                />
              </div>


              <div className="form-group">
                <input type="submit" value="Create Post" className="btn btn-primary" />
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    )
  }
}