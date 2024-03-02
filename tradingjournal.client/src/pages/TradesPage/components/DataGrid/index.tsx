import { useRef } from 'react'
import { AgGridReact, } from 'ag-grid-react'
import Trade from '../../../../models/trade'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.min.css'
import { columnDefinitions } from './columnDefinitions'
import useTrade from '../../context/useTrade'

interface DataGridProps {
  notesImagesColumnClickCallback: (data: Trade) => void
}

export default function DataGrid(props: DataGridProps) {
  const { notesImagesColumnClickCallback } = props
  const [state] = useTrade()!
  const gridRef = useRef<AgGridReact<Trade>>(null)

  return (
    <div className="ag-theme-material" style={{ height: '100vh', width: '100%' }}>
      <AgGridReact
        ref={gridRef}
        rowData={state.trades}
        columnDefs={columnDefinitions(notesImagesColumnClickCallback)}
        reactiveCustomComponents
      />
    </div>
  )
}