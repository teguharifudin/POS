import { Form, Input, message } from "antd";
import axios from "axios";
import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { AuthContext } from '../context/auth.context';
import { ConfigContext } from '../context/ConfigContext';

const Login = () => {
  const [loading] = useState(false);
  const dispatch = useDispatch();
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { baseUrl } = useContext(ConfigContext);

  const submitHandler = async (values) => {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
      const response = await axios.post(`${baseUrl}/auth/login`, values);
      storeToken(response.data.authToken);
      await authenticateUser()
      dispatch({ type: "HIDE_LOADING" });
      message.success("login success");
      navigate("/");
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      message.error("something went wrong");
    }
  };

  return (
    <>
      <div className="register-page">
        {loading && <Spinner />}
        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Login</h1>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
          <Input.Password />
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Link to="/register">Not a User? Click Here to Register</Link>
            <button className="btn btn-primary">Login</button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;