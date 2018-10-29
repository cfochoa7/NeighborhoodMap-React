import React, { Component } from 'react';
import ListItem  from './ListItem';

class VenueList extends Component {
  render() {
    return (
      <div id= 'venueList'>
      <ol className = 'venueList'>
        {this.props.venues &&
        this.props.venues.map((venue, index) => (
          <ListItem
          key={index} {...venue} />
        ))}
        </ol>
        </div>
    );
  }
}

export default VenueList;
