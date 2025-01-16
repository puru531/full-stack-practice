import { atom } from "recoil";

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
  default: 0
})