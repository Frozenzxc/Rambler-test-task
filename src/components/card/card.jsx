/* eslint-disable no-alert */

import React from "react";
import {clearText, formatDate} from "../../util";
import {photoShape} from "../../prop-types.jsx";

class Card extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    alert(`ID этой фотографии: ${this.props.photo.id}`);
  }

  render() {
    const {photo} = this.props;
    const {
      date,
      description,
      iconfarm,
      iconserver,
      owner,
      ownername,
      src,
      title,
      views,
    } = photo;

    return (
      <li className="gallery__item">
        <div className="gallery__item-header">
          <p className="gallery__item-author">{ownername}</p>
          <img className="gallery__item-avatar" src={`http://farm${iconfarm}.staticflickr.com/${iconserver}/buddyicons/${owner}.jpg`}/>
          <p className="gallery__place">{title}</p>
          <p className="gallery__date">{formatDate(date)}</p>
        </div>
        <img className="gallery__item-photo" src={src}/>
        <p className="gallery__description">{clearText(description)}</p>
        <p className="gallery__likes">
          <span className="gallery__likes-icon" onClick={this.handleClick}>heart</span>
          {views}</p>
      </li>
    );
  }
}

Card.propTypes = {
  photo: photoShape.isRequired,
};

export default Card;
