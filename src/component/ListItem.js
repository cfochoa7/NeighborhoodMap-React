import React, {Component} from 'react';

class ListItem extends Component {
  render() {
    
/* The <li> has an onclick method that will link to the props 'click' in VenueList.js allowing the user to click on the listed venues.
The listeed venue's display to the user is accessed through the venue's 'venue.name'.*/
let connect = this.props;
let access;
      access = <li
                className="listItem"
                tabIndex='0'
                type='button'
                aria-label='Listed Location'
                onClick={connect.click}
              >
                {connect.venue.venue.name}
             </li>

    return (
      <div id = 'listItem'>

        {access}

      </div>
    )
  }
}


export default ListItem;
