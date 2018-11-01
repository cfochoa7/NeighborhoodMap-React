import React, {Component} from 'react';

class ListItem extends Component {


  render() {
    return (
      <div id= 'listItem'>

        <li className="lItem"
            tabIndex='0'
            type='button'
            aria-label='Place Location'
            onClick={this.props.click}
        >

            {this.props.venue.venue.name}
            </li>

      </div>
    )
  }
}


export default ListItem;
