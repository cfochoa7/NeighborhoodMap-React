import React, {Component} from 'react';

class List extends Component {
  render() {

/* The <li> has an onclick method that will link to the props 'click' in Venue.js allowing the user to click on the listed venues.
The listed venue's display to the user is accessed through the venue's 'venue.venue.name'.*/
// Partially assisted by Jason Michael White [FEND] Project Coach 
let connect = this.props;
let access;
      access = <li
                className="list"
                tabIndex='0'
                type='button'
                aria-label='List Location'
                onClick={connect.click}
              >
                {connect.venue.venue.name}
             </li>

    return (
      <div id= 'list'>
        {access}
      </div>
    )
  }
}


export default List;
