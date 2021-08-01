/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from "react";
import { Modal, Form } from "react-bootstrap";
import "../../css/pages/Input.css";
import "../../css/pages/Button.css";
import "../../css/auth/Register.css";
import { API } from "../../Config/API";
import { UserContext } from "./UserContext";

function Login({ show, handleClose, handleRShow }) {
  const [message, setMessage] = useState();
  const [alerts, setAlerts] = useState("");
  const [state, dispatch] = useContext(UserContext);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const swicthForm = () => {
    handleClose();
    handleRShow();
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify({
        ...data,
      });

      const response = await API.post("/login", body, config);

      console.log(response);

      if (response.data.status == "failed") {
        setAlerts("alert alert-danger");
        return setMessage(response.data.message);
      }

      setAlerts("alert alert-success");
      setMessage(`Welcome ${response.data.data.user.fullname}`);

      let payload = response.data.data.user;
      payload.token = response.data.token;

      setTimeout(() => {
        setMessage("");
        dispatch({
          type: "LOGIN_SUCCESS",
          payload,
        });
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Body className="reg_body">
          <div className="reg_title">Login</div>
          {message && (
            <div class={alerts} role="alert">
              {message}
            </div>
          )}
          <form onSubmit={handleLogin} className="reg_form">
            <input
              className="inp"
              value={data.email}
              name="email"
              type="email"
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              className="inp"
              value={data.password}
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Password"
            />
            <button type="submit" className="btn" style={{ marginTop: 20 }}>
              Login
            </button>
          </form>
          <div style={{ color: "#B1B1B1", textAlign: "center" }}>
            Don't have an account ? Click{" "}
            <a
              onClick={swicthForm}
              style={{
                cursor: "pointer",
                textDecoration: "none",
                color: "#B1B1B1",
                fontWeight: 700,
              }}
            >
              Here
            </a>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Login;
