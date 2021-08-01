/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useContext, useEffect, useState } from "react";
import Brand from "./Brand";
import { Link } from "react-router-dom";

import Dropdown from "./Dropdown";
import { UserContext } from "../auth/UserContext";
import { baseURL } from "../../Config/API";

function Navbar({
  role,
  handleLShow,
  handleRShow,
  isLogin,
  drop,
  setDrop,
  payment,
  dark,
}) {
  // When Scrolled
  let listener = null;
  const [scrollState, setScrollState] = useState("top");

  useEffect(() => {
    listener = document.addEventListener("scroll", (e) => {
      var scrolled = document.scrollingElement.scrollTop;
      if (scrolled >= 50) {
        if (scrollState != "bottom") {
          setScrollState("bottom");
        }
      } else {
        if (scrollState != "top") {
          setScrollState("top");
        }
      }
    });
    return () => {
      document.removeEventListener("scroll", listener);
    };
  }, [scrollState]);

  //

  const [state, dispatch] = useContext(UserContext);
  console.log(state);
  return (
    <>
      <div style={{ position: "fixed", width: "100%" }}>
        <header
          className="lp_header"
          onClick={() => setDrop(drop ? !drop : drop)}
          style={{
            background: `${
              dark ? "#1F1F1F" : `${scrollState == "top" ? "" : "#1F1F1F"}`
            }`,
            transition: "0.3s ease",
          }}
        >
          {/* Brand */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <Brand />
          </Link>
          {/*  */}

          {isLogin == false && (
            <div>
              <button
                onClick={handleLShow}
                className="lp_login"
                style={{ height: 30, fontSize: 13, margin: "0 5px" }}
              >
                Login
              </button>
              <button
                onClick={handleRShow}
                className="btn lp_register"
                style={{
                  height: 30,
                  fontSize: 13,
                  margin: "0 5px",
                }}
              >
                Register
              </button>
            </div>
          )}
        </header>
        {isLogin && (
          <div>
            <div
              onClick={() => setDrop(!drop)}
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                width: 40,
                height: 40,
                cursor: "pointer",
                boxSizing: "border-box",
                padding: 2,
                background: "white",
                borderRadius: 50,
              }}
            >
              <img
                alt=""
                src={`${
                  state.user.p_image
                    ? baseURL + "/user/" + state.user.p_image
                    : "/assets/alt.jpg"
                }`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 50,
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                right: -13,
                top: `${payment ? "45px" : role == "admin" ? "25px" : "35px"}`,
                transform: "scale(0.6)",
                color: "white",
              }}
            >
              <div style={{ display: `${drop ? "block" : "none"}` }}>
                <Dropdown payment={payment} role={role} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
