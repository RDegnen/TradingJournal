import { ColDef, SuppressKeyboardEventParams, ValueFormatterLiteParams } from 'ag-grid-community'
import Trade from '../../../../models/trade'
import { CustomCellRendererProps } from 'ag-grid-react'
import NotesAndImagesCellRenderer from './NotesAndImagesCellRenderer'
import PriceColumnEditor from './PriceColumnEditor'
import DateColumnEditor from './DateColumnEditor'

function suppressKeyboardEventCallback(params: SuppressKeyboardEventParams) {
  if (params.event.key === 'Enter') return true
  return false
}

export const columnDefinitions = (
  notesAndImagesCallback: (data: Trade) => void
): ColDef[] => [
    {
      field: 'pair',
      headerName: 'Pair',
    },
    {
      field: 'positionSize',
      headerName: 'Position Size'
    },
    {
      field: 'direction',
      headerName: 'Direction',
      valueFormatter: (params: ValueFormatterLiteParams<Trade, number>) => {
        const directionMap = new Map([
          [0, 'Long'],
          [1, 'Short']
        ])
        return directionMap.get(params.value!)!
      }
    },
    {
      field: 'entryTime',
      headerName: 'Entry Time'
    },
    {
      field: 'entry',
      headerName: 'Entry'
    },
    {
      field: 'stopLoss',
      headerName: 'Stop Loss'
    },
    {
      field: 'takeProfit',
      headerName: 'Take Profit'
    },
    {
      field: 'riskReward',
      headerName: 'Risk Reward'
    },
    {
      field: 'riskPercent',
      headerName: 'Risk',
      valueFormatter: (params: ValueFormatterLiteParams<Trade, number>) => {
        return `${params.value! * 100}%`
      }
    },
    {
      field: 'strategy',
      headerName: 'Strategy'
    },
    {
      field: 'exitTime',
      headerName: 'Exit Time',
      editable: true,
      cellEditor: DateColumnEditor,
      suppressKeyboardEvent: (params: SuppressKeyboardEventParams) =>
        suppressKeyboardEventCallback(params)
    },
    {
      field: 'exit',
      headerName: 'Exit',
      editable: true,
      cellEditor: PriceColumnEditor,
      suppressKeyboardEvent: (params: SuppressKeyboardEventParams) =>
        suppressKeyboardEventCallback(params)
    },
    {
      headerName: 'Notes & Images',
      cellRenderer: (props: CustomCellRendererProps<Trade>) =>
        NotesAndImagesCellRenderer({ customCellRendererProps: props, onClickCallback: notesAndImagesCallback })
    }
  ]