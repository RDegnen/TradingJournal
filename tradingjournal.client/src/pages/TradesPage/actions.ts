import { Dispatch } from "react";
import { TradeAction } from "./context/constants";
import Trade from "../../models/trade";

const tradeEndpoint = '/api/Trades'

export async function getTrades(dispatch: Dispatch<TradeAction>) {
  const response = await fetch(tradeEndpoint)
  const data: Trade[] = await response.json()
  dispatch({ type: 'GET_TRADES', trades: data })
}

export async function addTrade(newTrade: Trade, dispatch: Dispatch<TradeAction>) {
  const response = await fetch(tradeEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTrade)
  })
  const trade: Trade = await response.json()
  dispatch({ type: 'ADD_TRADE', trade })
}

export async function updateTrade(updatedTrade: Trade, dispatch: Dispatch<TradeAction>) {
  await fetch(`/api/Trades/${updatedTrade.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedTrade)
  })
  dispatch({ type: 'UPDATE_TRADE', trade: updatedTrade })
}