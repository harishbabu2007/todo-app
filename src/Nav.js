import React from "react";

function Nav({ text }) {
  return (
    <div
      style={{
        top: "0",
        left: "0",
        backgroundColor: "coral",
        color: "#fff",
        width: "100%",
        lineHeight: "80px",
        marginBottom: "20px",
      }}
    >
      <h1>{text}</h1>
    </div>
  );
}

export default Nav;
