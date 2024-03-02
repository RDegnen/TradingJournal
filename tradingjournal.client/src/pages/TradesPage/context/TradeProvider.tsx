import { Dispatch, ReactNode, useReducer } from "react"
import { TradeAction, TradeState } from "./constants"
import { TradeContext } from "./TradeContext"

function tradeReducer(state: TradeState, action: TradeAction) {
  switch (action.type) {
    case 'GET_TRADES': {
      return {
        ...state,
        trades: action.trades
      }
    }
    case 'ADD_TRADE': {
      return {
        ...state,
        trades: [...state.trades, action.trade]
      }
    }
    case 'UPDATE_TRADE': {
      const foundIdx = state.trades.findIndex(trade => trade.id === action.trade.id)
      const newTradeState = state.trades.slice()
      if (foundIdx) {
        newTradeState.splice(foundIdx, 1, action.trade)
      }
      return {
        ...state,
        trades: newTradeState
      }
    }
    default: {
      throw new Error('Unhandled action type')
    }
  }
}

interface TradeProviderProps {
  children: ReactNode
}

export default function TradeProvider(props: TradeProviderProps) {
  const { children } = props
  const [{ trades }, dispatch] = useReducer(tradeReducer, {
    trades: []
  })
  const value: [TradeState, Dispatch<TradeAction>] = [{ trades }, dispatch]
  return (
    <TradeContext.Provider value={value}>
      {children}
    </TradeContext.Provider>
  )
}