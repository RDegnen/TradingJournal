import Trade from "../../../models/trade"

export type TradeAction =
  | { type: 'GET_TRADES', trades: Trade[] }
  | { type: 'ADD_TRADE', trade: Trade }
  | { type: 'UPDATE_TRADE', trade: Trade }

export interface TradeState {
  trades: Trade[]
}