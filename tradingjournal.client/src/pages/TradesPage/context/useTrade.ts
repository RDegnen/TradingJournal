import { useContext } from "react"
import { TradeContext } from "./TradeContext"

export default function useTrade() {
  const context = useContext(TradeContext)
  if (context === undefined) {
    throw new Error('useTrade must be used within a TradeProvider')
  }
  return context
}