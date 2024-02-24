import { Container } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import TradesPage from './pages/TradesPage'

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
        <TradesPage />
      </Container>
    </LocalizationProvider>
  )
}

export default App;