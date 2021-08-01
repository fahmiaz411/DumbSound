import React from "react";

function Brand() {
  return (
    <>
      {/* <div style={{ width: 200 }}>
        <img
          alt=""
          src="/assets/logo.png"
          style={{ width: "100%", objectFit: "contain" }}
        />
      </div> */}
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: 7,
            height: 30,
            borderRadius: 10,
            background: "white",
            margin: "0 1px",
          }}
        />
        <div
          style={{
            width: 7,
            height: 30,
            borderRadius: 10,
            background: "#EE4622",
            margin: "0 1px",
            transform: "translateY(5px)",
          }}
        />
        <div
          style={{
            width: 7,
            height: 30,
            borderRadius: 10,
            background: "white",
            margin: "0 1px",
          }}
        />
        <div
          style={{
            width: 7,
            height: 30,
            borderRadius: 10,
            background: "#EE4622",
            margin: "0 1px",
            transform: "translateY(5px)",
          }}
        />

        <div style={{ margin: "0 10px" }}>
          <span
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#ee4622",
            }}
          >
            DUMB
          </span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "white",
            }}
          >
            SOUND
          </span>
        </div>
      </div>
    </>
  );
}

export default Brand;
