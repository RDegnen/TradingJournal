import { useState } from 'react'
import { ImageListItem, Modal, Box } from '@mui/material'

interface ZoomableImageListItemProps {
  src: string
}

export default function ZoomableImageListItem(props: ZoomableImageListItemProps) {
  const { src } = props
  const [isZoomed, setIsZoomed] = useState(false)

  function handleClick() {
    setIsZoomed(!isZoomed)
  }

  return (
    <>
      <ImageListItem>
        <img
          src={src}
          onClick={handleClick}
        />
      </ImageListItem>
      <Modal open={isZoomed} onClose={handleClick}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 1400,
            height: 700,
            bgcolor: 'background.paper',
            boxShadow: 24,
          }}
        >
          <img src={src} style={{ height: '100%', width: '100%' }} />
        </Box>
      </Modal>
    </>
  )
}