import React, { useContext, useEffect, useState } from "react";
import "../css/pages/Payment.css";
import Navbar from "../components/pages/Navbar";
import { UserContext } from "../components/auth/UserContext";
import { API } from "../Config/API";
import { useHistory } from "react-router-dom";

function Payment() {
  const router = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const [status, setStatus] = useState();
  const [message, setMessage] = useState();
  const [alerts, setAlerts] = useState("");

  const [remain, setRemain] = useState(0);
  const [drop, setDrop] = useState();
  const [data, setData] = useState({
    accountNumber: "",
    attache: null,
  });

  useEffect(() => {
    if (state.user.transaction[0]) {
      var days = 0;
      var difference = 0;

      const date = new Date(state.user.transaction[0].dueDate);

      const today = new Date();

      difference = date - today;

      days = Math.round(difference / (1000 * 60 * 60 * 24));

      setStatus(state.user.transaction[0].status);
      setRemain(days);
    }
  }, [state.user]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  useEffect(() => {
    if (data.attache) {
      setMessage("");
    }
  }, [data]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!data.attache) {
        console.log("attache");
        setAlerts("alert alert-danger");
        return setMessage("Slip should have'nt empty");
      }

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("accountNumber", data.accountNumber);
      formData.set("attache", data.attache[0], data.attache[0].name);

      const response = await API.post("/payment", formData, config);
      console.log(response);

      setStatus("pending");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAgain = async (e) => {
    try {
      const response = await API.delete("/delete-payment");
      console.log(response);
      setStatus("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <>
        <div>
          <Navbar
            payment={true}
            isLogin={state.isLogin}
            drop={drop}
            setDrop={setDrop}
          />
          <main
            onClick={() => setDrop(drop ? !drop : drop)}
            style={{
              background: "#161616",
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              color: "white",
            }}
          >
            <div
              style={{
                fontSize: 36,
                fontWeight: 800,
                marginBottom: 50,
              }}
            >
              Premium
            </div>
            <div>
              <span
                className="p_txt"
                style={{
                  margin: "10px 0",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                Bayar sekarang dan nikmati streaming music yang kekinian dari
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#ee4622",
                    marginLeft: "5px",
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
              </span>
            </div>
            {remain == 0 ? (
              <>
                {status == "pending" && (
                  <>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img src="/assets/Pending.png" style={{ width: 128 }} />
                      <div
                        align="center"
                        style={{
                          fontWeight: 700,
                        }}
                      >
                        Please{" "}
                        <a
                          style={{
                            fontSize: 20,
                            fontWeight: 900,
                            color: "#ee4622",
                          }}
                        >
                          wait
                        </a>{" "}
                        our system is verifying
                      </div>
                    </div>
                  </>
                )}

                {status == "rejected" && (
                  <>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img src="/assets/Rejected.png" style={{ width: 128 }} />
                      <div
                        align="center"
                        style={{
                          fontWeight: 700,
                        }}
                      >
                        We are so{" "}
                        <a
                          style={{
                            fontSize: 20,
                            fontWeight: 900,
                            color: "#ee4622",
                          }}
                        >
                          sorry
                        </a>{" "}
                        your payment rejected
                      </div>
                      <button
                        onClick={handleAgain}
                        className="btn send"
                        style={{ width: 200 }}
                      >
                        Again
                      </button>
                    </div>
                  </>
                )}

                {!status && (
                  <>
                    <div style={{ margin: "10px 0" }}>
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
                      <span
                        style={{
                          fontSize: 18,
                          fontWeight: 600,
                        }}
                      >
                        {" "}
                        : {"0981312323"}
                      </span>
                    </div>

                    <form
                      onSubmit={handleSubmit}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        //   background: "red",
                        width: 350,
                      }}
                    >
                      {message && (
                        <div class={alerts} role="alert">
                          {message}
                        </div>
                      )}
                      <input
                        type="number"
                        required
                        className="inp"
                        name="accountNumber"
                        value={data.accountNumber}
                        onChange={handleChange}
                        placeholder="Input your account number"
                      />
                      <label
                        className="inp inp_e"
                        style={{
                          background: `${data.attache && "#eee"}`,
                        }}
                      >
                        <input
                          type="file"
                          onChange={handleChange}
                          name="attache"
                          accept="image/png, .jpeg, .jpg, image/gif"
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        />
                        <span
                          style={{
                            fontSize: "18px",
                            fontWeight: 800,
                          }}
                        >
                          Attach proof of transfer
                          <img
                            alt=""
                            src="/assets/addfile.png"
                            style={{
                              transform: "translateY(-2px)",
                              width: 30,
                              position: "",
                              marginLeft: 80,
                            }}
                          />
                        </span>
                      </label>
                      <button type="submit" className="btn send">
                        Send
                      </button>
                    </form>
                  </>
                )}
              </>
            ) : (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src="/assets/Success.png" style={{ width: 128 }} />
                <div
                  align="center"
                  style={{
                    fontWeight: 700,
                  }}
                >
                  Activated :{" "}
                  <a
                    style={{ fontSize: 20, fontWeight: 900, color: "#ee4622" }}
                  >
                    {remain}
                  </a>{" "}
                  Days remaining
                </div>
              </div>
            )}
          </main>
        </div>
      </>
    </>
  );
}

export default Payment;
