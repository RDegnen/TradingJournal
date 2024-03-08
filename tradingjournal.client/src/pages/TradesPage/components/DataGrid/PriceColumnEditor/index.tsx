import { KeyboardEvent } from 'react'
import { CustomCellEditorProps } from "ag-grid-react"
import useTrade from "../../../context/useTrade"
import { updateTrade } from '../../../actions'
import PriceInput from '../../../../../components/PriceInput'

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
    <PriceInput
      value={value}
      onValueChange={(value, formattedValue) => onValueChange(value)}
      onKeyDown={onKeyDown}
      prefix={'$'}
      includeSeparator={true}
    />
  )
}