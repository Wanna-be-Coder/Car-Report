import React, { useState } from "react";
import ReactSvgPieChart from "react-svg-piechart";
import AlertBox from "../dummy/AlertBox";
import { List, ListItem } from "@material-ui/core";

function Pie({ data }) {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
    color: "",
  });

  const flexContainer = {
    display: "flex",
    padding: 0,
  };

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
      <List style={flexContainer}>
        {data.map((data, index) => (
          <>
            {index % 2 === 0 ? (
              <ListItem primaryText='foo1' secondaryText='bar1'>
                <span
                  style={{
                    height: "15px",
                    width: "15px",
                    backgroundColor: data.color,
                    borderRadius: "50%",
                  }}
                ></span>
                {data.title}
              </ListItem>
            ) : (
              <ListItem primaryText='foo2' secondaryText='bar2'>
                <span
                  style={{
                    height: "15px",
                    width: "15px",
                    backgroundColor: data.color,
                    borderRadius: "50%",
                  }}
                ></span>
                {data.title}
              </ListItem>
            )}
          </>
        ))}
      </List>
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
    </div>
  );
}

export default Pie;
