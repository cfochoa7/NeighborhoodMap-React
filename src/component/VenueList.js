import React, { Component } from 'react';
import ListItem  from './ListItem';

class VenueList extends Component {
  render() {
    return (
      <div id= 'venueList'>
        <ul className = 'venueList'>

        {this.props.venues &&
        this.props.venues.map((venue, index) => (
          <ListItem
            key={index}
            venue={venue}
            />
        ))}

        </ul>
      </div>
    );
  }
}

export default VenueList;