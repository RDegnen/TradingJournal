import { KeyboardEvent } from 'react'
import { CustomCellEditorProps } from "ag-grid-react"
import { DateTimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import useTrade from "../../../context/useTrade"
import { updateTrade } from '../../../actions'

export default function DateColumnEditor(props: CustomCellEditorProps) {
  const { value, onValueChange, data, colDef, stopEditing } = props
  const [, dispatch] = useTrade()!

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      updateTrade({ ...data, [colDef.field as string]: value }, dispatch)
      stopEditing()
    }
  }

  return (
    <div onKeyDown={onKeyDown}>
      <DateTimePicker
        value={dayjs(value)}
        onChange={onValueChange}
      />
    </div>
  )
}