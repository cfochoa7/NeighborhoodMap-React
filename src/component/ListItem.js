import React, {Component} from 'react';

class ListItem extends Component {
  render() {
    return (
      <div id= 'listItem'>

      <li className = 'listItem'>
        {this.props.name}
      </li>

      </div>
    )
  }
}


export default ListItem;
