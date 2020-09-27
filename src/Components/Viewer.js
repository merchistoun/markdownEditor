import React from "react";
import Up from "@material-ui/icons/ArrowUpward";
import Down from "@material-ui/icons/ArrowDownward";
import Fab from "@material-ui/core/Fab";
import ReactMarkdown from "react-markdown";

const style = {
  root: {
    position: "relative",
    textAlign: "left"
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    position: "absolute",
    top: "0.5em",
    right: "1rem",
    button: {
      marginLeft: "0.5rem"
    }
  },
  section: {
    position: "relative",
    padding: "0 1rem",
    minHeight: "1rem",
    background: "#f8f8f8",
    borderRadius: "0.25rem",
    margin: "0.5rem",
    border: "2px solid transparent"
  }
};

const getStyle = (isActive) => {
  return !isActive
    ? style.section
    : {
        ...style.section,
        border: "2px solid #0000C0"
      };
};

export default (props) => {
  const { sections, index, setIndex } = props;
  const selectedId = sections && sections[index] && sections[index].id;

  return (
    <div style={style.root}>
      {sections?.length &&
        sections.map((section, idx) => {
          return (
            <>
              <div
                key={section.id}
                style={getStyle(section.id === selectedId)}
                onClick={() => setIndex(idx)}
              >
                <ReactMarkdown source={section.markdown} />

                <div style={style.buttons}>
                  <Fab
                    size="small"
                    color="primary"
                    aria-label="add"
                    style={style.buttons.button}
                    disabled={idx === 0}
                  >
                    <Up />
                  </Fab>
                  <Fab
                    size="small"
                    color="primary"
                    aria-label="add"
                    style={style.buttons.button}
                  >
                    <Down />
                  </Fab>
                </div>
              </div>
            </>
          );
        })}
    </div>
  );
};
