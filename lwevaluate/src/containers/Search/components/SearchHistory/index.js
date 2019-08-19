import React, { Component } from 'react';
import "./style.css"

class SearchHistory extends Component {

  render() {
    const { data } = this.props;
    return (
      <div className="searchHistory">
        <div className="searchHistory__header">Search record</div>
        <ul className="searchHistory__list">
          {
            data.map((item, index) => {
              return <li key={item.id} onClick={this.handleClick.bind(this, item)} className="searchHistory__item">
                {item.keyword}
              </li>
            })
          }
        </ul>
        <div className="searchHistory__clear" onClick={this.handleClear}>Clear search results</div>
      </div>
    );
  }

  handleClick = (item) => {
    this.props.onClickItem(item)
  }

  handleClear = () => {
    this.props.onClear();
  }

}

export default SearchHistory;