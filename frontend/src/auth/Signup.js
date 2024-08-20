import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useHttp from "../hook/useHttp";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import Input from "../utils/Input";
import createData from "../utils/createObject";
import { Helmet } from "react-helmet-async";
const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const { api, loading, error } = useHttp();
  const [success, setSuccess] = useState(null);

  const getToken = Cookies.get("token");

  useEffect(() => {
    getToken && navigate("/");
  }, [getToken, navigate]);
  useEffect(() => {
    if (success) {
      navigate("/login");
    }
    if (error) {
      setError("email", {
        type: "server",
        message: error.message,
        types: { required: error.message },
      });
    }
  }, [error, setError, success, navigate]);

  const onSubmit = async (data) => {
    await api("post", data, "/signup", setSuccess);
  };
  const signupInput = [
    createData(
      "Name",
      "text",
      "name",
      "Your name",
      register("name", { required: "required" }),
      errors
    ),
    createData(
      "Email",
      "email",
      "email",
      "Your email",
      register("email", {
        required: "required",
        pattern: {
          value: /^[A-Za-z0-9._%+-]+@gmail\.com$/,
          message: "Email invalid",
        },
      }),
      errors
    ),
    createData(
      "Password",
      "password",
      "password",
      "Your Password",
      register("password", {
        required: "required",
        minLength: {
          value: 8,
          message: "Password must be at least 6 characters",
        },
        pattern: {
          value:
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        },
      }),
      errors
    ),
  ];
  // const signupInput = [
  //   {
  //     label: "Name",
  //     type: "text",
  //     typeName: "name",
  //     placeholder: "Your name",
  //     register: register("name", { required: "required" }),
  //     errors: errors,
  //   },
  //   {
  //     label: "Email",
  //     type: "email",
  //     typeName: "email",
  //     placeholder: "Your email",
  //     register: register("email", {
  //       required: "required",
  //       pattern: {
  //         value: /^[A-Za-z0-9._%+-]+@gmail\.com$/,
  //         message: "Email invalid",
  //       },
  //     }),
  //     errors: errors,
  //   },

  //   {
  //     label: "Password",
  //     type: "password",
  //     typeName: "password",
  //     placeholder: "Your Password",
  //     register: register("password", {
  //       required: "required",
  //       minLength: {
  //         value: 8,
  //         message: "Password must be at least 6 characters",
  //       },
  //       pattern: {
  //         value:
  //           /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
  //         message:
  //           "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  //       },
  //     }),
  //     errors: errors,
  //   },
  // ];

  return (
    <div
      className="d-flex justify-content-center"
      style={{ marginTop: "150px" }}
    >
      <Helmet>
        <title>Sign up</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-25 shadow p-3 rounded"
      >
        <Input inputArr={signupInput} />
        <Button
          variant="primary"
          className="w-100 rounded-5 mt-3"
          type="submit"
          disabled={loading}
        >
          Sign up
        </Button>
        <p className="text-center">
          <Link to="/login" className="text-decoration-none text-center mt-2">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
