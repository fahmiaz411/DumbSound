import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../components/auth/UserContext";

import Navbar from "../components/pages/Navbar";
import { API, baseURL } from "../Config/API";

function EditProfile() {
  const [state, dispatch] = useContext(UserContext);
  const [drop, setDrop] = useState();
  const [sDrop, setSDrop] = useState();
  const [alerts, setAlerts] = useState();
  const [message, setMessage] = useState();

  const router = useHistory();

  const { email, fullname, gender, phone, address, p_image } = state.user;

  const [preview, setPreview] = useState(
    `${p_image ? baseURL + "/user/" + p_image : "/assets/alt.jpg"}`
  );

  const [data, setData] = useState({
    email,
    fullname,
    gender,
    phone,
    address,
    p_image,
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("email", data.email);
      formData.set("fullname", data.fullname);
      formData.set("gender", data.gender);
      formData.set("phone", data.phone);
      formData.set("address", data.address);
      if (typeof data.p_image == "object") {
        formData.set("image", data.p_image[0], data.p_image[0].name);
      }

      const response = await API.patch("/edit-profile", formData, config);

      if (response.data.status == "failed") {
        setAlerts("alert alert-danger");
        return setMessage(response.data.Message);
      }

      setAlerts("alert alert-success");
      setMessage("Success");

      setTimeout(() => {
        setMessage("");
        router.push("/");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar
        role="user"
        dark={true}
        isLogin={state.isLogin}
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
            margin: "40px 0",
          }}
        >
          Edit Profile
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
              borderRadius: "50%",
              alignSelf: "center",
            }}
          >
            <img
              src={preview}
              alt=""
              style={{
                borderRadius: "50%",
                width: 200,
                height: 200,
                objectFit: "cover",
              }}
            />
          </div>
          <label
            className="inp inp_e"
            style={{
              width: 300,
              display: "flex",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <input
              type="file"
              onChange={handleChange}
              name="p_image"
              accept="image/png, .jpeg .jpg, image/gif"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            />
            <span
              style={{
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              Add Picture
              <img
                src="/assets/Camera.png"
                alt=""
                style={{
                  transform: "translateY(-2px)",
                  width: 30,
                  marginLeft: 10,
                }}
              />
            </span>
          </label>
          <input
            className="inp"
            type="email"
            name="email"
            required
            value={data.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            className="inp"
            type="text"
            name="fullname"
            required
            value={data.fullname}
            onChange={handleChange}
            placeholder="Fullname"
          />
          <div>
            <div
              className="inp inp_d"
              onClick={() => setSDrop(!sDrop)}
              style={{
                color: "white",
                borderBottom: `${sDrop ? 0 : ""}`,
                borderRadius: `${sDrop ? "5px 5px 0 0" : ""}`,
              }}
            >
              {data.gender}
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
            {sDrop && (
              <div
                style={{
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
                      gender: "Male",
                    });
                  }}
                  style={{
                    borderRadius: 0,
                    borderTop: 0,
                    borderBottom: 0,
                    margin: 0,
                  }}
                >
                  Male
                </div>
                <div //2
                  className="inp inp_d"
                  onClick={() => {
                    setSDrop(!sDrop);
                    setData({
                      ...data,
                      gender: "Female",
                    });
                  }}
                  style={{
                    borderRadius: "0 0 5px 5px",
                    borderTop: 0,
                    borderBottom: "2px solid white",
                    margin: 0,
                  }}
                >
                  Female
                </div>
              </div>
            )}
          </div>
          <input
            className="inp"
            type="number"
            name="phone"
            required
            value={data.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
          <input
            className="inp"
            type="text"
            name="address"
            required
            value={data.address}
            onChange={handleChange}
            placeholder="Address"
          />
          <button
            className="btn send"
            style={{ width: 300, alignSelf: "center" }}
          >
            Edit
          </button>
        </form>
      </main>
    </>
  );
}

export default EditProfile;
