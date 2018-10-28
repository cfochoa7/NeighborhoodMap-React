import React, { Component } from 'react';
import '../App.css';

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
                type="text"
                id="myInput"

                onInput={this.props.onInput}
                onChange={this.props.onChange}



                size="20"
                className="input"
                placeholder="Search Attraction..."
                />

             <ul id="search-list">
              <li><a>Arizona Mountain</a></li>
              <li><a>Dorado Golf Course</a></li>
              <li><a>The Shanty</a></li>
              <li><a>Tucson Mall</a></li>
              <li><a>University of Arizona</a></li>
             </ul>
            </div>

        </div>
    )
  }
}




export default Locations;
