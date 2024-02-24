import { useRef } from 'react'
import { AgGridReact, } from 'ag-grid-react'
import Trade from '../../../../models/trade'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.min.css'
import { columnDefinitions } from './columnDefinitions'

interface DataGridProps {
  notesImagesColumnClickCallback: (data: Trade) => void
  trades: Trade[]
}

export default function DataGrid(props: DataGridProps) {
  const { notesImagesColumnClickCallback, trades } = props
  const gridRef = useRef<AgGridReact<Trade>>(null)

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