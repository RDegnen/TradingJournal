export default interface Trade {
  id?: number
  pair: string
  positionSize: string
  direction: number
  entryTime: string
  entry: string
  stopLoss: string
  takeProfit: string
  riskReward: string
  riskPercent: number
  exitTime?: string
  exit?: string
  strategy?: string
  profitOrLoss?: number
  notes?: string
  imageKeys: string[]
}

export const defaultTrade: Trade = {
  pair: '',
  positionSize: '',
  direction: 0,
  entryTime: '',
  entry: '',
  stopLoss: '',
  takeProfit: '',
  riskReward: '',
  riskPercent: 0,
  imageKeys: []
}