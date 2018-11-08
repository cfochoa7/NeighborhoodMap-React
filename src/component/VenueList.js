import React, { Component } from 'react';
import ListItem  from './ListItem';

class VenueList extends Component {
  render() {

/*The variable bridge establishes the <ul> by using .map() that will list every <li> to the user. The key identifies each venue's title.
The 'click' will have the data passed from the venue.venue and link it with the listed venue the user clicks on to the marker on the map.*/
    let connect = this.props;
    let bridge;
     bridge = <ul
                  className = 'vList'>
                  {connect.places &&
                   connect.places.map( (venue) => (
                    <ListItem
                        key={venue.venue.name}
                        venue={venue}
                        //Assisted by Mayguen Ojeda from FEND-proj-7
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
