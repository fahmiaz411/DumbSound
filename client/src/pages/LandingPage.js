import React, { useContext, useEffect, useState } from "react";

import "../css/pages/LandingPage.css";
import "../css/pages/Button.css";

import Card from "../components/pages/Card";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Player from "../components/pages/Player";
import Navbar from "../components/pages/Navbar";
import { UserContext } from "../components/auth/UserContext";
import { API } from "../Config/API";

const axios = require("axios").default;

function LandingPage({ isLogin, remaining }) {
  const [lShow, setLShow] = useState();
  const [load, setLoad] = useState(false);
  const [rShow, setRShow] = useState();
  const [data, setData] = useState([]);
  const [dataLocal, setDataLocal] = useState([]);
  const [player, setPlayer] = useState(false);
  const [playData, setPlayData] = useState();
  const [drop, setDrop] = useState();

  const getPlaylist = () => {
    var options = {
      method: "GET",
      url: "https://deezerdevs-deezer.p.rapidapi.com/playlist/3155776842",
      headers: {
        "x-rapidapi-key": "8cbcad13b9msh06d7f4b3bbb04f0p11258ejsn9aa63c91dd36",
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then((response) => {
        setData(response.data.tracks.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLocalPlaylist = async () => {
    try {
      const response = await API.get("/musics");
      setDataLocal(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  //   Player

  const handlePlay = (index) => {
    if (index) {
      setPlayData({
        thumb: data[index].album.cover_medium,
        music: data[index].preview,
        title: data[index].title,
        artist: data[index].artist.name,
        year: "2021",
      });
    }
    setPlayer(true);
  };

  const handleStop = () => {
    setPlayer(false);
  };

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

  useEffect(() => {
    getLocalPlaylist();
    getPlaylist();
  }, []);

  useEffect(() => {
    if (dataLocal.length > 0) {
      setDataLocal(dataLocal.reverse());
      setLoad(true);
    }
  }, [dataLocal]);

  useEffect(() => {
    console.log("drop");
    if (drop == false) {
      console.log("drop false");
    }
  }, [drop]);

  return (
    <>
      {load && (
        <>
          <Navbar
            role="user"
            payment={false}
            handleLShow={handleLShow}
            handleRShow={handleRShow}
            isLogin={isLogin}
            drop={drop}
            setDrop={setDrop}
          />
          <main
            className="lp_main"
            onClick={() => setDrop(drop ? !drop : drop)}
          >
            <div
              className="lp_top"
              style={{
                backgroundImage: "url('/assets/cover.png')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                padding: 20,
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  maxWidth: "600px",
                  textAlign: "center",
                  //   background: "red",
                }}
              >
                <span
                  className="lp_title"
                  style={{
                    fontWeight: 400,
                  }}
                >
                  Connect on DumbSound
                </span>
                <span className="lp_subtitle">
                  Discovery, Stream, and share a constantly expanding mix of
                  music from emerging and major artists around the world
                </span>
              </div>
            </div>
            <div className="lp_bottom">
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  margin: "30px 0",
                  color: "#EE4622",
                  background: "#161616",
                  fontSize: 25,
                  fontWeight: 600,
                }}
              >
                Dengarkan Dan Rasakan
              </div>
              <div className="lp_content">
                {dataLocal.map((d, index) => (
                  <Card
                    local={true}
                    remaining={remaining}
                    handleLShow={handleLShow}
                    isLogin={isLogin}
                    index={index}
                    dataPlay={d}
                    handleStop={handleStop}
                    handlePlay={handlePlay}
                    play={setPlayData}
                  />
                ))}
                {data.map((d, index) => (
                  <Card
                    remaining={remaining}
                    handleLShow={handleLShow}
                    isLogin={isLogin}
                    index={index}
                    dataPlay={d}
                    handleStop={handleStop}
                    handlePlay={handlePlay}
                    play={setPlayData}
                  />
                ))}
              </div>
            </div>
          </main>
          <footer
            style={{
              display: player ? "block" : "none",
              background: "#2E2D2D",
              width: "100%",
              position: "fixed",
              bottom: 0,
            }}
          >
            <Player
              handlePlay={handlePlay}
              load={player}
              data={playData}
              handleClose={handleStop}
            />
          </footer>
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

export default LandingPage;
