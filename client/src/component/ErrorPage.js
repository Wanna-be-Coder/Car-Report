import React from "react";
import "./Landing.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div
      className='img'
      style={{
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h2 style={{ color: "gold" }}>
        Sorry The page You are searching for could not be found
      </h2>
      <br />
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <Button
          variant='contained'
          color='default'
          style={{ backgroundColor: "#F4A460" }}
        >
          Back
        </Button>
      </Link>
    </div>
  );
}

export default ErrorPage;
