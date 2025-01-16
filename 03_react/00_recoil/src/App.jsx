
import './App.css'
import { networkAtom } from "./atoms.js";
import { useRecoilValue } from "recoil";

function App() {
  //without recoil, we would define 4 states here
  // But with recoil, we are going to define 4 atoms, they are similar to states but are more optimal and are available to all components

  // reading values from atoms
  const networkNotificationsCount = useRecoilValue(networkAtom)
  return (
    <>
     <button>Home</button>

     <button>My Network ({networkNotificationsCount})</button>
     <button>Jobs ()</button>
     <button>Messaging ()</button>
     <button>Notifications ()</button>

      <button>Me</button>
    </>
  )
}

export default App
