import React, { useEffect, useRef, useState } from "react";
import useHttp from "../hook/useHttp";
import Cookies from "js-cookie";
import { ListGroup } from "react-bootstrap";
import classes from "./PostUser.module.css";
import moment from "moment";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
const PostUser = () => {
  const [results, setResults] = useState({
    posts: [],
    totalCount: null,
  });
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { api } = useHttp();
  const apiRef = useRef(api);
  const token = Cookies.get("token");

  useEffect(() => {
    apiRef.current(
      "get",
      undefined,
      `/postUser?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`,
      setResults,
      token
    );
  }, [token, currentPage, itemsPerPage, reload]);
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  const deletePostHandle = async (id) => {
    await api("delete", null, `/deletePost/${id}`);
    setReload(!reload);
  };

  return (
    <div>
      <ListGroup>
        {results.posts.map((post) => (
          <ListGroup.Item key={post._id}>
            <h4
              className={classes.listItem}
              onClick={() => navigate(`/detailPost/${post._id}`)}
            >
              {post.title}
            </h4>
            <p className="text-break">{truncateText(post.content, 200)}</p>
            <div className="text-end"> {moment(post.createdAt).fromNow()}</div>
            <Button
              variant="success"
              className="me-2"
              onClick={() => navigate(`/getEditPost/${post._id}`)}
            >
              Update
            </Button>
            <Button variant="danger" onClick={() => deletePostHandle(post._id)}>
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Stack spacing={2} alignItems="center" className="mt-2">
        <Pagination
          count={Math.ceil(results.totalCount / itemsPerPage)}
          color="primary"
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
        />
      </Stack>
    </div>
  );
};

export default PostUser;
