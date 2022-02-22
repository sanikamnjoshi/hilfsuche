import React, { Component } from 'react';
import { TextField } from 'react-md';
import Script from "react-load-script";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export class GeoSearch extends Component {
  
    constructor(props) {
        super(props);
    
        // Declare State
        this.state = {
          city: '',
          query: '',
          newLat: '',
          newLng: ''
        };
    
        // Bind Functions
        this.handleChange = this.handleChange.bind(this);   
        this.handleScriptLoad = this.handleScriptLoad.bind(this);
        this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
      }

      handleChange (value) {
        console.log("handle change from ınput......." + this.state.query);
        this.setState(Object.assign({}, this.state, {query: value}));
      }
    
      handleScriptLoad() {
        // Declare Options For Autocomplete
        var options = {
          types: ['geocode','establishment'],
        };
    
        // Initialize Google Autocomplete
        /*global google*/ // To disable any eslint 'google not defined' errors
        this.autocomplete = new google.maps.places.Autocomplete(
          document.getElementById('autocomplete'),
          options,
        );
    
        // Fire Event when a suggested name is selected
        this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
      }
      
      handlePlaceSelect() {
    
        // Extract City From Address Object
        let addressObject = this.autocomplete.getPlace();
        let address = addressObject.address_components;
    
        // Check if address is valid
        if (address) {
          // Set State
          this.setState(
            {
              city: address[0].long_name,
              query: addressObject.formatted_address,
              newLat: addressObject.geometry.location.lat(),
              newLng: addressObject.geometry.location.lng()
            });
            console.log(this.state.city)
            console.log(this.state.query) // we just need to save the query
            console.log(address)

            let newLat = this.state.newLat
            let newLng = this.state.newLng
            let placeName = this.state.query

            this.props.newCoordsNav([newLat,newLng]);
            this.props.newPlaceName(placeName)
        }
      }
    

  render() {

    return ( 
      <MuiThemeProvider>
        <Script //url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDR7HBvSkcy-v3q2L4KB0-gBnj_KmRsV2M&libraries=places"          
            onLoad={this.handleScriptLoad}        
        /> 
        <TextField 
          id="autocomplete" 
          placeholder="Enter a location"
          value={this.state.query} 
          onChange={this.handleChange}/>
      </MuiThemeProvider>       
    );
  }
}


/*

          <SearchBar id="autocomplete" placeholder="" hintText="Search Location" value={this.state.query}
            style={{
              margin: '0 auto',
              maxWidth: 800,
            }}
          />
*/