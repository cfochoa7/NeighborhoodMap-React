import React, { Component } from 'react';
import ListItem  from './ListItem';

class VenueList extends Component {
  render() {

    let connect = this.props;
    let bridge;
     bridge = <ul
                  className = 'vList'>
                  {connect.places &&
                   connect.places.map( (venue) => (
                    <ListItem
                        key={venue.venue.name}
                        venue={venue}
                        /*Assisted by Mayguen Ojeda from FEND-proj-7*/
                        click={ () =>
                        connect.press(venue.venue)
                        }
                    />
                    ))}
                </ul>

    return (
      <div id= 'venueList'>

        {bridge}

      </div>
    );
  }
}

export default VenueList;
