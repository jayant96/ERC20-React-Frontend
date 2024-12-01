import { Web3Provider } from "./Web3Provider";
import { Route, Routes} from "react-router-dom";
import Homepage from "./Homepage";
import { SnackbarProvider } from "notistack";
import './App.css'

function App() {
  

  return (
    <>
    <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
    <Web3Provider>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Web3Provider>
    </SnackbarProvider>
    </>
  )
}

export default App
