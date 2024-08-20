import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import useHttp from "../hook/useHttp";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Input from "../utils/Input";
import createData from "../utils/createObject";
const Login = () => {
  const [token, setToken] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const { api, loading, error } = useHttp();
  const navigate = useNavigate();
  const getToken = Cookies.get("token");

  useEffect(() => {
    getToken && navigate("/");
  }, [getToken, navigate]);

  useEffect(() => {
    if (token) {
      Cookies.set("token", token);
      navigate("/");
    }
    if (error) {
      error.email &&
        setError("email", {
          type: "server",
          message: error.message,
          types: { required: error.email },
        });
      error.password &&
        setError("password", {
          type: "server",
          message: error.message,
          types: { required: error.password },
        });
    }
  }, [token, navigate, error, setError]);

  const onSubmit = async (data) => {
    await api("post", data, "/login", setToken);
  };
  const loginInput = [
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
      "",
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
            "mật khẩu phải có kí tự viết hoa,viết thường và kí tự đặc biệt",
        },
      }),
      errors
    ),
  ];
  // const loginInput = [
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
  //     type: "",
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
  //           "mật khẩu phải có kí tự viết hoa,viết thường và kí tự đặc biệt",
  //       },
  //     }),
  //     errors: errors,
  //   },
  // ];

  return (
    <div
      className="d-flex justify-content-center "
      style={{ marginTop: "150px" }}
    >
      <Helmet>
        <title>Login</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-25 shadow p-3 rounded"
      >
        <Input inputArr={loginInput} />

        <p className="text-primary text-end mt-2">Forgot password?</p>
        <Button
          variant="primary"
          className="w-100 rounded-5 mt-3"
          type="submit"
          disabled={loading}
        >
          Login
        </Button>
        <p className="text-center">
          <Link to="/signup" className="text-decoration-none text-center mt-2">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import useHttp from "../hook/useHttp";
// import Cookies from "js-cookie";
// import Button from "react-bootstrap/Button";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// import classes from "./Login.module.css";
// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [token, setToken] = useState("");

//   const {
//     register,
//     handleSubmit,
//     setError,
//     formState: { errors },
//   } = useForm();
//   const { api, loading, error } = useHttp();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (token) {
//       Cookies.set("token", token);
//       navigate("/");
//     }
//     if (error) {
//       setError("email", {
//         type: "server",
//         message: error.message,
//         types: { required: error.message },
//       });
//     }
//   }, [token, navigate,error,setError]);

//   const onSubmit = async (data) => {
//     await api("post", data, "/login", setToken);
//   };
//   const ErrorInput = ({ nameInput, type, message }) => {
//     return (
//       errors[nameInput] &&
//       errors[nameInput].type === type && (
//         <p className="text-danger">
//           {type === "required" ? "please fill data" : message}
//         </p>
//       )
//     );
//   };

//   return (
//     <div
//       className="d-flex justify-content-center "
//       style={{ marginTop: "150px" }}
//     >
//       <form onSubmit={handleSubmit(onSubmit)} className="w-25">
//         <label>Email</label>
//         <input
//           type="email"
//           placeholder="email"
//           {...register("email", {
//             required: true,
//             pattern: /^[A-Za-z0-9._%+-]+@gmail\.com$/,
//           })}
//           className="form-control mb-3"
//         />
//         <ErrorInput nameInput="email" type="required" message="" />
//         <ErrorInput nameInput="email" type="pattern" message="Email Invalid" />
//         <label>Password</label>
//         <div className="d-flex align-items-center border border-secondary-subtle rounded-2 ">
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             {...register("password", {
//               required: true,
//               minLength: 6,
//             })}
//             className={`${classes.password} flex-fill`}
//             // className={error && error?.password ? "border border-danger" : ""}
//           />
//           {showPassword ? (
//             <FontAwesomeIcon
//               icon={faEye}
//               className="me-2"
//               onClick={() => setShowPassword(false)}
//             />
//           ) : (
//             <FontAwesomeIcon
//               icon={faEyeSlash}
//               onClick={() => setShowPassword(true)}
//               className="me-2"
//             />
//           )}
//         </div>

//         <ErrorInput nameInput="password" type="required" message="" />
//         <ErrorInput
//           nameInput="password"
//           type="minLength"
//           message="Password must be at least 6 characters"
//         />
//         <p className="text-primary text-end mt-2">Forgot password?</p>
//         <Button
//           variant="primary"
//           className="w-100 rounded-5 mt-3"
//           type="submit"
//           disabled={loading}
//         >
//           Login
//         </Button>
//         <p className="text-center">
//           <Link to="/signup" className="text-decoration-none text-center mt-2">
//             Sign up
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;
