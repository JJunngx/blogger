import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Input from "../utils/Input";
import { ErrorMessage } from "@hookform/error-message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faX } from "@fortawesome/free-solid-svg-icons";
import classes from "./PostInput.module.css";

const PostInput = ({
  onSubmit,
  loading,
  selectedImages,
  setSelectedImages,
  post,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    if (post) {
      setValue("title", post.title);
      setValue("content", post.content);
    }
  }, [post, setValue]);
  const createPostInput = [
    {
      label: "Title",
      type: "text",
      typeName: "title",
      placeholder: "article title",
      register: register("title", { required: "required" }),
      errors: errors,
    },
  ];
  const handleFileInputChange = (event) => {
    const files = event.target.files;
    setSelectedImages([...selectedImages, ...files]);
  };

  const handleFileRemove = (index) => {
    const updatedFiles = [...selectedImages];
    updatedFiles.splice(index, 1);
    setSelectedImages(updatedFiles);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-75">
      <Input inputArr={createPostInput} />

      <div
        className={`${classes.divcontent} ${
          errors.content &&
          errors.content.type === "required" &&
          "border border-danger"
        }`}
      >
        <label className="d-inline-block" style={{ cursor: "pointer" }}>
          <FontAwesomeIcon icon={faImage} className={classes.iconImage} />
          <input
            type="file"
            accept="image/*"
            className={classes.inputImage}
            {...register("images")}
            onChange={handleFileInputChange}
            multiple
          />
        </label>

        <textarea
          className={classes.content}
          placeholder="content"
          rows="5"
          {...register("content", { required: "required" })}
        ></textarea>
        {selectedImages &&
          selectedImages.map((imageUrl, index) => (
            <span key={index} className="position-relative">
              <img
                className={classes.image}
                src={URL.createObjectURL(imageUrl)}
                alt=""
              />
              <FontAwesomeIcon
                icon={faX}
                className={classes.iconX}
                onClick={() => handleFileRemove(index)}
              />
            </span>
          ))}
      </div>

      <ErrorMessage
        errors={errors}
        name="content"
        render={({ message }) => <p className="text-danger">{message}</p>}
      />

      <Button
        variant="primary"
        className="mt-3"
        type="submit"
        disabled={loading}
      >
        Create Post
      </Button>
    </form>
  );
};

export default PostInput;
