import { useEffect, useCallback, useState } from 'react'
import { Grid, Box, ImageList } from "@mui/material"
import Trade from "../../../../models/trade"
import ZoomableImageListItem from './ZoomableImage'
import TextEditor from './TextEditor'
import useDebounce from '../../../../utils/useDebounce'

interface NotesAndImagesModalProps {
  data: Trade
}

interface PreSignedUrlsResponseObject {
  preSignedUrl: string
}

export default function NotesAndImagesModal(props: NotesAndImagesModalProps) {
  const { data } = props
  const { imageKeys } = data
  const [images, setImages] = useState<string[]>([])
  const [notes, setNotes] = useState<string>(data.notes || '')
  const [isSaving, setIsSaving] = useState<boolean>(false)

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

  async function updateTradeNotes(notes: string) {
    try {
      console.log('running PUT')
      setIsSaving(true)
      await fetch(`/api/Trades/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...data, notes })
      })
      setIsSaving(false)
    } catch (error) {
      setIsSaving(false)
      console.log(error)
    }
  }

  const debouncedUpdateTradeNotes = useDebounce(updateTradeNotes)

  function onNotesUpdate(notes: string) {
    setNotes(notes)
    debouncedUpdateTradeNotes(notes)
  }


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
          <TextEditor content={notes} onNotesUpdate={onNotesUpdate} />
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
        <Grid item>
          {isSaving && "Saving notes..." }
        </Grid>
      </Grid>
    </Box>
  )
}