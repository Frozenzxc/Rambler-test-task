import React, {Fragment} from "react";
import Main from "../main/main.jsx";
import NameSpace from "../../reducer/name-space";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {photoShape} from "../../prop-types.jsx";

class App extends React.PureComponent {
  _renderApp() {
    const {isLoading, photos} = this.props;
    if (isLoading) {
      return false;
    }

    return (
      <Main photos={photos}/>
    );
  }

  render() {
    return <Fragment>
      {this._renderApp()}
    </Fragment>;
  }
}

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  photos: PropTypes.arrayOf(photoShape).isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state[NameSpace.PHOTOS].isLoading,
  photos: state[NameSpace.PHOTOS].photos,
});

export {App};
export default connect(mapStateToProps)(App);
