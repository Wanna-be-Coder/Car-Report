import React from "react";
import { Snackbar } from "@material-ui/core";

function AlertBox({
  data: { vertical, horizontal, open, message, color, handleClose },
}) {
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      message={message}
      key={vertical + horizontal}
    />
  );
}

export default AlertBox;
