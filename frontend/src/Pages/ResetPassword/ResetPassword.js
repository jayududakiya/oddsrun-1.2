import React from "react";
import FormDefault from "../../FormDefault/FormDefault";
import styles from "../../Pages/Login/Login.module.css";
import PostRequest from "../../services/PostRequest";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const resetPass = async (event) => {
    try {
      event.preventDefault();

      const formData = new FormData(event.target);
      var object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });

      const data = {
        user: window.localStorage.getItem("userId"),
        password: object.password,
        otp: object.otp,
      };

      const response = await PostRequest("/password/reset", data);

      if (response) {
        toast.success("Reset password");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <FormDefault title="Reset Password">
      <form onSubmit={resetPass}>
        <div className={styles.formFiledOne}>
          <p>Otp</p>
          <input type="password" className="form-control" name="otp" />
        </div>

        <div className={styles.formFiledOne}>
          <p>New Password</p>
          <input type="password" className="form-control" name="password" />
        </div>

        <div>
          <button
            className={`btn btn-primary mb-4 ${styles.btn}`}
            type="submit"
          >
            Reset Password
          </button>
        </div>
      </form>
    </FormDefault>
  );
};

export default ResetPassword;
