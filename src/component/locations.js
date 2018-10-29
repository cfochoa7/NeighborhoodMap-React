import React, { Component } from 'react';
import '../App.css';

class Locations extends Component {


  render() {

    return(
      <div>
        <div id="map" />
            <header className="app-header">
               <h1 className="app-title">Gym Locations</h1>
            </header>

            <div className="search-area" id="search-box">
              <input
                type="text"
                id="myInput"

                onInput={this.props.onInput}
                onChange={this.props.onChange}




                size="20"
                className="input"
                placeholder="Search Attraction..."
                />

                <ul id="search-list">
                    {this.props.venues.forEach((venue, index) => (
                      <li key={index}>{venue.venue.name}</li>
                    ))}
                </ul>
            </div>

        </div>
    )
  }
}




export default Locations;
