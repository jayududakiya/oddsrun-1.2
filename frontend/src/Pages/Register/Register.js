import React from "react";
import FormDefault from "../../FormDefault/FormDefault";
import styles from "../../Pages/Login/Login.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import PostRequest from "../../services/PostRequest";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const registerFormData = async (event) => {
    try {
      event.preventDefault();

      const formData = new FormData(event.target);
      var object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });
      const response = await PostRequest("/register", object);
      if (response) {
        toast.success("Register successfully");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div>
      <FormDefault title="Sign Up">
        <form onSubmit={registerFormData}>
          <div className="mt-4">
            <p className="mb-2">Name</p>
            <input type="text" className="form-control" name="name" />
          </div>

          <div className="mt-3">
            <p className="mb-2">Email</p>
            <input type="text" className="form-control" name="email" />
          </div>

          <div className="mt-3">
            <p className="mb-2">Password</p>
            <input type="password" className="form-control" name="password" />
          </div>

          <div className="mt-4">
            <button
              className={`btn btn-primary mb-4 ${styles.btn}`}
              type="submit"
            >
              Sign up
            </button>
          </div>

          <p className="mb-4">
            Already have an account?
            <NavLink to={"/login"} className={styles.active}>
              <span className={styles.signUp}> Sign in</span>
            </NavLink>
          </p>
        </form>
      </FormDefault>
    </div>
  );
};

export default Register;
