import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { baseURL } from "../../Config/API";

import "../../css/pages/Card.css";
import { UserContext } from "../auth/UserContext";

function Card({
  local,
  remaining,
  handlePlay,
  play,
  handleStop,
  dataPlay,
  index,
  isLogin,
  handleLShow,
}) {
  const path = "/data/music";

  const router = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const [data, setData] = useState({
    index: "",
    thumb: "",
    music: "",
    title: "",
    artist: "",
    year: "",
  });

  useEffect(() => {
    if (local) {
      setData({
        index,
        thumb: `${baseURL + "/music/" + dataPlay.thumbnail}`,
        music: `${baseURL + "/music/" + dataPlay.attache}`,
        title: dataPlay.title,
        artist: dataPlay.artist.name,
        year: dataPlay.year,
      });
      return;
    }
    setData({
      index: index,
      thumb: dataPlay.album.cover_medium,
      music: dataPlay.preview,
      title: dataPlay.title,
      artist: dataPlay.artist.name,
      year: "2021",
    });
  }, []);
  return (
    <>
      {data && (
        <div
          onClick={() => {
            if (isLogin) {
              if (!state.user.transaction[0]) {
                router.push("/payment");
                return;
              }
              if (remaining != 0) {
                handleStop();
                setTimeout(() => {
                  play(data);
                  console.log("play");
                  handlePlay();
                }, 1000);
              } else {
                console.log("no");
                router.push("/payment");
              }
            } else {
              handleLShow();
            }
          }}
          className="card_cont"
        >
          <div
            style={{
              width: "100%",
              height: "70%",
            }}
          >
            <img
              alt=""
              src={data.thumb}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
          <div
            style={{
              color: "white",
              margin: "10px 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 20, fontWeight: 700 }}>
              {data.title.length > 11
                ? data.title.slice(0, 11) + "..."
                : data.title}
            </span>
            <span>{data.year}</span>
          </div>
          <div style={{ color: "white" }}>{data.artist}</div>
        </div>
      )}
    </>
  );
}

export default Card;
