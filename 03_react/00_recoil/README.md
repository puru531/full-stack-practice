# Node version
```bash
v22.13.0
```

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Recoil
Recoil is a state management library for React apps. It provides several capabilities that are difficult to achieve with React alone, while being compatible with the newest features of React.
## Installation
```bash
npm install recoil
```
## Atom
Atoms represent the state of our application. They are units of state that can be read from and written to. Atoms can be read from and written to by any part of our application.

## Hooks
Recoil provides a set of hooks that allow us to interact with atoms. These hooks are used to read and write to atoms.
### useRecoilValue
This hook is used to read the value of an atom.
```jsx
const value = useRecoilValue(atomName);
```
### useSetRecoilState
This hook is used to set the value of an atom.
```jsx
const setValue = useSetRecoilState(atomName);
setValue(newValue);
```
### useRecoilState
This hook is a combination of useRecoilValue and useSetRecoilState. It returns an array with two elements: the value of the atom and a function to set the value of the atom.
```jsx
const [value, setValue] = useRecoilState(atomName);
```

## Selectors
Selectors are derived state. They are functions that calculate a value based on the current state of our application. Selectors can depend on atoms and other selectors. They can be read from like atoms, but they cannot be written to.

## RecoilRoot
The RecoilRoot component is used to provide the Recoil state to our application. It should be placed at the root of our application.

```jsx
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <MyApp />
    </RecoilRoot>
  );
}
```

## Example
```jsx
import React from 'react';
import { RecoilRoot, atom, useRecoilState } from 'recoil';

const countState = atom({
  key: 'countState',
  default: 0,
});

function Counter() {
  const [count, setCount] = useRecoilState(countState);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

function App() {
  return (
    <RecoilRoot>
      <Counter />
    </RecoilRoot>
  );
}

export default App;
```

