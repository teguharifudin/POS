import { Form, Input, message } from "antd";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { ConfigContext } from '../context/ConfigContext';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading] = useState(false);
  const { baseUrl } = useContext(ConfigContext);

  const submitHandler = async (values) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.post(`${baseUrl}/auth/signup`, values);
      message.success("Registration Successful");
      dispatch({ type: "HIDE_LOADING" });
      navigate("/login");
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      message.error("Registration Failed");
    }
  };

  return (
    <>
      <div className="register-page">
        {loading && <Spinner />}
        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Register</h1>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input your name!" },
              { min: 3, message: "Your name must be at least 3 characters" },
              { max: 50, message: "Your name cannot exceed 50 characters" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Invalid email!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              {
                min: 8,
                message: "Your password must be at least 8 characters",
              },
              {
                max: 128,
                message: "Your password cannot exceed 128 characters",
              },
              {
                pattern:
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?])/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              { required: true, message: "Please input your address!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Link to="/login">Already Registered? Click Here to Login</Link>
            <button className="btn btn-primary" type="submit">
              Register
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;
