import { CustomCellRendererProps } from "ag-grid-react";
import { Button } from '@mui/material'
import Trade from "../../../../../models/trade";

export interface NotesAndImagesCellRendererProps {
  customCellRendererProps: CustomCellRendererProps<Trade>,
  onClickCallback: (data: Trade) => void
}

export default function NotesAndImagesCellRenderer(
  props: NotesAndImagesCellRendererProps
) {
  const { onClickCallback, customCellRendererProps } = props

  function onClick() {
    onClickCallback(customCellRendererProps.data!)
  }

  return (
    <Button onClick={onClick} variant="contained">View</Button>
  )
}