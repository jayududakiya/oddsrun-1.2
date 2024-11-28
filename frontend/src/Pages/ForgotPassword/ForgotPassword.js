import React from "react";
import FormDefault from "../../FormDefault/FormDefault";
import styles from "../../Pages/Login/Login.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import PostRequest from "../../services/PostRequest";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const forgotPassFormData = async (event) => {
    try {
      event.preventDefault();

      const formData = new FormData(event.target);
      var object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });
      const response = await PostRequest("/password/forgot", object);

      if (response) {
        toast.success(response.message);
        navigate("/reset-password");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <FormDefault title="Forgot Password">
      <form onSubmit={forgotPassFormData}>
        <div className={styles.formFiledOne}>
          <p>Email</p>
          <input type="text" className="form-control" name="email" />

          <div className="mt-3">
            {/* <NavLink to={"/reset-password"}> */}
            <button
              className={`btn btn-primary mb-4 ${styles.btn}`}
              type="submit"
            >
              Forgot Password
            </button>
            {/* </NavLink> */}
          </div>
        </div>
      </form>
    </FormDefault>
  );
};

export default ForgotPassword;
