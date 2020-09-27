import React from "react";
import uniqid from "uniqid";
import Buttons from "./Buttons";
import Editor from "./Editor";
import Viewer from "./Viewer";

export default () => {
  const [sections, setSections] = React.useState([]);
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    setSections((prev) => [...prev, newSection()]);
  }, []);

  const newSection = () => ({ id: uniqid(), markdown: "### H1", styles: "" });

  const addSection = () => {
    const maxIndex = sections.length;
    setSections((prev) => [...prev, newSection()]);
    setIndex(() => maxIndex);
  };

  const deleteSection = () => {};

  const copyToClipboard = () => {};

  const onMarkdownChanged = (value) => {
    setSections((prev) =>
      prev.map((section, idx) => {
        return idx !== index ? section : { ...section, markdown: value };
      })
    );
  };

  const onStyleChanged = (value) => {
    console.log("onMarkdownChanged", value);
    setSections((prev) =>
      prev.map((section, idx) => {
        return idx !== index ? section : { ...section, style: value };
      })
    );
  };

  const onSetIndex = (value) => {
    console.log(value);
    setIndex(value);
  };

  const mainStyle = {
    root: {
      buttons: {},
      editor: {},
      viewer: {}
    }
  };

  return (
    <div style={mainStyle.root}>
      <div style={mainStyle.root.buttons}>
        <Buttons addSection={addSection} />
      </div>
      <div style={mainStyle.root.editor}>
        <Editor
          section={sections[index]}
          onMarkdownChanged={onMarkdownChanged}
          onStyleChanged={onStyleChanged}
        />
      </div>
      <div style={mainStyle.root.viewer}>
        <Viewer sections={sections} index={index} setIndex={onSetIndex} />
      </div>
    </div>
  );
};
