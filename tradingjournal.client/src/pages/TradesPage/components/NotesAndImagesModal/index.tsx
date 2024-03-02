import { useEffect, useCallback, useState } from 'react'
import { Grid, Box, ImageList } from "@mui/material"
import Trade from "../../../../models/trade"
import ZoomableImageListItem from './ZoomableImage'
import TextEditor from './TextEditor'
import useDebounce from '../../../../utils/useDebounce'
import ImageInput from './ImageInput'

interface NotesAndImagesModalProps {
  data: Trade
}

interface PreSignedUrlsResponseObject {
  fileName: string
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
    const response = await fetch(`/api/Images/GetReadPreSignedUrls?${params}`)
    const preSignedURLs: PreSignedUrlsResponseObject[] = await response.json()
    return preSignedURLs
  }, [imageKeys])

  const getImageData = useCallback(async (preSignedUrls: PreSignedUrlsResponseObject[]) => {
    const requests = preSignedUrls
      .map(obj => fetch(obj.preSignedUrl, {
        headers: {
          'Content-Type': 'image/png'
        }
      }))

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

  async function updateTradeImageKeys(keys: string[]) {
    try {
      setIsSaving(true)
      await fetch(`/api/Trades/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...data, imageKeys: [...imageKeys, ...keys] })
      })
      setIsSaving(false)
    } catch (error) {
      setIsSaving(false)
      console.log(error)
    }
  }

  async function onImageUpload(files: FileList) {
    const fileMap: Map<string, File> = new Map()
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i)!
      fileMap.set(file.name, file)
    }
    const imageKeys = Array.from(fileMap.keys()).map(name => ['imageKeys', name!])
    const params = new URLSearchParams(imageKeys)
    const response = await fetch(`/api/Images/GetUploadPreSignedUrls?${params}`)
    const preSignedUrls: PreSignedUrlsResponseObject[] = await response.json()

    const putRequests = []
    for (const url of preSignedUrls) {
      const request = fetch(url.preSignedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'image/png'
        },
        body: fileMap.get(url.fileName)
      })
      putRequests.push(request)
    }

    Promise.all(putRequests)
      .then(() => {
        updateTradeImageKeys(Array.from(fileMap.keys()))
      })
      .catch(err => {
        console.log(err)
      }) 
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
        <Grid item>
          <ImageInput onUpload={onImageUpload} />
        </Grid>
      </Grid>
    </Box>
  )
}