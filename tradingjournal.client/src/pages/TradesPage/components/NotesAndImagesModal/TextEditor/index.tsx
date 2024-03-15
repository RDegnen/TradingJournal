import { EditorProvider, EditorEvents } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './MenuBar'
import BubbleMenu from './BubbleMenu'

interface TextEditorProps {
  content: string
  onNotesUpdate: (notes: string) => void
}

export default function TextEditor(props: TextEditorProps) {
  const { content, onNotesUpdate } = props
  const extensions = [
    StarterKit
  ]

  function onUpdate(event: EditorEvents['update']) {
    onNotesUpdate(event.editor.getHTML())
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