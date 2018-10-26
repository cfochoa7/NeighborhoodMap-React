import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      markers: []
    }
  };



  componentDidMount() {
    this.renderMap()
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
      query: 'food',
      near: 'Tucson',
      v: '20182210'
    }

  axios.get(endPoint + new URLSearchParams(parameters))
  .then(response => {
    this.setState({
      venues: response.data.response.groups[0].items
    })
  })
  .catch(error => {
    console.log('ERROR! ' + error)
  })
}

    initMap = () => {
      let map;
       map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: 32.2226, lng: -110.9747},
        zoom: 12
      })

      let places = [
        {title: 'University of Arizona', location: {lat: 32.2319, lng: -110.9501}},
        {title: 'A-Mountain', location: {lat: 32.2107, lng: -110.9917}},
        {title: 'The Shanty', location: {lat: 32.2240, lng: -110.9654}},
        {title: 'Tucson Mall', location: {lat: 32.2885, lng: -110.9739}},
        {title: 'Dorado Golf Course', location: {lat: 32.2369, lng: -110.8498}},
      ];


      for (var i = 0; i < places.length; i++) {
        var title = places[i].title;
        var position = places[i].location;

      var marker = new window.google.maps.Marker({
        position: position,
           title: title,
            map: map,
      });
      this.state.markers.push(marker);
    }
    var infowindow = new window.google.maps.InfoWindow({
      content: title
    });

    marker.addListener('click', function() {
        infowindow.open(map, marker);
      })








  }


     render() {
       console.log(this.state);

       return (
         <div>
           <div id="map" />
               <header className="app-header">
                  <h1 className="app-title">Old Pueblo Guide</h1>
               </header>


           </div>
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
