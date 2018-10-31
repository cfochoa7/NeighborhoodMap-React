import React, {Component} from 'react';

class ListItem extends Component {
  render() {
    return (
      <div id= 'listItem'>

        <li className="listItem"
            tabIndex='0'
            role='button'
            aria-label='Place Location'
            >
            {this.props.venue.venue.name}
            </li>

      </div>
    )
  }
}


export default ListItem;
