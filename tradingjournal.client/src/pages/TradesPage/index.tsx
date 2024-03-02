import { useState, useEffect } from 'react'
import { Modal, Button } from '@mui/material'
import DataGrid from './components/DataGrid'
import Trade, { defaultTrade } from '../../models/trade'
import NotesAndImagesModal from './components/NotesAndImagesModal'
import NewTradesModal from './components/NewTradeModal'
import TradeProvider from './context/TradeProvider'
import useTrade from './context/useTrade'
import { getTrades } from './actions'

function TradesPage() {
  const [, dispatch] = useTrade()!
  const [notesImagesModalOpen, setNotesImagesModalOpen] = useState(false)
  const [notesImagesModalData, setNotesImagesModalData] = useState<Trade>(defaultTrade)
  const [newTradeModalOpen, setNewTradeModalOpen] = useState(false)

  useEffect(() => {
    getTrades(dispatch);
  }, [dispatch]);

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
        <NewTradesModal />
      </Modal>
    </>
  )
}

export default function ProviderWrapper() {
  return (
    <TradeProvider>
      <TradesPage />
    </TradeProvider>
  )
}