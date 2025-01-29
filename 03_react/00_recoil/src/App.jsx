
import './App.css'
import { jobsAtom, messagingAtom, networkAtom, notificationsAtom, totalNotificationsSelector } from "./atoms.js";
import { useRecoilState, useRecoilValue } from "recoil";

function App() {
  //without recoil, we would define 4 states here
  // But with recoil, we are going to define 4 atoms, they are similar to states but are more optimal and are available to all components

  // reading values from atoms
  const networkNotificationsCount = useRecoilValue(networkAtom)
  const jobsAtomCount = useRecoilValue(jobsAtom)
  // useRecoilState is used to read and write values from atoms, it gives us the current value and a function to update the value
  const [messagingAtomCount, setMessagingAtomCount] = useRecoilState(messagingAtom)
  const notificationsAtomCount = useRecoilValue(notificationsAtom)

  // If we only want to update the value of an atom, we can use useSetRecoilState
  // const setMessagingAtomCount = useSetRecoilState(messagingAtom)



  /**
   * Now if we want a total count of all notifications, we can add all the atoms together
   *
   * OR to make sure that calculations are not repeated, we can use useMemo()
   * */

  // Simple addition
  // const totalNotifications = networkNotificationsCount + jobsAtomCount + messagingAtomCount + notificationsAtomCount;

  // Using useMemo
  // const totalNotifications = useMemo(() => {
  //   return networkNotificationsCount + jobsAtomCount + messagingAtomCount + notificationsAtomCount;
  // }, [networkNotificationsCount, jobsAtomCount, messagingAtomCount, notificationsAtomCount])

  // OR we can use a selector to do this calculation
  const totalNotifications = useRecoilValue(totalNotificationsSelector)
  return (
    <>
     <button>Home</button>

     <button>My Network ({networkNotificationsCount >= 100 ? '99+' : networkNotificationsCount})</button>
     <button>Jobs ({jobsAtomCount})</button>
     <button>Messaging ({messagingAtomCount})</button>
     <button>Notifications ({notificationsAtomCount})</button>

      {/*<button onClick={()=> setMessagingAtomCount(val => val + 1)}>Me</button>*/}
      <button onClick={()=> setMessagingAtomCount(val => val + 1)}>Me ({totalNotifications})</button>
    </>
  )
}

export default App
