import React, { Component } from 'react';
import '../App.css';

class Locations extends Component {
  constructor(props) {
  super(props);
  this.state = {
    search: ''
  };
  this.filter = this.filter.bind(this);

}


filter(event) {
  const { value } = event.target;
  this.setState ({
    search: value
  });
}


  render() {

    return (
      <div className="search-area" id="search-box">
        <input
          type="text"
          id="myInput"


          onInput={this.props.onInput}
          onChange={this.props.onChange}

          value={this.props.value}

          size="20"
          className="input"
          placeholder="Search Attraction..."
          />

       <ul id="search-list">
        <li><a>Arizona Mountain</a></li>
        <li><a>Dorado Golf Course</a></li>
        <li><a>The Shanty</a></li>
        <li><a>Tucson Mall</a></li>
        <li><a>University of Arizona</a></li>
       </ul>
      </div>
    )
  }
}




export default Locations;
