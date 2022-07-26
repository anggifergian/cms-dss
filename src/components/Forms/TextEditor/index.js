import React from 'react'
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import htmlToDraft from 'html-to-draftjs';

const TextEditor = ({ initialContent, editorState, onEditorStateChange }) => {

  return (
    <Editor
      initialContentState={htmlToDraft(initialContent)}
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