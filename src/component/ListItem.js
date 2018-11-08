import React, {Component} from 'react';

class ListItem extends Component {
  render() {
    
let connect = this.props;
let access;
      access = <li
                className="listItem"
                tabIndex='0'
                type='button'
                aria-label='Place Location'
                onClick={connect.click}
              >
                {connect.venue.venue.name}
             </li>

    return (
      <div id= 'listItem'>

        {access}

      </div>
    )
  }
}


export default ListItem;
