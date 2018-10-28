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
      markers: [
        {
          title: '<b>University of Arizona</b>',
          hover: 'University of Arizona',
        visible: true,
       location: {lat: 32.2319, lng: -110.9501},
    description: '<br/>Known for its involvment in the Mars Space Program'
     },
        {
          title: '<b>Arizona Mountain</b>',
          hover: 'Arizona Mountain',
        visible: true,
       location: {lat: 32.2107, lng: -110.9917},
    description: '<br/>Local Tucson attraction'
     },
        {
          title: '<b>The Shanty</b>',
          hover: 'The Shanty',
        visible: true,
       location: {lat: 32.2240, lng: -110.9654},
             id: "4bf58dd8d48988d116941735",
    description: '<br/>Local Tucson bar'
     },
        {
          title: '<b>Tucson Mall</b>',
          hover: 'Tucson Mall',
        visible: true,
       location: {lat: 32.2885, lng: -110.9739},
    description: "<br/>Tucson's oldest mall venues"
     },
        {
          title: '<b>Dorado Golf Course</b>',
          hover: 'Dorado Golf Course',
        visible: true,
       location: {lat: 32.2369, lng: -110.8498},
    description: '<br/>Local venue for recration'
     }
   ]
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
    this.renderMap()
    this.getVenues()
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAQkHIBWjyRGJy2EsEu8DZ0jPBBvWC1b9s&callback=initMap")
    window.initMap = this.initMap
  }



  getVenues = () => {
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?'
    const photos = 'https://api.foursquare.com/v2/photos/add?'
    const parameters = {
      client_id: 'Y4HOWLASE0FWJ23LPMWLWMINXCXXGS0F4HEN0RDJSVP1U40U',
      client_secret: 'WOWYTORM2EP1JLDIO03SB1KMMYXO4BABEIMTSFBA55PJPCZT',
      query: 'The Shanty',
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

  var map = new window.google.maps.Map(document.getElementById('map'), {
    center: {lat: 32.2226, lng: -110.9747},
    zoom: 12
  })

  var infowindow = new window.google.maps.InfoWindow()

  this.state.markers.map(markers => {
    var info = `${markers.hover}`
    var visible = `${markers.visible}`
    var marker = new window.google.maps.Marker({
      position: {lat: markers.location.lat , lng: markers.location.lng},
      title: info,
      map: map,
      icon: {
        path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        strokeColor: 'blue',
        scale: 4
      }
    })
    marker.addListener('click', function() {
      infowindow.setContent(`${markers.title}${markers.description} `)
      infowindow.open(map, marker)
      })
      return marker
    })


}


 myFunction = () => {
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
}




     render() {

       return (
         <Locations
            onInput={this.myFunction}
            onChange={this.filter}

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
