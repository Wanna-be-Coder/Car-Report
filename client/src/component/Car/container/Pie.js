import React, { useState } from "react";
import ReactSvgPieChart from "react-svg-piechart";
import AlertBox from "../dummy/AlertBox";

function Pie({ data }) {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
    color: "",
  });

  const { vertical, horizontal, open, message, color } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleChange = (d) => {
    setState({ ...state, message: d.title, color: d.color, open: true });
  };

  return (
    <div style={{ width: "300px" }}>
      <ReactSvgPieChart
        data={data}
        expandOnHover
        onSectorHover={(d, i, e) => {
          if (d) {
            // console.log("Mouse enter - Index:", i, "Data:", d, "Event:", e);
            handleChange(d);
          } else {
            // console.log("Mouse leave - Index:", i, "Event:", e);
            handleClose();
          }
        }}
      />
      <AlertBox
        data={{
          vertical,
          horizontal,
          open,
          message,
          color,
          handleClose,
        }}
      />
      ;
    </div>
  );
}

export default Pie;
