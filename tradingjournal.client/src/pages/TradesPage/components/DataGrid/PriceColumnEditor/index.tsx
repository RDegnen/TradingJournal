import { KeyboardEvent } from 'react'
import { CustomCellEditorProps } from "ag-grid-react"
import useTrade from "../../../context/useTrade"
import { updateTrade } from '../../../actions'
import PriceInput, { PriceInputProps } from '../../../../../components/PriceInput'

interface PriceColumnEditorProps {
  cellEditorProps: CustomCellEditorProps,
  inputProps?: PriceInputProps
}

export default function PriceColumnEditor(props: PriceColumnEditorProps) {
  const { value, onValueChange, data, colDef, stopEditing } = props.cellEditorProps
  const [, dispatch] = useTrade()!

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      updateTrade({ ...data, [colDef.field as string]: value }, dispatch)
      stopEditing()
    } 
  }
  
  return (
    <PriceInput
      value={value}
      onValueChange={(value) => onValueChange(value)}
      onKeyDown={onKeyDown}
      {...props.inputProps}
    />
  )
}