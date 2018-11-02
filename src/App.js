import React, { Component } from 'react';
import Locations from './component/locations';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      map: null,
      infoWindow: null,
      venues: [],
      searchedLocations: [],
      markers: []
    }
  };


  componentDidMount() {
    this.getVenues()
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAQkHIBWjyRGJy2EsEu8DZ0jPBBvWC1b9s&callback=initMap")
    window.initMap = this.initMap
  }



  getVenues = () => {
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?'
    const parameters = {
      client_id: 'Y4HOWLASE0FWJ23LPMWLWMINXCXXGS0F4HEN0RDJSVP1U40U',
      client_secret: 'WOWYTORM2EP1JLDIO03SB1KMMYXO4BABEIMTSFBA55PJPCZT',
      query: 'attractions',
      limit: 5,
      near: 'Tucson',
      v: '20182210'
    }
  axios.get(endPoint + new URLSearchParams(parameters))
  .then(response => {
    this.setState({
      venues: response.data.response.groups[0].items,
      searchedLocations: response.data.response.groups[0].items
    },this.renderMap())
  })
  .catch(error => {
    console.log('ERROR! ' + error)
  })
}


initMap = () => {

  var map = new window.google.maps.Map(document.getElementById('map'), {
    center: {lat: 32.2226, lng: -110.9747},
    zoom: 11
  })

  var infowindow = new window.google.maps.InfoWindow()

  const allMarkers = [];

      this.state.venues.map(venue => {
        var address = `${venue.venue.location.address}`
        var contentString = `${venue.venue.name}`

        var marker = new window.google.maps.Marker({
          position: {lat: venue.venue.location.lat , lng: venue.venue.location.lng},
          map: map,
          title: venue.venue.name,
          animation: window.google.maps.Animation.DROP,
          icon: {
            path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            strokeColor: 'blue',
            scale: 5
          }
        });
        marker.addListener('click', () => {
            if (marker.getAnimation() !== null) {
              marker.setAnimation(null);
            } else {
              marker.setAnimation(null);
            }
          })
        marker.addListener('click', function() {
          infowindow.setContent('<b>' + contentString + '</b> <br>'  + address)
          infowindow.open(map, marker);
        });

        allMarkers.push(marker);
        return venue;
      });

      this.setState({
        markers: allMarkers
      });

}

/*filter = () => {
  let input, inputVal, a, i, filtered;
  input = document.querySelector("#search");
  inputVal = input.value.toLowerCase();
  a = document.querySelectorAll(".listItem");

  for (i = 0; i < a.length; i++) {
    filtered = a[i];

    if (filtered.innerHTML.toLowerCase().indexOf(inputVal) > -1) {
      filtered.style.display = "";
    } else {
      filtered.style.display = "none";

    }
  }

};*/

filterVenues = search => {
  const searchedLocations = [];
  this.state.venues.forEach(venue => {
    if (venue.venue.name.toLowerCase().includes( search.toLowerCase() ) ) {
      this.state.markers.forEach(marker => {
        if (marker.title === venue.venue.name) {
          marker.setVisible(true);
          searchedLocations.push(venue);
        } else {
          marker.setVisible(false);
        }
      });
      this.setState({
        search: search,
        searchedLocations: searchedLocations
      });
    }
    if (search === "") {
      this.setState({
        searchedLocations: this.state.venues
      });
      this.state.markers.forEach(marker => {
        marker.setVisible(true);
      });
    }
  });
};


handleClick =(venue) => {
  let selected = this.state.markers.find(marker => marker.id === venue.id);
      console.log(selected); //prints the marker
      window.google.maps.event.trigger(selected, 'click');
    }



     render() {

       return (
         <Locations
            //filter={this.filter}
            filterVenues={this.filterVenues}
            press={this.handleClick}
            {...this.state}

          />
       )
     }
   }


function loadScript(url) {
  var index  = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default App;
