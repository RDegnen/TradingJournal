import { useEffect, useCallback, useState } from 'react'
import { Grid, Box, ImageList } from "@mui/material"
import Trade, { defaultTrade } from "../../../../models/trade"
import ZoomableImageListItem from './ZoomableImage'
import TextEditor from './TextEditor'
import useDebounce from '../../../../utils/useDebounce'
import ImageInput from './ImageInput'
import useTrade from '../../context/useTrade'
import { updateTrade } from '../../actions'

interface NotesAndImagesModalProps {
  data: Trade
}

interface PreSignedUrlsResponseObject {
  fileName: string
  preSignedUrl: string
}

const getCurrentTrade = (trades: Trade[], id: number) =>
  trades.find(trade => trade.id === id)

export default function NotesAndImagesModal(props: NotesAndImagesModalProps) {
  const { data } = props
  const [{ trades }, dispatch] = useTrade()!
  // data does not seem to update when a trade does so this is necessary
  const currentTrade = getCurrentTrade(trades, data.id!) || defaultTrade
  const [imageKeys, setImageKeys] = useState<string[]>(data.imageKeys)
  const [images, setImages] = useState<string[]>([])
  const [notes, setNotes] = useState<string>(data.notes || '')
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  
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

  const debouncedOnTradeUpdate = useDebounce(async (notes: string) => {
    setIsSaving(true)
    await updateTrade({ ...currentTrade, notes }, dispatch)
    setIsSaving(false)
  })

  function onNotesUpdate(notes: string) {
    setNotes(notes)
    debouncedOnTradeUpdate(notes)
  }

  async function uploadImage(
    url: PreSignedUrlsResponseObject,
    fileMap: Map<string, File>
  ) {
    await fetch(url.preSignedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'image/png'
      },
      body: fileMap.get(url.fileName)
    })
  }

  async function onImageUpload(files: FileList) {
    const successfulUploads: string[] = []
    try {
      setIsUploading(true)
      const fileMap: Map<string, File> = new Map()
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i)!
        fileMap.set(file.name, file)
      }
      const newKeys = Array.from(fileMap.keys()).map(name => ['imageKeys', name!])
      const params = new URLSearchParams(newKeys)
      const response = await fetch(`/api/Images/GetUploadPreSignedUrls?${params}`)
      const preSignedUrls: PreSignedUrlsResponseObject[] = await response.json()

      for (const url of preSignedUrls) {
        await uploadImage(url, fileMap)
        successfulUploads.push(url.fileName)
      }
    } catch (error) {
      console.log(error)
    } finally {
      await updateTrade({
        ...currentTrade,
        imageKeys: [...imageKeys, ...successfulUploads]
      }, dispatch)
      setImageKeys(keys => [...keys, ...successfulUploads])
      setIsUploading(false)
    }
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
        <Grid item>
          {isUploading && "Uploading images..." }
        </Grid>
      </Grid>
    </Box>
  )
}