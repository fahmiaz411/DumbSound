import React, { useState } from "react";
import Navbar from "../components/pages/Navbar";
import { API } from "../Config/API";

function AddArtist() {
  const [isLogin, setIsLogin] = useState(true);
  const [drop, setDrop] = useState();
  const [sDrop, setSDrop] = useState();
  const [message, setMessage] = useState();
  const [alerts, setAlerts] = useState("");

  const [data, setData] = useState({
    name: "",
    old: "",
    type: "Solo",
    startCareer: "",
  });

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

      const response = await API.post("/add-artist", body, config);
      console.log(response);

      if (response.data.status == "failed") {
        setAlerts("alert alert-danger");
        return setMessage(response.data.Message);
      }

      setAlerts("alert alert-success");
      setMessage(`Success`);

      setTimeout(() => {
        setMessage("");
      }, 1000);

      setData({
        name: "",
        old: "",
        type: "Solo",
        startCareer: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data);
  return (
    <>
      <Navbar
        role="admin"
        dark={true}
        isLogin={isLogin}
        drop={drop}
        setDrop={setDrop}
      />
      <main
        onClick={() => setDrop(drop ? !drop : drop)}
        className="a_main"
        style={{
          background: "#161616",
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          color: "white",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 900,
            alignSelf: "flex-start",
            margin: "40px 0",
          }}
        >
          Add Artist
        </div>
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {message && (
              <div class={alerts} role="alert">
                {message}
              </div>
            )}
            <input
              className="inp"
              required
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Name"
            />
            <input
              className="inp"
              required
              name="old"
              value={data.old}
              type="number"
              onChange={handleChange}
              placeholder="Old"
            />
            <div>
              <div
                className="inp inp_d"
                onClick={() => setSDrop(!sDrop)}
                style={{
                  color: `${data.type ? "white" : "#aaa"}`,
                  borderBottom: `${sDrop ? 0 : ""}`,
                  borderRadius: `${sDrop ? "5px 5px 0 0" : ""}`,
                }}
              >
                {data.type}
                <img
                  alt=""
                  className="tri_t"
                  src="/assets/tri.png"
                  style={{
                    width: 20,
                    position: "absolute",
                  }}
                />
              </div>
              {/* drop  */}
              {sDrop && (
                <div
                  style={{
                    position: "",
                    width: "100%",
                    marginTop: -11,
                  }}
                >
                  <div //1
                    className="inp inp_d"
                    onClick={() => {
                      setSDrop(!sDrop);
                      setData({
                        ...data,
                        type: "Solo",
                      });
                    }}
                    style={{
                      borderRadius: "0",

                      borderTop: 0,
                      borderBottom: 0,

                      margin: 0,
                    }}
                  >
                    Solo
                  </div>
                  <div //2
                    className="inp inp_d"
                    onClick={() => {
                      setSDrop(!sDrop);
                      setData({
                        ...data,
                        type: "Band",
                      });
                    }}
                    style={{
                      borderRadius: "0 0 5px 5px",

                      borderTop: 0,
                      borderBottom: "2px solid white",

                      margin: 0,
                    }}
                  >
                    Band
                  </div>
                </div>
              )}
              {/*  */}
            </div>
            <input
              className="inp"
              required
              name="startCareer"
              value={data.startCareer}
              type="number"
              onChange={handleChange}
              placeholder="Start a Career"
            />
          </div>
          <button
            type="submit"
            className="btn send"
            style={{ alignSelf: "center", width: "30%" }}
          >
            Add Artist
          </button>
        </form>
      </main>
    </>
  );
}

export default AddArtist;
