import React, { Component } from 'react';
import ListItem  from './ListItem';

class VenueList extends Component {
  render() {
    return (
      <div id= 'venueList'>
        <ul className = 'vList'>

        {this.props.searchedLocations &&
        this.props.searchedLocations.map((venue, index) => (

          <ListItem
            key={index}
            venue={venue}

            /*Assisted by Mayguen Ojeda from FEND-proj-7*/
            click={() =>
               this.props.press(venue.venue)
             }
          />

        ))}

        </ul>
      </div>
    );
  }
}

export default VenueList;
