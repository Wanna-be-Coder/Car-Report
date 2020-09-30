import React from "react";
import "./Landing.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div
      className='img'
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link to={"/car"} style={{ textDecoration: "none" }}>
        <Button
          variant='contained'
          color='default'
          style={{ backgroundColor: "#F4A460" }}
        >
          Get Started
        </Button>
      </Link>
    </div>
  );
}

export default LandingPage;
