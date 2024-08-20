import { useEffect, useState } from "react";
import useHttp from "../hook/useHttp";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import PostInput from "../utils/PostInput";

// import useAxios from "axios-hooks";

const CreatePost = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const { api, loading, error, success } = useHttp();
  const token = Cookies.get("token");
  useEffect(() => {
    error && toast.error("tạo bài đăng thất bại ");
    success && toast.success("tạo bài đăng thành công");
  }, [error, success]);

  // const [{ data }, executePost] = useAxios(
  //   {
  //     url: "http://localhost:5000/createPost",
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
  //     },
  //   },
  //   { manual: true }
  // );

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("content", data.content);
    formData.append("title", data.title);
    for (let i = 0; i < selectedImages.length; i++) {
      formData.append("images", selectedImages[i]);
    }
    await api("post", formData, "/createPost", null, token);
  };

  return (
    <>
      <h2>Create Post</h2>
      <Helmet>
        <title>Create Post</title>
      </Helmet>
      <PostInput
        onSubmit={onSubmit}
        loading={loading}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
      />
    </>
  );
};

export default CreatePost;
