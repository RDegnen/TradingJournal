import { useState, useEffect, useRef } from 'react'
import { AgGridReact, } from 'ag-grid-react'
import Trade from '../../../../models/trade'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.min.css'
import { columnDefinitions } from './columnDefinitions'

interface DataGridProps {
  notesImagesColumnClickCallback: (data: Trade) => void
}

export default function DataGrid(props: DataGridProps) {
  const { notesImagesColumnClickCallback } = props
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

  return (
    <div className="ag-theme-material" style={{ height: '100vh', width: '100%' }}>
      <AgGridReact
        ref={gridRef}
        rowData={trades}
        columnDefs={columnDefinitions(notesImagesColumnClickCallback)}
        reactiveCustomComponents
      />
    </div>
  )
}