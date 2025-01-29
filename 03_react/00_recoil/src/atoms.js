import { atom } from "recoil";
import { selector } from "recoil";

// ================== Atoms ==================
// Define 4 atoms for the 4 states we would have defined in the App component

export const networkAtom = atom({
  key: 'networkAtom',
  default: 102
})

export const jobsAtom = atom({
  key: 'jobsAtom',
  default: 0
})

export const notificationsAtom = atom({
  key: 'notificationsAtom',
  default: 12
})

export const messagingAtom = atom({
  key: 'messagingAtom',
  default: 2
})

// ================== Selectors ==================
// We can also define a selector to calculate the total notifications
// This is useful when we have to calculate the total notifications in multiple components
// Selectors are like atoms but they are used to calculate derived values from atoms
// They are not stored in the state, they are recalculated every time the atoms they depend on change

export const totalNotificationsSelector = selector({
  key: 'totalNotificationsSelector',
  get: ({get}) => { // get is a function that is used to read the value of an atom
    const networkNotificationsCount = get(networkAtom)
    const jobsAtomCount = get(jobsAtom)
    const messagingAtomCount = get(messagingAtom)
    const notificationsAtomCount = get(notificationsAtom)

    return networkNotificationsCount + jobsAtomCount + messagingAtomCount + notificationsAtomCount;
  }
});
