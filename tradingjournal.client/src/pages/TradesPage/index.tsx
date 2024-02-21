import { useState } from 'react'
import { Modal } from '@mui/material'
import DataGrid from './components/DataGrid'
import Trade, { defaultTrade } from '../../models/trade'
import NotesAndImagesModal from './components/NotesAndImagesModal'

export default function TradesPage() {
  const [notesImagesModalOpen, setNotesImagesModalOpen] = useState(false)
  const [notesImagesModalData, setNotesImagesModalData] = useState<Trade>(defaultTrade)

  function notesImagesColumnClickCallback(data: Trade) {
    console.log(data)
    setNotesImagesModalOpen(true)
    setNotesImagesModalData(data)
  }

  function handleNotesImagesClose() {
    setNotesImagesModalOpen(false)
    setNotesImagesModalData(defaultTrade)
  }

  return (
    <>
      <DataGrid notesImagesColumnClickCallback={notesImagesColumnClickCallback} />
      <Modal
        open={notesImagesModalOpen}
        onClose={handleNotesImagesClose}
      >
        <NotesAndImagesModal data={notesImagesModalData} />
      </Modal>
    </>
  )
}