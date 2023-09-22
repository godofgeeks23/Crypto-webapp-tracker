import React from "react";
import Banner from "../components/Banner/Banner";
import CoinsTable from "../components/CoinsTable";
import Metamask from "../components/Metamask";

const Homepage = () => {
  return (
    <>
      <Banner />
      <CoinsTable />
      <Metamask />
    </>
  );
};

export default Homepage;
