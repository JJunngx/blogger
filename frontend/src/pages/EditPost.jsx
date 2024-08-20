import { useEffect, useState, useRef } from "react";
import useHttp from "../hook/useHttp";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import PostInput from "../utils/PostInput";

const EditPost = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [post, setPost] = useState({});
  const { api, loading, error, success } = useHttp();
  const { id } = useParams();
  const apiRef = useRef(api);
  const token = Cookies.get("token");

  useEffect(() => {
    error && toast.error("tạo bài đăng thất bại ");
    success && toast.success("tạo bài đăng thành công");
  }, [error, success]);
  useEffect(() => {
    apiRef.current("get", null, `/getEditPost/${id}`, setPost, token);
  }, [id, token]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("content", data.content);
    formData.append("title", data.title);

    if (selectedImages.length > 0) {
      for (let i = 0; i < selectedImages.length; i++) {
        formData.append("images", selectedImages[i]);
      }
    }
    await api("put", formData, `/editPost/${id}`, null, token);
  };

  return (
    <>
      <h2>Edit Post</h2>

      {post.title && (
        <Helmet>
          <title>Edit Post| {post.title}</title>
        </Helmet>
      )}
      <PostInput
        post={post}
        onSubmit={onSubmit}
        loading={loading}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
      />
    </>
  );
};

export default EditPost;
