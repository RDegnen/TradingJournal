import { useState } from 'react'
import { Button, Input } from "@mui/material"

interface ImageInputProps {
  onUpload: (files: FileList) => void
}

export default function ImageInput(props: ImageInputProps) {
  const { onUpload } = props
  const [imageUploads, setImageUploads] = useState<FileList | null>(null)

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    setImageUploads(event.target.files!)
  }

  function onUploadClick() {
    onUpload(imageUploads!)
  }

  return (
    <>
      <Input
        type="file"
        onChange={handleFileChange}
        inputProps={{ accept: 'image/png', multiple: true }}
      />
      {imageUploads?.length && (
        <Button onClick={onUploadClick}>Upload</Button>
      )}
    </>
  )
}