import { BubbleMenu as BubbleMenuBase, useCurrentEditor } from '@tiptap/react'
import { Button as BaseButton, Box } from '@mui/material'
import { styled } from '@mui/system'

const Button = styled(BaseButton)`
  color: black;
`

export default function BubbleMenu() {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <BubbleMenuBase>
      <Box
        sx={{
          bgcolor: 'background.paper',
          border: '2px solid #000',
        }}
      >
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          h1
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
          h2
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        >
          h3
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
        >
          h4
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
        >
          h5
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
        >
          h6
        </Button>
      </Box>
    </BubbleMenuBase>
  )
}