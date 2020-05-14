import React from "react";
import app from "../services/Fire";

const Home = () => {
  return (
    <>
      <h1>{app.auth().currentUser.displayName}</h1>
      <button onClick={() => app.auth().signOut()}>Sign out</button>
    </>
  );
};

export default Home;