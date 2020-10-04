import PropTypes from "prop-types";

export const photoShape = PropTypes.shape({
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  iconfarm: PropTypes.number.isRequired,
  iconserver: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  ownername: PropTypes.string.isRequired,
  secret: PropTypes.string.isRequired,
  server: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  views: PropTypes.string.isRequired,
});
