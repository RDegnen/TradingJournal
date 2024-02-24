import { useState } from 'react'
import {
  Box,
  Grid,
  FormControl,
  Autocomplete,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  Button
} from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import { pairs, directions } from '../../../../utils/constants'
import Trade, { defaultTrade } from '../../../../models/trade'

interface NewTradesModalProps {
  onSubmitCallback: () => void
}

export default function NewTradesModal(props: NewTradesModalProps) {
  const { onSubmitCallback } = props
  const [newTrade, setNewTrade] = useState<Trade>(defaultTrade)
  const pairOptions = Object.values(pairs)

  async function createTrade() {
    const result = await fetch('/api/Trades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTrade)
    })
    return result
  }

  async function onSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      await createTrade()
      onSubmitCallback()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Autocomplete
            value={newTrade.pair}
            onChange={(_, value: string | null) => {
              setNewTrade(trade => ({ ...trade, pair: value! }))
            }}
            sx={{ width: 300 }}
            options={pairOptions}
            renderInput={(params) => <TextField {...params} label="Pair" />}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            required
            sx={{ width: 300 }}
            label="Position Size"
            value={newTrade.positionSize || ''}
            onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              setNewTrade(trade => ({ ...trade, positionSize: event.target.value }))
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl sx={{ width: 300 }} required>
            <InputLabel id="new-trade-direction-select">Direction</InputLabel>
            <Select
              labelId="new-trade-direction-select"
              label="Direction"
              value={newTrade.direction}
              onChange={(event: SelectChangeEvent<number>) => {
                const value = typeof event.target.value === 'number' ?
                  event.target.value :
                  parseInt(event.target.value)

                setNewTrade(trade => ({ ...trade, direction: value }))
              }}
            >
              <MenuItem value={directions.LONG.value}>{directions.LONG.label}</MenuItem>
              <MenuItem value={directions.SHORT.value}>{directions.SHORT.label}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <DateTimePicker
            label="Entry Time"
            sx={{ width: 300 }}
            value={newTrade.entryTime}
            onChange={(value: string | null) => {
              setNewTrade(trade => ({ ...trade, entryTime: value! }))
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            required
            sx={{ width: 300 }}
            label="Entry"
            value={newTrade.entry || ''}
            onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              setNewTrade(trade => ({ ...trade, entry: event.target.value }))
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            required
            sx={{ width: 300 }}
            label="Stop Loss"
            value={newTrade.stopLoss || ''}
            onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              setNewTrade(trade => ({ ...trade, stopLoss: event.target.value }))
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            required
            sx={{ width: 300 }}
            label="Take Profit"
            value={newTrade.takeProfit || ''}
            onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              setNewTrade(trade => ({ ...trade, takeProfit: event.target.value }))
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            required
            sx={{ width: 300 }}
            label="Risk Reward Ratio"
            value={newTrade.riskReward || ''}
            onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              setNewTrade(trade => ({ ...trade, riskReward: event.target.value }))
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            required
            sx={{ width: 300 }}
            label="Risk %"
            value={newTrade.riskPercent || ''}
            onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              setNewTrade(trade => ({ ...trade, riskPercent: parseInt(event.target.value) / 100 }))
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Button type="submit">Create</Button>
        </Grid>
      </Grid>
    </Box>
  )
}