import {BrowserRouter,Routes,Route} from "react-router-dom"
import { Signup } from "./pages/singup"
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" Component={Signup} />
          <Route path="/signin" />
          <Route path="/dashboard" />
          <Route path="/send" />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
