import { Map, Marker, InfoWindow } from 'google-maps-react';
import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { red100 } from 'material-ui/styles/colors';


export default class GoogleMap extends Component {

  constructor(props) {

    super(props)
    this.state = {
      userLocation: { lat: 48.262464, lng: 11.668393 }, //GFC
      loading: true,
      newCoords: [48.262464, 11.668393], //GFC
      isGiverPost: 1,
      filteredIds: undefined,
      posts: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  }


  componentDidMount(props) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        this.setState({
          userLocation: { lat: latitude, lng: longitude },
          loading: false
        });
      }
      ,
      () => {
        this.setState({ loading: false });
      }
    );

    axios.get('http://localhost:3000/posts/')
      .then(response => {
        this.setState({
          posts: response.data

        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.newCoords !== this.state.newCoords) {
      const localNewCoords = this.state.newCoords
      this.setState({
        newCoords: nextProps.newCoords,
        userLocation: { lat: localNewCoords[0], lng: localNewCoords[1] }
      });

    }
    if (nextProps.isGiverPost !== this.state.isGiverPost) {
      this.setState({ isGiverPost: nextProps.isGiverPost });
    }

    if (nextProps.filteredIds !== this.state.filteredIds) {
      this.setState({ filteredIds: nextProps.filteredIds });
    }
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });


  render() {
    const mapStyles = {
      width: 'auto',
      height: '100%',
      position: 'relative',
      margin: '0px 30px 0px -5px'
    };

    const userLocation = this.state.userLocation;
    const loading = this.state.loading;
    const { google } = this.props;

    const localNewCoords = { lat: this.state.newCoords[0], lng: this.state.newCoords[1] }
    var postCoords = []
    var postTitles = []

    var filteredPost = this.state.posts;
    
    if (this.state.filteredIds != undefined) {
      if (this.state.filteredIds.length != 0 && this.state.filteredIds[0] != "-1") {
        filteredPost = this.state.filteredIds.map((key) => { return this.state.posts[parseInt(key)]; });
        console.log('search results' + JSON.stringify(filteredPost))
      } else if (this.state.filteredIds.length != 0 && this.state.filteredIds[0] == "-1") {
        filteredPost = [];
        console.log('search' + JSON.stringify(filteredPost))
      }
    }

    var originalPostCoords = filteredPost.map((post, i) => post[i] = { lat: post.location[0], lng: post.location[1] })
    var originalPostTitles = filteredPost.map((post, i) => post[i] = post.title)

    var booleanIsGiverPost
    const locPosttypeArray = filteredPost.map((post, i) => post[i] = post.isGiver  )



    if (this.state.isGiverPost == '1') {
      postCoords = postCoords = filteredPost.map((post, i) => post[i] = { lat: post.location[0], lng: post.location[1] })
      postTitles = filteredPost.map((post, i) => post[i] = post.title)
    }

    else {

      if (this.state.isGiverPost == '2') {
        booleanIsGiverPost = false
      }
      else if (this.state.isGiverPost == '3') {
        booleanIsGiverPost = true
      }

      const ender = locPosttypeArray.length
      for (let i = 0, j = 0; i <= ender; i++) {

        if (locPosttypeArray[i] == booleanIsGiverPost) {
          postCoords[j] = { lat: originalPostCoords[i].lat, lng: originalPostCoords[i].lng }
          postTitles[j] = originalPostTitles[i]
          j++
        }
      }

    }


    console.log(postTitles)

    if (loading) {
      return null;
    }

    return (

      <Map
        zoom={11}
        center={localNewCoords}
        google={window.google}
        style={mapStyles}
        initialCenter={userLocation}
      >


        {postCoords.map((coords, i) => {

          return (
            <Marker position={postCoords[i]} onClick={this.onMarkerClick} markerNum = {i}/>
          )
        })}

        
         <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h3>{postTitles[this.state.activeMarker.markerNum]}</h3>
            </div>         
        </InfoWindow>
        
        
        


      </Map>

    );

  }
}