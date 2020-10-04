import React, {Fragment} from "react";
import Main from "../main/main.jsx";
import NameSpace from "../../reducer/name-space";
import {connect} from "react-redux";
import {Operation} from "../../reducer/photos/photos";


class App extends React.PureComponent {
  _renderApp() {
    const {isLoading, photos} = this.props;
    if (isLoading) {
      return false;
    }

    /*photos.forEach((photo) => {
      this.props.loadPhotoInfo(photo.id)
    });*/

    return (
      <Main photos={photos}/>
    );
  }

  render() {
    return <Fragment>
      {this._renderApp()}
    </Fragment>
  }
}

const mapStateToProps = (state) => ({
  isLoading: state[NameSpace.PHOTOS].isLoading,
  photos: state[NameSpace.PHOTOS].photos,
});

const mapDispatchToProps = (dispatch) => ({
  loadPhotoInfo(id) {
    dispatch(Operation.loadPhotoInfo(id));
  },
  onCardTitleClick(offer) {
    dispatch(ActionCreator.selectOffer(offer));
  },
  onCityClick(city) {
    dispatch(ActionCreator.selectCity(city));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
