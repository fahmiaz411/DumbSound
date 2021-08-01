import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { API } from "../../Config/API";
import { UserContext } from "../auth/UserContext";

function Dropdown({ role, payment, action, show, setShow, setRemaining, id }) {
  const [states, setStates] = useState();
  const [state, dispatch] = useContext(UserContext);

  const router = useHistory();
  const startDate = new Date();
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 30);

  const handleReject = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await API.patch(
        "/reject",
        { id, status: "rejected", startDate, dueDate: startDate },
        config
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAprove = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await API.patch(
        "/aprove",
        { id, status: "aproved", startDate, dueDate },
        config
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    router.push("/");
  };

  useEffect(() => {
    if (role == "user") {
      setStates("user");
    } else if (role == "admin") {
      setStates("admin");
    } else if (role == "aprove") {
      setStates("aprove");
    }
  }, []);

  return (
    <>
      {states == "aprove" ? (
        <>
          <div //container
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              width: "100px",
            }}
          >
            <div // triangle
              style={{
                alignSelf: "flex-end",
                marginRight: 10,
                borderStyle: "solid",
                borderWidth: "0 10px 15px 10px",
                borderColor: "transparent transparent #444 transparent",
              }}
            />

            <div //box
              style={{
                background: "#444",
                width: "100%",
                boxShadow: "#222 0 5px 5px",
                borderRadius: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxSizing: "border-box",
              }}
            >
              <div // aprove
                className="btn_m"
                onClick={() => {
                  action("aproved");
                  setRemaining(30);
                  handleAprove();
                  setShow(!show);
                }}
                style={{
                  borderRadius: "10px 10px 0 0",
                  color: "#0ACF83",
                  fontWeight: 500,
                  fontSize: 14,
                  padding: "10px 0",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                Aprove
              </div>
              <div // reject
                className="btn_m"
                onClick={() => {
                  action("rejected");
                  setRemaining(0);
                  handleReject();
                  setShow(!show);
                }}
                style={{
                  borderRadius: "0 0 10px 10px",
                  fontWeight: 500,
                  fontSize: 14,
                  color: "#FF0000",
                  padding: "10px 0",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                Reject
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div //container
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              width: "200px",
            }}
          >
            <div //triangle
              style={{
                alignSelf: "flex-end",
                marginRight: 10,
                borderStyle: "solid",
                borderWidth: "0 10px 15px 10px",
                borderColor: "transparent transparent #3A3A3A transparent",
              }}
            />
            <div //box
              style={{
                background: "#3A3A3A",
                width: "100%",
                boxShadow: "#222 0 5px 5px",
                borderRadius: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxSizing: "border-box",
              }}
            >
              {/* user  */}
              {states == "user" && (
                <>
                  {!payment && (
                    <Link
                      to="/payment"
                      style={{ width: "100%", textDecoration: "none" }}
                    >
                      <div
                        className="btn_m"
                        style={{
                          borderRadius: "10px 10px 0 0",
                          color: "white",
                          padding: "10px 0",
                          display: "flex",

                          width: "100%",
                        }}
                      >
                        <img
                          alt=""
                          src="/assets/pay.png"
                          style={{
                            width: 40,
                            height: 40,
                            margin: "0 10px",
                            marginLeft: 30,
                          }}
                        />
                        <span style={{ display: "flex", alignItems: "center" }}>
                          Pay
                        </span>
                      </div>
                    </Link>
                  )}
                </>
              )}
              {/*  */}

              {/* admin */}
              {states == "admin" && (
                <>
                  <Link
                    to="add-music"
                    style={{ width: "100%", textDecoration: "none" }}
                  >
                    <div
                      className="btn_m"
                      style={{
                        borderRadius: "10px 10px 0 0",
                        color: "white",
                        padding: "10px 0",
                        display: "flex",

                        width: "100%",
                      }}
                    >
                      <img
                        alt=""
                        src="/assets/addmusic.png"
                        style={{
                          width: 40,
                          height: 40,
                          margin: "0 10px",
                          marginLeft: 30,
                        }}
                      />
                      <span style={{ display: "flex", alignItems: "center" }}>
                        Add Music
                      </span>
                    </div>
                  </Link>
                  <Link
                    to="/add-artist"
                    style={{ width: "100%", textDecoration: "none" }}
                  >
                    <div
                      className="btn_m"
                      style={{
                        color: "white",
                        padding: "10px 0",
                        display: "flex",

                        width: "100%",
                      }}
                    >
                      <img
                        alt=""
                        src="/assets/addartist.png"
                        style={{
                          width: 40,
                          height: 40,
                          margin: "0 10px",
                          marginLeft: 30,
                        }}
                      />
                      <span style={{ display: "flex", alignItems: "center" }}>
                        Add Artist
                      </span>
                    </div>
                  </Link>
                </>
              )}
              {/*  */}
              <Link
                to="/edit-profile"
                style={{ textDecoration: "none", width: "100%" }}
              >
                <div
                  className="btn_m"
                  style={{
                    borderRadius: `${payment ? "10px 10px 0 0" : ""}`,
                    color: "white",
                    padding: "10px 0",
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <img
                    alt=""
                    src="/assets/edit.png"
                    style={{
                      width: 40,
                      height: 40,
                      margin: "0 10px",
                      marginLeft: 30,
                    }}
                  />
                  <span style={{ display: "flex", alignItems: "center" }}>
                    Edit Profile
                  </span>
                </div>
              </Link>
              {/* logout */}
              <Link
                to="#"
                onClick={handleLogout}
                style={{ width: "100%", textDecoration: "none" }}
              >
                <div
                  className="btn_m"
                  style={{
                    borderRadius: `${payment ? "10px" : "0 0 10px 10px"}`,
                    borderTop: `${payment ? "" : "2px solid white"}`,
                    color: "white",
                    padding: "10px 0",
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <img
                    alt=""
                    src="/assets/logout.png"
                    style={{
                      width: 40,
                      height: 40,
                      margin: "0 10px",
                      marginLeft: 30,
                    }}
                  />
                  <span style={{ display: "flex", alignItems: "center" }}>
                    Logout
                  </span>
                </div>
              </Link>
              {/*  */}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Dropdown;
