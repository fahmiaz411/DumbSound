import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import Image from "./Image";

function Transact({ data, index }) {
  const [statusPayment, setStatusPayment] = useState();
  const [aprove, setAprove] = useState();
  const [show, setShow] = useState();
  const [remaining, setRemaining] = useState();

  console.log(data);
  useEffect(() => {
    if (data.status == "aproved") {
      setStatusPayment("aproved");
    } else if (data.status == "rejected") {
      setStatusPayment("rejected");
    } else if (data.status == "pending") {
      setStatusPayment("pending");
    }

    var days = 0;
    var difference = 0;

    const start = new Date(data.startDate);

    const due = new Date(data.dueDate);

    const today = new Date();

    if (data.dueDate === data.startDate) {
      // same
      difference = due - start;
    } else {
      // not same
      difference = due - today;
    }

    days = Math.round(difference / (1000 * 60 * 60 * 24));

    setRemaining(days);
  }, []);

  const showAprove = () => {
    setAprove(!aprove);
  };

  const handleShowImage = () => {
    setShow(true);
  };

  const handleCloseImage = () => {
    setShow(false);
  };
  return (
    <>
      {data && (
        <>
          <div
            onClick={() => setAprove(aprove ? !aprove : aprove)}
            className="t_table"
            style={{
              width: "100%",
              background: `${index % 2 == 1 ? "#2B2B2B" : "#3A3A3A"}`,
              display: "flex",
              justifyContent: "center",
              borderBottom: "2px solid white",
              padding: "20px 0",
            }}
          >
            <span style={{ width: "8%", background: "", textAlign: "center" }}>
              {index + 1}
            </span>
            <span style={{ width: "20%", background: "", textAlign: "center" }}>
              {data.user.fullname}
            </span>
            <span
              onClick={handleShowImage}
              style={{
                cursor: "pointer",
                width: "15%",
                background: "",
                textAlign: "center",
              }}
            >
              {data.attache.length > 13
                ? `${data.attache.substring(14, 20)}..${data.attache.substring(
                    data.attache.length - 4,
                    data.attache.length
                  )}`
                : data.attache}
            </span>
            <span style={{ width: "15%", background: "", textAlign: "center" }}>
              {remaining} / Hari
            </span>

            {/* user status */}
            {data.user.active == "yes" ? (
              <span
                style={{
                  width: "12%",
                  background: "",
                  textAlign: "center",
                  color: "#0ACF83",
                }}
              >
                Active
              </span>
            ) : (
              <span
                style={{
                  width: "12%",
                  background: "",
                  textAlign: "center",
                  color: "#FF0742",
                }}
              >
                Not Active
              </span>
            )}
            {/*  */}

            {/* payment status */}
            {statusPayment == "aproved" && (
              <span
                style={{
                  width: "15%",
                  background: "",
                  textAlign: "center",
                  color: "#0ACF83",
                  fontWeight: 500,
                }}
              >
                Approved
              </span>
            )}
            {statusPayment == "rejected" && (
              <span
                style={{
                  width: "15%",
                  background: "",
                  textAlign: "center",
                  color: "#FF0742",
                  fontWeight: 500,
                }}
              >
                Rejected
              </span>
            )}
            {statusPayment == "pending" && (
              <span
                style={{
                  width: "15%",
                  background: "",
                  textAlign: "center",
                  color: "#F7941E",
                  fontWeight: 500,
                }}
              >
                Pending
              </span>
            )}
            {/*  */}
            <span
              style={{
                width: "15%",
                background: "",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></span>
          </div>
          <div //triangle
            className="t_tri"
            onClick={showAprove}
            style={{
              position: "absolute",
              cursor: "pointer",
              width: 10,
              height: 10,
              borderStyle: "solid",
              borderColor: "transparent transparent #1C9CD2 transparent",
            }}
          />
          <div
            className="t_box"
            style={{
              transform: "translateY(-35px)",
              zIndex: 2,
              position: "absolute",
              marginTop: "15px",

              color: "white",
            }}
          >
            <div style={{ display: `${aprove ? "block" : "none"}` }}>
              <Dropdown
                id={data.id}
                setRemaining={setRemaining}
                show={aprove}
                setShow={setAprove}
                action={setStatusPayment}
                payment={false}
                role="aprove"
              />
            </div>
          </div>
          <Image
            data={data.attache}
            show={show}
            handleClose={handleCloseImage}
          />
        </>
      )}
    </>
  );
}

export default Transact;
