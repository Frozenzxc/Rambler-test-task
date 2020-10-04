import React from "react";
import Card from "../card/card.jsx";

class Main extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="gallery container">
        {this.props.photos.map((photo) => <Card photo={photo} key={photo.id}/>)}
      </ul>
    );
  }
}

export default Main;
