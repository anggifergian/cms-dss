import React from 'react'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextEditor = ({ editorState, onEditorStateChange }) => {

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      editorStyle={{
        border: '1px solid #f0f0f0',
        paddingRight: 16,
        paddingLeft: 16
      }}
      wrapperStyle={{
        marginBottom: 10
      }}
    />
  )
}

export default TextEditor