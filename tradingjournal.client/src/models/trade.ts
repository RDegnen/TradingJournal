export default interface Trade {
  id: number
  pair: string
  positionSize: number
  direction: number
  entryTime: string
  entry: number
  stopLoss: number
  takeProfit: number
  riskReward: string
  riskPercent: number
  exitTime: string
  exit?: number
  strategy?: string
  profitOrLoss?: number
  notes?: string
  imageLocations: string[]
}

export const defaultTrade: Trade = {
  id: 0,
  pair: '',
  positionSize: 0,
  direction: 0,
  entryTime: '',
  entry: 0,
  stopLoss: 0,
  takeProfit: 0,
  riskReward: '',
  riskPercent: 0,
  exitTime: '',
  imageLocations: []
}