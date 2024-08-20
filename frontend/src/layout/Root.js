import React, { useRef, useContext } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faRightToBracket,
  faPlus,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import classes from "./Root.module.css";
import SearchKeywordContext from "../context/SearchKeyword";
import Container from "react-bootstrap/Container";

const Root = () => {
  const searchRef = useRef(null);
  const { setKeyword } = useContext(SearchKeywordContext);
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  const LinkLI = ({ link, name, icon }) => {
    return (
      <li>
        <NavLink
          to={link}
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          {icon && <FontAwesomeIcon icon={icon} />} {name}
        </NavLink>
      </li>
    );
  };

  const searchHandle = (e) => {
    e.preventDefault();
    const keyword = searchRef.current.value;
    // if (!keyword) return;
    setKeyword(keyword);
    navigate("/question");
  };

  return (
    <>
      <ToastContainer />
      <nav className={` pt-2 bg-white fixed-top container`}>
        <ul
          className={`${classes.list} list-unstyled d-flex justify-content-between align-items-center mb-0 pb-2 
          `}
        >
          <LinkLI link="/" name="Home" icon={faHouse} />
          <LinkLI link="question" name="book" icon={faBook} />

          <li>
            <form onSubmit={searchHandle}>
              <input
                type="search"
                ref={searchRef}
                placeholder="search"
                className="form-control "
                style={{ width: "600px" }}
              />
            </form>
          </li>

          {token ? (
            <>
              <LinkLI link="/createPost" name="Create Post" icon={faPlus} />
              <LinkLI link="/postUser" name="Post of user" />
              <li onClick={logout} style={{ cursor: "pointer" }}>
                <FontAwesomeIcon icon={faRightToBracket} /> Logout
              </li>
            </>
          ) : (
            <LinkLI link="login" name="login" icon={faRightToBracket} />
          )}
        </ul>
      </nav>
      <Container style={{ marginTop: "70px" }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Root;
