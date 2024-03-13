import {BrowserRouter,Routes,Route} from "react-router-dom"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { Dashboard } from "./pages/Dashboard"
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" Component={Signup} />
          <Route path="/signin" Component={Signin} />
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/send" />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
