import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { searchUser } from "../features/userDetailSlics";

const Navbar = () => {
  const location = useLocation();
  const allUsers = useSelector((state) => state.app.users);
  const [searchData, setSearchData] = useState("");
  const dispatch = useDispatch();

  const onChange = (e) => {
    setSearchData(e.target.value);
  };

  useEffect(() => {
    dispatch(searchUser(searchData));
  }, [searchData, dispatch]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <h4 className="navbar-brand">RTK</h4>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                Create Post
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/read"
                className={`nav-link ${
                  location.pathname === "/read" ? "active" : ""
                }`}
              >
                All Post ({allUsers.length})
              </Link>
            </li>
          </ul>
          <input
            className="form-control w-50"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={onChange}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;