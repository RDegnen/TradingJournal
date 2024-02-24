import { useCurrentEditor } from '@tiptap/react'
import { styled } from '@mui/system'
import { Button as BaseButton } from '@mui/material'
import {
  FormatBold,
  FormatItalic,
  StrikethroughS,
  FormatListBulleted,
  FormatListNumbered,
  Undo,
  Redo
} from '@mui/icons-material'

const Button = styled(BaseButton)`
  color: black;
`

export default function MenuBar() {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <>
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <FormatBold />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <FormatItalic />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        <StrikethroughS />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        <FormatListBulleted />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        <FormatListNumbered />
      </Button>
      <Button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
      >
        <Undo />
      </Button>
      <Button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
      >
        <Redo />
      </Button>
    </>
  )
}