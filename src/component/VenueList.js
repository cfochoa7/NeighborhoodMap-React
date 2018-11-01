import React, { Component } from 'react';
import ListItem  from './ListItem';

class VenueList extends Component {
  render() {
    return (
      <div id= 'venueList'>
        <ul className = 'vList'>

        {this.props.venues &&
        this.props.venues.map((venue, index) => (
          <ListItem
            key={index}
            venue={venue}
            click={this.props.press}
            />
        ))}

        </ul>
      </div>
    );
  }
}

export default VenueList;
