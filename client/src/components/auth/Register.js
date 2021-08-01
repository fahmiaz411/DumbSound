/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import "../../css/pages/Input.css";
import "../../css/pages/Button.css";
import "../../css/auth/Register.css";
import { API } from "../../Config/API";

function Register({ show, handleClose, handleLShow }) {
  const [message, setMessage] = useState();
  const [alerts, setAlerts] = useState("");
  const [drop, setDrop] = useState();

  const [data, setData] = useState({
    email: "",
    password: "",
    fullname: "",
    gender: "",
    phone: "",
    address: "",
  });

  console.log(data);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
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

      const response = await API.post("/register", body, config);
      console.log(response);

      if (response.data.status == "failed") {
        setAlerts("alert alert-danger");
        return setMessage(response.data.message);
      }

      setAlerts("alert alert-success");
      setMessage(`Success`);

      setTimeout(() => {
        setMessage("");
        swicthForm();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const swicthForm = () => {
    handleClose();
    handleLShow();
  };
  return (
    <>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Body className="reg_body">
          <div className="reg_title">Register</div>
          {message && (
            <div class={alerts} role="alert">
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit} className="reg_form">
            <input
              value={data.email}
              name="email"
              type="email"
              onChange={handleChange}
              className="inp"
              placeholder="Email"
            />
            <input
              value={data.password}
              name="password"
              type="password"
              onChange={handleChange}
              className="inp"
              placeholder="Password"
            />
            <input
              value={data.fullname}
              name="fullname"
              type="text"
              onChange={handleChange}
              className="inp"
              placeholder="Full Name"
            />

            <div>
              <div
                className="inp inp_d"
                onClick={() => setDrop(!drop)}
                style={{
                  color: `${data.gender ? "white" : "#aaa"}`,
                  borderBottom: `${drop ? 0 : ""}`,
                  borderRadius: `${drop ? "5px 5px 0 0" : ""}`,
                }}
              >
                {data.gender ? data.gender : "Gender"}
                <img
                  alt=""
                  src="/assets/tri.png"
                  style={{
                    width: 20,
                    position: "absolute",
                    marginTop: 5,
                    right: 30,
                  }}
                />
              </div>
              {/* drop  */}
              {drop && (
                <div
                  style={{
                    position: "absolute",
                    width: "88.5%",
                    marginTop: -11,
                    right: 20,
                  }}
                >
                  <div //1
                    className="inp inp_d"
                    onClick={() => {
                      setDrop(!drop);
                      setData({
                        ...data,
                        gender: "Male",
                      });
                    }}
                    style={{
                      borderRadius: "0",
                      borderTop: 0,
                      borderBottom: 0,
                      margin: 0,
                    }}
                  >
                    Male
                  </div>
                  <div //2
                    className="inp inp_d"
                    onClick={() => {
                      setDrop(!drop);
                      setData({
                        ...data,
                        gender: "Female",
                      });
                    }}
                    style={{
                      margin: 0,
                      borderRadius: "0 0 5px 5px",
                      borderTop: 0,
                    }}
                  >
                    Female
                  </div>
                </div>
              )}
              {/*  */}
            </div>

            <input
              value={data.phone}
              name="phone"
              type="number"
              onChange={handleChange}
              className="inp"
              placeholder="Phone"
            />
            <input
              value={data.address}
              name="address"
              type="text"
              onChange={handleChange}
              className="inp"
              placeholder="Address"
            />

            <button type="submit" className="btn" style={{ marginTop: 20 }}>
              Register
            </button>
          </form>
          <div style={{ color: "#B1B1B1", textAlign: "center" }}>
            Already have an account ? Click{" "}
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

export default Register;
