import React, { useEffect, useState } from "react";
import Payment from "./Payment";
import axios from "./axios";

const App = () => {
  const [subDetails, setSubDetails] = useState({});
  useEffect(() => {
    const getSubDetails = async () => {
      const response = await axios.get(`/api/get/sub_H7785EogVxdlxr`);
      const { data } = await response;
      setSubDetails(data);
    };
    getSubDetails();
  }, []);
  const cancelSubs = async () => {
    const response = await axios.get(`/api/cancel/sub_H7785EogVxdlxr`);
    const { data } = await response;
    console.log(data);
  };
  console.log(subDetails);
  // if (subDetails?.ended_at > Math.round(new Date().getTime() / 1000)) {
  //   console.log("hy");
  // }
  return (
    <div>
      <h1>Hello World</h1>
      <Payment planId="plan_H74t3pw28h08h3" />
      {subDetails?.status === "active" && (
        <button onClick={cancelSubs}>Cancel Subscription</button>
      )}
      {subDetails?.current_end < subDetails?.end_at && (
        <h1>
          Next Billing On:{" "}
          {new Date(subDetails?.current_end * 1000).toDateString()}
        </h1>
      )}
      <h1>
        Subscription Till: {new Date(subDetails?.end_at * 1000).toDateString()}
      </h1>
      <a href={subDetails?.short_url} target="_blank" rel="noreferrer">
        Alternate Link to Pay
      </a>
    </div>
  );
};

export default App;
