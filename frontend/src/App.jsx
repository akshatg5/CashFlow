import {BrowserRouter,Routes,Route} from "react-router-dom"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" Component={Signup} />
          <Route path="/signin" Component={Signin} />
          <Route path="/dashboard" />
          <Route path="/send" />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
