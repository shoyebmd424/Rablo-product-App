import React from "react";
import Layout from "../Components/Layout";

const Home = () => {
  return (
    <Layout>
      <div className=" m-auto d-flex flex-column" style={{ minHeight: "90vh" }}>
        <h1>Welcome to Reblo</h1>
        <h3>Buy Rablo products</h3>
      </div>
    </Layout>
  );
};

export default Home;
