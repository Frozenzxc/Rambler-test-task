import React from "react";
import Card from "../card/card.jsx";
import PropTypes from "prop-types";
import {photoShape} from "../../prop-types.jsx";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

class Main extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const grid = document.querySelector(`.gallery`);
    const masonry = new Masonry(grid, {
      itemSelector: `.gallery__item`,
      gutter: 20,
      horizontalOrder: true,
    });
    imagesLoaded(grid, () => {
      masonry.layout();
    });
  }

  render() {
    return (
      <ul className="gallery container">
        {this.props.photos.map((photo) => <Card photo={photo} key={photo.id}/>)}
      </ul>
    );
  }
}

Main.propTypes = {
  photos: PropTypes.arrayOf(photoShape).isRequired,
};

export default Main;
