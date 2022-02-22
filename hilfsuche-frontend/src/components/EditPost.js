import React, { Component } from 'react';
import axios from 'axios';
import { GeoSearch } from '../components/GeoSearch';
import Page from '../components/Page';
import {  Row, Col, Container, Dropdown } from 'react-bootstrap';

export default class EditPost extends Component {

  constructor(props) {
    super(props);


    this.state = {
      title: '',
      location: [],
      locationName: '',
      category: '',
      content: '',
      isGiver: '',
      isFullfilled: false
    }


    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onChangeIsFullfilled = this.onChangeIsFullfilled.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // not sure if need to bind these last two
    this.handlePlaceSelectEP = this.handlePlaceSelectEP.bind(this);
    this.handlePlaceNameEP = this.handlePlaceNameEP.bind(this);
  }


  componentDidMount() {
    axios.get('http://localhost:3000/posts/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          title: response.data.title,
          location: response.data.location,
          locationName: response.data.locationName,
          category: response.data.category,
          content: response.data.content,
          isGiver:response.data.isGiver,
          isFullfilled: response.data.isFullfilled
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  onChangeIsGiver(e) {
    this.setState({
      isGiver: e.target.value
    });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
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

  onChangeIsFullfilled(e) {
    this.setState({
      isFullfilled: !this.state.isFullfilled
    });
  }

  handlePlaceSelectEP = (newCoordsEP) => {
    this.setState({
      location: newCoordsEP
    })
  }

  handlePlaceNameEP = (newPlaceName) => {
    this.setState({
      locationName: newPlaceName
    })
  }


  onSubmit(e) {
    e.preventDefault();

    const obj = {
      title: this.state.title,
      location: this.state.location,
      locationName: this.state.locationName,
      category: this.state.category,
      content: this.state.content,
      isGiver: this.state.isGiver,
      isFullfilled: this.state.isFullfilled
    };
    console.log(obj);
    axios.post('http://localhost:3000/posts/update/' + this.props.match.params.id, obj)
      .then(res => console.log(res.data)).then(alert("You have successfully changed the post."));

    this.props.history.push('/');
  }



  render() {
    return (
      <Container style={{padding:'5% 0 30% 0'}} >
        <Row className="justify-content-center">
          <Col xs={8}>

      <Row className="justify-content-center">
                    <h3>Update Post</h3>
                </Row>

        <form onSubmit={this.onSubmit}>


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
            <label>Current Location: </label>
            <input type="text"
              className="form-control"
              value={this.state.locationName}
              disabled
            />
          </div>

          <div className="form-group">
            <label>New Location: </label>
            <GeoSearch newCoordsNav={this.handlePlaceSelectEP} newPlaceName={this.handlePlaceNameEP}>
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
              type="text"
              className="form-control"
              value={this.state.content}
              onChange={this.onChangeContent}
              required={true}
              rows={4}
            />
          </div>

          <div className="form-check">
            <input className="form-check-input"
              id="completedCheckbox"
              type="checkbox"
              name="completedCheckbox"
              onChange={this.onChangeIsFullfilled}
              checked={this.state.isFullfilled}
              value={this.state.isFullfilled}
            />
            <label className="form-check-label" htmlFor="completedCheckbox">
              This post has been fulfilled.
                        </label>
          </div>


          <div className="form-group">
            <input type="submit" value="Update Post" className="btn btn-primary" />
          </div>
        </form>
      </Col>
      </Row>
      </Container>
    )
  }
}