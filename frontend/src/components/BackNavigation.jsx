import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import PropTypes from "prop-types";

const BackNavigation = ({ destination = "/" }) => {
  return (
    <div className="flex">
      <Link
        to={destination}
        className="bg-sky-800 text-white px-4 py- rounded-lg w-fit"
      >
        <BsArrowLeft className="text-2xl"></BsArrowLeft>
      </Link>
    </div>
  );
};

BackNavigation.propTypes = {
  destination: PropTypes.string,
};

export default BackNavigation;
