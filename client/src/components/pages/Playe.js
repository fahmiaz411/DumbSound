import React, { useEffect, useRef, useState } from "react";
import Countdown from "react-countdown";
import CountUp from "react-countup";

import "../../css/pages/Player.css";

function Player({ handleClose, data, load }) {
  let duration = 240;

  setInterval(() => {
    console.log("test");
  }, 1000);

  let minutes = duration / 60;
  minutes = parseInt(minutes);

  let seconds = duration % 60;

  const soundRef = useRef(null);

  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(0);
  const [close, setClose] = useState();
  const [pause, setPause] = useState(true);
  const [mute, setMute] = useState(false);
  const [vol, setVol] = useState(50);
  const [tempVol, setTempVol] = useState();

  const playMin = parseInt(time / 60);
  const playSec = time % 60;

  const handlePlay = (next) => {
    if (next == 0) {
      soundRef.current.currentTime = 0;
      soundRef.current.play();
      return;
    } else if (next == duration - 1) {
      soundRef.current.currentTime = duration - 1;
      soundRef.current.play();
    } else if (next) {
      soundRef.current.currentTime = parseInt(time) + next;
      soundRef.current.play();
      return;
    }
    soundRef.current.currentTime = time;
    soundRef.current.play();
  };

  useEffect(() => {
    console.log("time");
    if (load) {
      handlePlay();
    }
  }, [time]);

  const handlePause = () => {
    soundRef.current.pause();
  };

  useEffect(() => {
    console.log("load");
    if (load == true) {
      setPause(false);
      handlePlay();
    }
  }, [load]);

  console.log(time);

  useEffect(() => {
    console.log("vol");
    if (vol == 0) {
      if (mute) {
        return;
      }
      setMute(true);
    } else {
      if (!mute) {
        return;
      }
      setMute(false);
    }
  }, [vol]);

  return (
    <>
      {load && (
        <div
          style={{
            color: "white",
            // background: "red",
            height: "100%",
            display: "flex",
            boxSizing: "border-box",
            padding: "0 10%",
            alignItems: "center",
          }}
        >
          <audio ref={soundRef} src={data.music} />
          {/* playlist */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              // justifyContent: "flex-end",
              alignItems: "center",
              // background: "red",
              flex: 3,
              height: "100%",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                cursor: "pointer",
                borderRadius: 50,
                margin: "0 10px",
              }}
            >
              <img
                alt=""
                src={data.thumb}
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
                display: "flex",
                flexDirection: "column",
                // background: "yellow",
                marginRight: 10,
                width: "80%",
              }}
            >
              <div>
                {data.title} - {data.artist}
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>test</span>

                {/* input range */}

                <input
                  value={time}
                  style={{
                    minWidth: "100px",
                    width: "100%",
                    margin: "0 10px",
                    borderRadius: "0px",
                    color: "red",
                  }}
                  onChange={(e) => {
                    setTime(e.target.value);
                    handlePause();
                    handlePlay();
                  }}
                  type="range"
                  min="0"
                  max={duration}
                />

                {/*  */}

                <span>
                  {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </span>
              </div>
            </div>
          </div>
          {/*  */}
          {/* Play pause */}
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: 0.5,
              // background: "red",
            }}
          >
            <div
              onClick={() => {
                if (time <= 10) {
                  setTime(0);
                  return handlePlay(0);
                }
                setTime(time - 10);
                handlePlay(-10);
              }}
              style={{
                display: "flex",
                width: 30,
                height: 30,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                // background: "black",
                transform: "rotate(-90deg)",
              }}
            >
              <div
                style={{
                  cursor: "pointer",
                  width: 15,
                  height: 4,
                  background: "white",
                }}
              />
              <div
                style={{
                  cursor: "pointer",
                  width: 0,
                  height: 0,
                  borderStyle: "solid",
                  borderWidth: "0 10px 15px 10px",
                  borderColor: "transparent transparent white transparent",
                }}
              />
            </div>
            {pause ? (
              <img
                onClick={() => {
                  setPause(!pause);
                  handlePlay();
                }}
                alt=""
                src="/assets/play.png"
                style={{
                  margin: "0 20px",
                  cursor: "pointer",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                }}
              />
            ) : (
              <img
                onClick={() => {
                  setPause(!pause);
                  handlePause();
                }}
                alt=""
                src="/assets/pause.png"
                style={{
                  margin: "0 20px",
                  cursor: "pointer",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                }}
              />
            )}
            <div
              onClick={() => {
                if (time >= duration - 10) {
                  setTime(duration - 1);
                  return handlePlay(duration - 1);
                }
                setTime(parseInt(time) + 10);
                handlePlay(10);
              }}
              style={{
                display: "flex",
                width: 30,
                height: 30,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                // background: "black",
                transform: "rotate(90deg)",
              }}
            >
              <div
                style={{
                  cursor: "pointer",
                  width: 15,
                  height: 4,
                  background: "white",
                }}
              />
              <div
                style={{
                  cursor: "pointer",
                  width: 0,
                  height: 0,
                  borderStyle: "solid",
                  borderWidth: "0 10px 15px 10px",
                  borderColor: "transparent transparent white transparent",
                }}
              />
            </div>
          </div>
          {/*  */}
          {/* volume */}
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              // background: "red",
            }}
          >
            {mute ? (
              <img
                onClick={() => {
                  setMute(!mute);
                  setVol(tempVol);
                }}
                alt=""
                src="/assets/mute.png"
                style={{
                  margin: "0 20px",
                  cursor: "pointer",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                }}
              />
            ) : (
              <>
                {vol <= 50 ? (
                  <img
                    onClick={() => {
                      setMute(!mute);
                      setTempVol(vol);
                      setVol(0);
                    }}
                    alt=""
                    src="/assets/vol50.png"
                    style={{
                      margin: "0 20px",
                      cursor: "pointer",
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <img
                    onClick={() => {
                      setMute(!mute);
                      setTempVol(vol);
                      setVol(0);
                    }}
                    alt=""
                    src="/assets/volume.png"
                    style={{
                      margin: "0 20px",
                      cursor: "pointer",
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                    }}
                  />
                )}
              </>
            )}
            <input
              value={vol}
              style={{
                minWidth: "50px",
                width: "50%",
                margin: "0 10px",
                borderRadius: "0px",
                color: "red",
              }}
              onChange={(e) => setVol(e.target.value)}
              type="range"
              min="0"
              max="100"
            />
          </div>
          {/*  */}

          {/* close */}
          <div
            onClick={() => {
              // handleStop();
              handleClose();
            }}
            style={{
              cursor: "pointer",
              position: "absolute",
              color: "white",
              fontSize: 20,
              right: 0,
              marginRight: 20,
              fontWeight: 700,
            }}
          >
            X
          </div>
        </div>
      )}
    </>
  );
}

export default Player;
