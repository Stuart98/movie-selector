import { useState } from 'react'

import Header from './components/Header';
import Lists from './components/Lists';

import './styles/main.scss';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Header />
      <Lists />
    </div>
  )
}

export default App
