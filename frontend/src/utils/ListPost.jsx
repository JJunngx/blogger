import React from "react";
import moment from "moment";
import { ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import classes from "./ListPost.module.css";
const ListPost = ({ posts }) => {
  const navigate = useNavigate();
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };
  return (
    <ListGroup>
      {posts.map((post) => (
        <ListGroup.Item
          key={post._id}
          className={classes.listItem}
          onClick={() => navigate(`/detailPost/${post._id}`)}
        >
          <span className="fs-4"> {post.title}</span>
          <p className="text-break">{truncateText(post.content, 200)}</p>
          <div className="text-end"> {moment(post.createdAt).fromNow()}</div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ListPost;
