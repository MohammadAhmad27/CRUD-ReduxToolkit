import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import "./CustomModal.css";

const CustomModal = ({ id, setShowPopup }) => {
  const allusers = useSelector((state) => state.app.users);
  const singleUser = allusers.filter((ele) => ele.id === id);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button onClick={() => setShowPopup(false)}>Close</button>
        <br />
        <br />
        <h2>{singleUser[0].name}</h2>
        <h3>{singleUser[0].email}</h3>
        <h4>{singleUser[0].age}</h4>
        <h5>{singleUser[0].gender}</h5>
      </div>
    </div>
  );
};

CustomModal.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  setShowPopup: PropTypes.func.isRequired,
};

export default CustomModal;
