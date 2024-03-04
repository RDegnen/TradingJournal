import { ChangeEvent, KeyboardEvent } from 'react'
import { CustomCellEditorProps } from "ag-grid-react"
import { TextField } from '@mui/material'
import useTrade from "../../../context/useTrade"
import { updateTrade } from '../../../actions'

export default function PriceColumnEditor(props: CustomCellEditorProps) {
  const { value, onValueChange, data, colDef, stopEditing } = props
  const [, dispatch] = useTrade()!

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      updateTrade({ ...data, [colDef.field as string]: value }, dispatch)
      stopEditing()
    } 
  }

  return (
    <TextField
      value={value || ''}
      onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onValueChange(event.target.value)}
      onKeyDown={onKeyDown}
    />
  )
}