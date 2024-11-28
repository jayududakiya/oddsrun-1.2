import React from "react";
import styles from "./Login.module.css";
import FormDefault from "../../FormDefault/FormDefault";
import { NavLink, useNavigate } from "react-router-dom";
import PostRequest from "../../services/PostRequest";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const loginFormData = async (event) => {
    try {
      event.preventDefault();

      const formData = new FormData(event.target);
      var object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });

      const response = await PostRequest("/login", object);
      //console.log(response);
      if (response) {
        toast.success("Login Successfully");
        window.localStorage.setItem("token", response.token);
        window.localStorage.setItem("userId", response._id);
        window.localStorage.setItem("username", response.name);
        navigate("/home");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div>
      <FormDefault title="Sign In">
        <form onSubmit={loginFormData}>
          <div className={styles.formFiledOne}>
            <p>Email</p>
            <input
              type="text"
              placeholder="Email"
              className="form-control"
              name="email"
            />
          </div>

          <div className={styles.formFiledOne}>
            <p>Password</p>
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              name="password"
            />
          </div>

          <div className="d-flex justify-content-between mb-4">
            <div>
              <input type="checkbox" className="form-check-input me-2" />
              <label className="form-check-label">Remember me</label>
            </div>

            <NavLink to={"/forgot-password"}>
              <div className={styles.forgotPasswordText}>
                <p>Forgot Password?</p>
              </div>
            </NavLink>
          </div>

          <div>
            <button
              className={`btn btn-primary mb-4 ${styles.btn}`}
              type="submit"
            >
              Login
            </button>
          </div>

          <p>
            Don’t have an account?
            <span className={styles.signUp}>
              <NavLink to={"/register"} className={styles.active}>
                {" "}
                Sign up
              </NavLink>
            </span>
          </p>
        </form>
      </FormDefault>
    </div>
  );
};

export default Login;
