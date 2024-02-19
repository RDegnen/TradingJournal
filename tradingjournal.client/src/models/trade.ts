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