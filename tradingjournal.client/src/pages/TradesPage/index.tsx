import { useState, useEffect } from 'react'
import { Modal, Button } from '@mui/material'
import DataGrid from './components/DataGrid'
import Trade, { defaultTrade } from '../../models/trade'
import NotesAndImagesModal from './components/NotesAndImagesModal'
import NewTradesModal from './components/NewTradeModal'

export default function TradesPage() {
  const [notesImagesModalOpen, setNotesImagesModalOpen] = useState(false)
  const [notesImagesModalData, setNotesImagesModalData] = useState<Trade>(defaultTrade)
  const [newTradeModalOpen, setNewTradeModalOpen] = useState(false)
  const [trades, setTrades] = useState<Trade[]>([])

  async function getTrades() {
    const response = await fetch('/api/Trades');
    const data = await response.json();
    setTrades(data);
  }

  useEffect(() => {
    getTrades();
  }, []);

  function notesImagesColumnClickCallback(data: Trade) {
    setNotesImagesModalOpen(true)
    setNotesImagesModalData(data)
  }

  function handleNotesImagesClose() {
    setNotesImagesModalOpen(false)
    setNotesImagesModalData(defaultTrade)
  }

  return (
    <>
      <Button onClick={() => setNewTradeModalOpen(true)}>Add Trade</Button>
      <DataGrid
        notesImagesColumnClickCallback={notesImagesColumnClickCallback}
        trades={trades}
      />
      <Modal
        open={notesImagesModalOpen}
        onClose={handleNotesImagesClose}
      >
        <NotesAndImagesModal data={notesImagesModalData} />
      </Modal>
      <Modal
        open={newTradeModalOpen}
        onClose={() => setNewTradeModalOpen(false)}
      >
        <NewTradesModal onSubmitCallback={getTrades} />
      </Modal>
    </>
  )
}