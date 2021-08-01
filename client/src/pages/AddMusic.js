import React, { useEffect, useState } from "react";
import Navbar from "../components/pages/Navbar";
import { API } from "../Config/API";

function AddMusic() {
  const [isLogin, setIsLogin] = useState(true);
  const [drop, setDrop] = useState();
  const [sDrop, setSDrop] = useState();
  const [message, setMessage] = useState();
  const [alerts, setAlerts] = useState("");

  const [artists, setArtists] = useState([]);

  const [data, setData] = useState({
    title: "",
    year: "",
    thumbnail: null,
    artistId: null,
    attache: null,
  });

  console.log(data.thumbnail);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!data.artistId) {
        setAlerts("alert alert-danger");
        return setMessage("Select Singer before");
      }

      if (!data.thumbnail) {
        setAlerts("alert alert-danger");
        return setMessage("Thumbnail Image should have'nt empty");
      }
      if (!data.attache) {
        setAlerts("alert alert-danger");
        return setMessage("Music File should have'nt empty");
      }

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("title", data.title);
      formData.set("year", data.year);
      formData.set("artistId", data.artistId);
      formData.set("thumbnail", data.thumbnail[0], data.thumbnail[0].name);
      formData.set("attache", data.attache[0], data.attache[0].name);

      const response = await API.post("/add-music", formData, config);
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
        title: "",
        year: "",
        thumbnail: null,
        artistId: null,
        attache: null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getArtists = async () => {
    try {
      const response = await API.get("/artists");
      setArtists(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const element = <h1>Coba JSX</h1>;

  useEffect(() => {
    getArtists();
  }, []);

  return (
    <>
      {artists && (
        <>
          {element}
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
              Add Music
            </div>
            <form
              onSubmit={handleSubmit}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {message && (
                <div class={alerts} role="alert">
                  {message}
                </div>
              )}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <input
                  className="inp a_inp"
                  name="title"
                  required
                  value={data.title}
                  onChange={handleChange}
                  placeholder="Title"
                />
                <label
                  className="inp a_inp_a"
                  style={{
                    background: `${data.thumbnail ? "#fff" : ""}`,
                    marginLeft: 10,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    className="a_attach"
                    style={{
                      color: `${data.thumbnail ? "#ee4622" : ""}`,
                      fontSize: "17px",
                    }}
                  >
                    Attach Thumbnail
                  </span>
                  <img
                    alt=""
                    src="/assets/addfile.png"
                    style={{
                      transform: "translateY(-2px)",
                      width: 30,
                      // marginLeft: 80,
                    }}
                  />
                  <input
                    type="file"
                    accept="image/png, .jpeg, .jpg, image/gif"
                    onChange={handleChange}
                    name="thumbnail"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  />
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <input
                  className="inp"
                  type="number"
                  required
                  name="year"
                  value={data.year}
                  onChange={handleChange}
                  placeholder="Year"
                />
                <div>
                  <div
                    className="inp inp_d"
                    onClick={() => setSDrop(!sDrop)}
                    style={{
                      color: `${data.artist ? "white" : "#aaa"}`,
                      borderBottom: `${sDrop ? 0 : ""}`,
                      borderRadius: `${sDrop ? "5px 5px 0 0" : ""}`,
                    }}
                  >
                    {data.artist ? data.artist.name : "Singer"}
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
                      {artists.map((artist, i) => (
                        <div
                          className="inp inp_d"
                          onClick={() => {
                            console.log(artists.length);
                            setSDrop(!sDrop);
                            setData({
                              ...data,
                              artistId: artist.id,
                              artist: artist,
                            });
                          }}
                          style={{
                            borderRadius: `${
                              i == artists.length - 1 ? "0 0 5px 5px" : "0"
                            }`,
                            borderTop: 0,
                            borderBottom: `${
                              i == artists.length - 1 ? "2px solid white" : 0
                            }`,
                            margin: 0,
                          }}
                        >
                          {artist.name}
                        </div>
                      ))}
                    </div>
                  )}
                  {/*  */}
                </div>

                <label
                  className="inp a_inp_aa"
                  style={{
                    width: "100px",
                    background: `${data.attache && "#fff"}`,
                    color: `${data.attache && "#ee4622"}`,
                  }}
                >
                  <input
                    type="file"
                    onChange={handleChange}
                    accept="music/mp3, .m4a, .mp3, .ogg, .wav, music/ogg"
                    name="attache"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  />
                  <span
                    style={{
                      marginLeft: 10,
                      fontSize: "18px",
                    }}
                  >
                    Attache
                  </span>
                </label>
              </div>
              <button
                className="btn send"
                type="submit"
                style={{ alignSelf: "center", width: "30%" }}
              >
                Add Song
              </button>
            </form>
          </main>
        </>
      )}
    </>
  );
}

export default AddMusic;
