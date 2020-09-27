import React from "react";
import Button from "@material-ui/core/Button";

const style = {
  root: {
    display: "flex",
    justifyContent: "center",
    button: {
      margin: "1rem 1rem"
    }
  }
};

export default (props) => {
  const { addSection, deleteSection, copyToClipboard } = props;

  return (
    <div style={style.root}>
      <Button
        style={style.root.button}
        variant="contained"
        color="primary"
        onClick={addSection}
      >
        Add Section
      </Button>
      <Button
        style={style.root.button}
        variant="contained"
        color="primary"
        onClick={deleteSection}
      >
        Delete Section
      </Button>
      <Button
        style={style.root.button}
        variant="contained"
        color="primary"
        onClick={copyToClipboard}
      >
        Copy To Clipboard
      </Button>
    </div>
  );
};
