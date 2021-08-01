import React, { useEffect } from "react";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "../../css/pages/Player.css";

function Player({ handleClose, data, load, handlePlay }) {
  const { width, height } = useWindowDimensions();

  let track = data?.title + " - " + data?.artist;
  if (track) {
    if (track.length > 30) {
      track =
        data.title.slice(0, 27 - data.artist.length) + " ... - " + data.artist;
      console.log(data.artist);
    }
  }

  console.log(track);

  return (
    <>
      {load && (
        <>
          <div
            style={{ display: "flex", flexDirection: "row", margin: "0 10%" }}
          >
            <div style={{ height: 80, display: "flex", alignItems: "center" }}>
              <span
                style={{
                  position: "absolute",
                  color: "white",
                  fontWeight: 600,
                  fontSize: `${width < 960 ? "15px" : ""}`,
                  top: 15,
                  marginLeft: 65,
                }}
              >
                {width < 500
                  ? track
                  : width < 960
                  ? data.title.length > 30
                    ? `${data.title.slice(0, 30)} ... - ${data.artist}`
                    : `${data.title} - ${data.artist}`
                  : `${data.title} - ${data.artist}`}
              </span>
              <div
                style={{
                  color: "white",
                  backgroundImage: `url('${data.thumb}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "50%",
                  width: 50,
                  height: 50,
                }}
              />
            </div>
            <AudioPlayer
              className="player"
              src={data?.music}
              onPlay={(e) => console.log("onPlay")}
              autoPlay={load}
              layout={width < 960 ? "" : "horizontal"}
              showFilledVolume={true}
            />
            <div
              onClick={handleClose}
              style={{
                position: "absolute",
                display: "flex",
                cursor: "pointer",
                color: "white",
                fontSize: 20,
                top: `${width < 960 ? "-10px" : "10px"}`,
                right: `${width < 960 ? "-10px" : "0"}`,
                margin: "15px 20px",
                fontWeight: 700,
              }}
            >
              X
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Player;

function useWindowDimensions() {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);

  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  React.useEffect(() => {
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  });

  return {
    width,
    height,
  };
}
