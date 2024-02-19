import { useState, useEffect, useRef } from 'react'
import { AgGridReact, } from 'ag-grid-react'
import Trade from '../../../../models/trade'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.min.css'
import { columnDefinitions } from './columnDefinitions'

export default function DataGrid() {
  const gridRef = useRef<AgGridReact<Trade>>(null)
  const [trades, setTrades] = useState<Trade[]>();
 
  async function populateTradeData() {
    const response = await fetch('/api/Trades');
    const data = await response.json();
    setTrades(data);
  }

  useEffect(() => {
    populateTradeData();
  }, []);

  function onNoteImageColumnClickCallback(data: Trade) {
    console.log(data)
  }

  return (
    <div className="ag-theme-material" style={{ height: '100vh', width: '100%' }}>
      <AgGridReact
        ref={gridRef}
        rowData={trades}
        columnDefs={columnDefinitions(onNoteImageColumnClickCallback)}
        reactiveCustomComponents
      />
    </div>
  )
}