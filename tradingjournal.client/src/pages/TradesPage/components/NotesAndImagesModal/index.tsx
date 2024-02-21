import { useEffect, useCallback, useState } from 'react'
import { Grid, Box } from "@mui/material";
import Trade from "../../../../models/trade";

interface NotesAndImagesModalProps {
  data: Trade
}

interface PreSignedUrlsResponseObject {
  preSignedUrl: string
}

export default function NotesAndImagesModal(props: NotesAndImagesModalProps) {
  const { notes, imageLocations } = props.data
  const [images, setImages] = useState<string[]>([])

  /**
   * How loading presigned urls could work
   * - This modal gets opened
   * - It takes all the image keys can gets the presigned urls from the backend
   * - With those urls it fetches the images
   * - WITHOUT CACHING it renders each image
   * - WITH CACHING it updates a trade with the images and then renders them here
   * so that every time a modal is closed and reopened it does not have to refetch the
   * images. Or maybe there can be an image cache that only holds those and the trade
   * id...
   */

  const getPreSignedUrls = useCallback(async () => {
    const queries = imageLocations.map(key => ['imageKeys', key])
    const params = new URLSearchParams(queries)
    const response = await fetch('/api/Images/GetReadPreSignedUrls?' + params)
    const preSignedURLs: PreSignedUrlsResponseObject[] = await response.json()
    return preSignedURLs
  }, [imageLocations])

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
      width: 800,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {notes}
        </Grid>
        <Grid item container spacing={2} xs={6} rowSpacing={1}>
          {images.map(url => {
            return (
              <Grid item xs={4} sx={{ width: 100, height: 80 }} key={url}>
                <img src={url} style={{ width: '100%', height: '100%' }} />
              </Grid>
            )
          })}
        </Grid>
      </Grid>
    </Box>
  )
}