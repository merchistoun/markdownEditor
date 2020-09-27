import React from "react";
import TextField from "@material-ui/core/TextField";

const style = {
  root: {
    display: "flex",
    justifyContent: "space-between",
    textField: {
      width: "50%",
      margin: "0.5rem"
    }
  }
};

export default (props) => {
  const { section, onMarkdownChanged, onStyleChanged } = props;

  return (
    <div style={style.root}>
      <TextField
        id="outlined-multiline-static"
        label="Markdown"
        multiline
        rows="15"
        variant="outlined"
        style={style.root.textField}
        value={section?.markdown}
        onChange={(e) => onMarkdownChanged(e.target.value)}
      />
      <TextField
        id="outlined-multiline-static"
        label="Styles"
        multiline
        rows="15"
        variant="outlined"
        style={style.root.textField}
        value={section?.style}
        onChange={(e) => onStyleChanged(e.target.value)}
      />
    </div>
  );
};
