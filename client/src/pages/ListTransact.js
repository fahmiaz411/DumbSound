import React, { useEffect, useState } from "react";
import Navbar from "../components/pages/Navbar";
import Transact from "../components/pages/Transact";
import { API } from "../Config/API";

function ListTransact() {
  const [isLogin, setIsLogin] = useState(true);
  const [drop, setDrop] = useState();
  const [load, setLoad] = useState(false);

  const [data, setData] = useState([]);

  const getTransactions = async () => {
    try {
      const response = await API.get("/transaction");
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      setData(data.reverse());
      setLoad(true);
    }
  }, [data]);

  console.log(data);

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <>
      <div>
        <Navbar
          role="admin"
          dark={true}
          isLogin={isLogin}
          drop={drop}
          setDrop={setDrop}
        />
      </div>
      <main
        onClick={() => {
          setDrop(drop ? !drop : drop);
        }}
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
          Incoming Transaction
        </div>
        <div>
          <div
            className="t_table"
            style={{
              width: "100%",
              display: "flex",
              background: "#2B2B2B",
              justifyContent: "center",
              borderBottom: "2px solid white",
              padding: "20px 0",
              color: "#EE4622",
            }}
          >
            <span style={{ width: "8%", background: "", textAlign: "center" }}>
              No
            </span>
            <span style={{ width: "20%", background: "", textAlign: "center" }}>
              User
            </span>
            <span style={{ width: "15%", background: "", textAlign: "center" }}>
              Bukti Transfer
            </span>
            <span style={{ width: "15%", background: "", textAlign: "center" }}>
              Remaining Active
            </span>
            <span style={{ width: "12%", background: "", textAlign: "center" }}>
              Status User
            </span>
            <span style={{ width: "15%", background: "", textAlign: "center" }}>
              Status Payment
            </span>
            <span style={{ width: "15%", background: "", textAlign: "center" }}>
              Action
            </span>
          </div>
          {load && (
            <div>
              {data.map((d, i) => (
                <Transact data={d} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default ListTransact;
