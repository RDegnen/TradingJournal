import { EditorProvider, EditorEvents } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './MenuBar'
import BubbleMenu from './BubbleMenu'

interface TextEditorProps {
  content: string
}

export default function TextEditor(props: TextEditorProps) {
  const { content } = props
  const extensions = [
    StarterKit
  ]

  function onUpdate(event: EditorEvents['update']) {
    console.log(event.editor)
  }

  return (
    <>
      <EditorProvider
        extensions={extensions}
        content={content}
        slotBefore={<MenuBar />}
        onUpdate={onUpdate}
      >
        <BubbleMenu />
      </EditorProvider>
    </>
  )
}