import React, { Component } from 'react';
import Locations from './component/locations';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      venues: [],
    }

    this.filter = this.filter.bind(this);

  };

  filter(event) {
    const { value } = event.target;
    this.setState ({
      search: value
    });
  }


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
      query: 'YMCA',
      limit: 5,
      near: 'Tucson',
      v: '20182210'
    }
  axios.get(endPoint + new URLSearchParams(parameters))
  .then(response => {
    this.setState({
      venues: response.data.response.groups[0].items
    },this.renderMap())
  })
  .catch(error => {
    console.log('ERROR! ' + error)
  })
}



initMap = () => {

  var map = new window.google.maps.Map(document.getElementById('map'), {
    center: {lat: 32.2226, lng: -110.9747},
    zoom: 12
  })

  var infowindow = new window.google.maps.InfoWindow()

      this.state.venues.map(venue => {
        var address = `${venue.venue.location.address}`
        var contentString = `${venue.venue.name}`

        var marker = new window.google.maps.Marker({
          position: {lat: venue.venue.location.lat , lng: venue.venue.location.lng},
          map: map,
          title: venue.venue.name,
          icon: {
            path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            strokeColor: 'blue',
            scale: 5
          }
        })

        marker.addListener('click', function() {
          infowindow.setContent('<b>' + contentString + '</b> <br>'  + address)
          infowindow.open(map, marker)
        })

      })



    }


 /*myFunction = () => {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("search-list");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}*/




     render() {

       return (
         <Locations
            onInput={this.myFunction}
            onChange={this.filter}
            venues={this.state.venues}


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
