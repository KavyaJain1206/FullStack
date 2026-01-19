import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Button, TextField, Card, CardContent } from '@mui/material';
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Card style={{ maxWidth: 400, margin: "0 auto", marginTop: 50, padding: 20 }}>
      <CardContent>
        <h1>Material UI</h1>
          <TextField label="Enter Your Name" variant="outlined" fullWidth required style={{ marginBottom: 20 }} />
          <TextField label="Enter Your Email" variant="outlined" fullWidth required style={{ marginBottom: 20 }} />
          <TextField label="Enter Your Number" id="outlined-required" fullWidth required style={{marginBottom: 20}}/>
          <br />
          <Button variant="contained" color="primary" fullWidth>
            Submit
          </Button>
      </CardContent>

      {/* <Container maxWidth="sm">
      </Container> */}
    </Card>

  )
}

export default App