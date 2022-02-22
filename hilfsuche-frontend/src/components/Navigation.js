import React from "react";
import { Nav, Navbar, NavDropdown, Form, FormControl, Button, ToggleButtonGroup, ToggleButton, Dropdown, InputGroup, Container, Col, Row } from 'react-bootstrap';
//import logo from '../logo.svg'; // Tell Webpack this JS file uses this image
// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import UserService from '../services/UserService';
import { withRouter } from 'react-router-dom';
import { GeoSearch } from "../components/GeoSearch.js";
import Autocomplete from './Autocomplete';
import axios from 'axios';
import PostList from "./PostList";


class Navigation extends React.Component {
    constructor(props) {

        super(props);

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleChangePostType = this.handleChangePostType.bind(this);

        if (UserService.getCurrentUser().id) {
            this.cu = UserService.getCurrentUser();
        } else {
            console.log('UserService.getCurrentUser().id NOT WORKING');
        }

        
        this.state = {
            toggleValue: '',
            filteredIds: [],
            value: [1],
            isAuthenticated: UserService.isAuthenticated(),
            posts: [],
            newCoords: [],
            url: false
        };


        console.log('-----------__>>>>>>>>>>><'+this.state.url);

    }

    //TODO: FIX THIS!! Post list got loaded in two different place (here and homepageview).
    //It should loaded in one place and passed as props to others
    componentDidMount() {
        axios.get('http://localhost:3000/posts/')
            .then(response => {
                this.setState({
                    posts: response.data.map((post) => { return { id: post._id, content: post.title + " " + post.content } })
                });
            })
            .catch(function (error) {
                console.log(error);
            });

        
        console.log('---------> URL' + this.props.location.pathname);
        if(this.props.location.pathname === '/') {
            this.setState({
                url: true
            });
        }
        else {
            this.setState({
                url: false
            });
        }
        console.log('---------> URL' + this.props.location.pathname);

    }

    logout() {
        UserService.logout();
        this.state = {
            user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined
        };
        if (this.props.location.pathname != '/') {
            this.props.history.push('/');
        }
        else {
            window.location.reload();
        }
    }

    handleSearchChange(filteredIds) {
        this.setState({
            filteredIds: filteredIds
        });
        this.props.filteredIdsPage(filteredIds);
    }

    handleChangePostType(value) {
        this.setState({
            toggleValue: value
        });
        this.setState({ value });
        this.props.isGiverPostPage(value);
    }

    handlePlaceSelectNav = (newCoordsNav) => {
        this.setState({
            newCoords: newCoordsNav
        })
        this.props.newCoordsPage(newCoordsNav)
    }

    handlePlaceNameNav = (newPlaceName) => {
      // this.setState({
      //     newCoords: newCoordsNav
      // })
      // this.props.newCoordsPage(newCoordsNav)
      
      // do literally nothing
  }

    render() {
        // Update UserDropdown menu according to the Auth-status
        // const isAuthenticated = this.state.isAuthenticated;

        return (
            <Container fluid={true}>
                {/* Header */}
                <Row className="header-bg">
                    <Container fluid={true}>
                        <Row className="justify-content-center" id="header">
                            <Col className="col-5 header-left">
                                <a href="#/">
                                    <FontAwesomeIcon icon={faHandHoldingHeart} className="fa-3x" />
                                    <span id="header-title">Hilfsuche</span>
                                </a>
                            </Col>

                            <Col className="col-5 header-right">
                                <Dropdown title="Dropdown" id="collasible-nav-dropdown">
                                    <Dropdown.Toggle id="dropdown-basic" className="btn-main">
                                        <FontAwesomeIcon icon={faUser} className="fa-3x" />
                                    </Dropdown.Toggle>

                                    {this.state.isAuthenticated ?
                                        (
                                            <Dropdown.Menu>
                                                {this.state.isAuthenticated}
                                                <Dropdown.Item href="#/me/profile">My Profile</Dropdown.Item>
                                                <Dropdown.Item href="#/me/post">My Posts</Dropdown.Item>
                                                <Dropdown.Item href="#/me/message">My Messages</Dropdown.Item>
                                                <Dropdown.Item onClick={() => this.logout()}>Logout</Dropdown.Item>
                                            </Dropdown.Menu>
                                        )
                                        :
                                        (
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/login" onClick={() => this.props.history.push('/login')}>Login</Dropdown.Item>
                                            </Dropdown.Menu>
                                        )
                                    }
                                </Dropdown>
                            </Col>

                        </Row>
                    </Container>

                </Row>

                {/* Search bar */}
                <Row id="search" className="justify-content-center" style={{display: this.state.url ? 'flex' : 'none' }}>
                    <Col className="col-10">
                        <div className="justify-content-between" >
                            <Navbar expand="lg" className="mb-3 mt-3 pl-0 pr-0">
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Form>
                                        <Nav>
                                            {/* Toggle */}
                                            <ToggleButtonGroup
                                                id="search-toggle"
                                                className="search-item"
                                                value={this.state.value}
                                                name="postTypeToggle"
                                                type="radio"
                                                onChange={this.handleChangePostType} >
                                                <ToggleButton value={1}><p>All</p></ToggleButton>
                                                <ToggleButton value={2}><p>Beneficiary</p></ToggleButton>
                                                <ToggleButton value={3}><p>Giver</p></ToggleButton>
                                            </ToggleButtonGroup>

                                            {/* Search function */}
                                            <div id="search-input" className="search-item search-item-input">
                                                <Autocomplete  filteredIdsNav={this.handleSearchChange} suggestions={this.state.posts} />
                                            </div>

                                            {/* Search Location */}
                                            <div id="search-location" className="search-item">
                                                <GeoSearch newCoordsNav={this.handlePlaceSelectNav} newPlaceName={this.handlePlaceNameNav} ></GeoSearch>
                                            </div>
                                            

                                            <Button id="search-btn" className="mr-10 btn-main search-item">Search</Button>
                                        </Nav>
                                    </Form>                                    
                                </Navbar.Collapse>
                            </Navbar>
                        </div>
                    </Col>
                </Row>
                
                

            </Container>

        );
    }
}

export default withRouter(Navigation);

/*

                                            <Dropdown className="mr-3">
                                                <Dropdown.Toggle id="dropdown-basic" className="bg-cl-hs-orange">
                                                    Categories
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#/action-1">Life supplys</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-2">Books</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3">Volunteer jobs</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3">Education</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3">Electric devices</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3">Transportation</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3">Furnitures</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
*/