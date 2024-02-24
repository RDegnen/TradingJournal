import { useEffect, useCallback, useState } from 'react'
import { Grid, Box, ImageList } from "@mui/material"
import Trade from "../../../../models/trade"
import ZoomableImageListItem from './ZoomableImage'
import TextEditor from './TextEditor'

interface NotesAndImagesModalProps {
  data: Trade
}

interface PreSignedUrlsResponseObject {
  preSignedUrl: string
}

export default function NotesAndImagesModal(props: NotesAndImagesModalProps) {
  const { notes, imageKeys } = props.data
  const [images, setImages] = useState<string[]>([])

  const getPreSignedUrls = useCallback(async () => {
    const queries = imageKeys.map(key => ['imageKeys', key])
    const params = new URLSearchParams(queries)
    const response = await fetch('/api/Images/GetReadPreSignedUrls?' + params)
    const preSignedURLs: PreSignedUrlsResponseObject[] = await response.json()
    return preSignedURLs
  }, [imageKeys])

  const getImageData = useCallback(async (preSignedUrls: PreSignedUrlsResponseObject[]) => {
    const requests = preSignedUrls
      .map(obj => fetch(obj.preSignedUrl))

    const responses = await Promise.all(requests)
    const blobResults = responses.map(res => res.blob())
    const blobs = await Promise.all(blobResults)
    const data = blobs.map(blob => URL.createObjectURL(blob))
    setImages(data)
  }, [])

  useEffect(() => {
    getPreSignedUrls().then(preSignedUrls => {
      getImageData(preSignedUrls)
    })
  }, [getPreSignedUrls, getImageData])

  return (
    <Box sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 1000,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextEditor content={notes} />
        </Grid>
        <Grid item xs={6}>
          <ImageList cols={3}>
            {images.map(url => {
              return (
                <ZoomableImageListItem key={url} src={url} />
              )
            })}
          </ImageList>
        </Grid>
      </Grid>
    </Box>
  )
}