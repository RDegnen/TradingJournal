import { Dispatch, createContext } from 'react'
import { TradeAction, TradeState } from './constants'

type TradeContextType = [TradeState, Dispatch<TradeAction>]

export const TradeContext = createContext<TradeContextType | null>(null)