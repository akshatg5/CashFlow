import {BrowserRouter,Routes,Route} from "react-router-dom"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { Dashboard } from "./pages/Dashboard"
import { SendMoney } from "./pages/Sendmoney"
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" Component={Signup} />
          <Route path="/signin" Component={Signin} />
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/sendmoney" Component={SendMoney} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
