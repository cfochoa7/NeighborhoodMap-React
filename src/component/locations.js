import React, { Component } from 'react';
import '../App.css';
import VenueList from './VenueList';

class Locations extends Component {


  render() {

    return(
      <div>
        <div id="map" />
            <header className="app-header">
               <h1 className="app-title">Old Pueblo Guide</h1>
            </header>

            <div className="search-area" id="search-box">

              <input
                type='text'
                id="search"
                name="search"

                value={this.props.value}

                onInput={this.props.onInput}
                 onChange={(e) => {
                               this.props.filter(e.target.value);
                               this.props.filterVenues(e.target.value);

                             }}
                size="20"
                className="input"
                placeholder={"Search Local Attractions..."}
                />
                <VenueList {...this.props} />


            </div>

        </div>
    )
  }
}




export default Locations;

/*<ul id="search-list">
      {this.props.venues.forEach((venue, index) => (
        <li key={index}>{venue.venue.name}</li>
      ))}
  </ul>*/
