import React, { useState } from 'react'
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css'

const TextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
  }

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
    />
  )
}

export default TextEditor