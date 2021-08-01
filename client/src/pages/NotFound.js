import React, { useEffect, useState } from "react";
import Navbar from "../components/pages/Navbar";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import { useParams } from "react-router-dom";

function NotFound({ isLogin, role }) {
  const { url } = useParams();
  const [show, setShow] = useState();

  console.log(url);

  useEffect(() => {
    if (url == "add-music" || url == "add-artist") {
      setShow(false);
      return;
    } else if (url == "payment" || url == "edit-profile") {
      setShow(false);
      return;
    }
    setShow(true);
  }, [url]);

  const [lShow, setLShow] = useState();
  const [rShow, setRShow] = useState();
  const [drop, setDrop] = useState();

  // Login

  const handleLShow = () => {
    setLShow(true);
  };

  //   Register

  const handleRShow = () => {
    setRShow(true);
  };

  //   Login Regist Close

  const handleClose = () => {
    setLShow(false);
    setRShow(false);
  };
  return (
    <>
      {show && (
        <>
          <Navbar
            role={role}
            handleLShow={handleLShow}
            handleRShow={handleRShow}
            handleClose={handleClose}
            drop={drop}
            setDrop={setDrop}
            dark={true}
            isLogin={isLogin}
          />
          <main
            className="a_main"
            onClick={() => setDrop(drop ? !drop : drop)}
            style={{
              background: "#161616",
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontSize: 40,
              fontWeight: 700,
              boxSizing: "border-box",
            }}
          >
            <div>
              <a style={{ color: "#EE4622" }}>404</a> | Page Not Found
            </div>
          </main>
          <Login
            show={lShow}
            handleClose={handleClose}
            handleRShow={handleRShow}
          />
          <Register
            show={rShow}
            handleClose={handleClose}
            handleLShow={handleLShow}
          />
        </>
      )}
    </>
  );
}

export default NotFound;
