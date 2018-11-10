import React, { Component } from 'react';
import List  from './List';

class Venue extends Component {
  render() {

/*The variable bridge establishes the <ul> by using .map() that will list every <li> to the user. The key identifies each venue's title.
The 'click' will have the data passed from the venue.venue and link it with the listed venue the user clicks on to the marker on the map.*/
//Line 14 & 15 was assisted by Jason Michael White [FEND] Project Coach*/
    let connect = this.props;
    let bridge;
     bridge = <ul
                  aria-label='Venue'
                  className = 'vList'>
                  {connect.places &&
                   connect.places.map( (venue) => (
                    <List
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
      <div id= 'venue'>
        {bridge}
      </div>
    );
  }
}

export default Venue;
