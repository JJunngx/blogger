import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../hook/useHttp";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet-async";
const DetailPost = () => {
  const { id } = useParams();

  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const { api, loading } = useHttp();
  const apiRef = useRef(api);
  const contentRef = useRef();

  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    apiRef.current("get", null, `/detailPost/${id}`, setPost);
  }, [id]);

  const reloadComment = contentRef.current && contentRef.current.value;
  useEffect(() => {
    apiRef.current("get", null, `/getComment/${id}`, setComments);
  }, [id, reloadComment]);

  const commentSubmit = async (e) => {
    e.preventDefault();
    !token && navigate("/login");
    const enteredContent = contentRef.current.value;
    if (!enteredContent) {
      contentRef.current.focus();
      return;
    }
    await api(
      "post",
      { content: enteredContent, postId: id },
      "/commentPost",
      null,
      token
    );
    contentRef.current.value = "";
  };

  const imagesUrl = post.images ?? [];
  return (
    <div className="m-5">
      <Helmet>
        <title>{post.title}</title>
      </Helmet>
      <h1>{post.title}</h1>
      {/* <span>{moment(post.createdAt).fromNow()}</span> */}
      <p className="text-break">{post.content}</p>
      {imagesUrl.map((url, index) => (
        <img src={url} alt="" key={index} className="w-100 mb-2 " />
      ))}
      <h4>Bình luận</h4>
      <form onSubmit={commentSubmit}>
        <textarea
          ref={contentRef}
          placeholder="bình luận"
          className="form-control"
          rows="5"
        ></textarea>
        <Button
          variant="primary"
          className="my-3"
          type="submit"
          disabled={loading}
        >
          Submit
        </Button>
      </form>
      {comments.map((comment) => (
        <div key={comment._id} className="mb-4">
          <div className="mt-2">
            {comment.userId.name}
            <span>{moment(comment.createdAt).fromNow()}</span>
          </div>
          <div>{comment.content}</div>
        </div>
      ))}
    </div>
  );
};

export default DetailPost;
