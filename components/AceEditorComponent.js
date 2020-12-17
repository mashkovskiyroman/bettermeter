import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";

const AceEditorComponent = ({onChange, value}) => {
  return (
    <AceEditor
      mode="javascript"
      theme="github"
      value={value}
      width={'100%'}
      onChange={onChange}
      name="campaign-code-editor"
      editorProps={{ $blockScrolling: true }}
    />
  )
};

export default AceEditorComponent;
