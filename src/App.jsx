import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <h1>ECommerce: By Manikanta kiran Golla</h1>
        <hr />
      </header>
      <main>
          <h2>Product Lists</h2>
          <hr />
      </main>
      <footer>
          <h1>Footer</h1>
      </footer>
    </>
  )
}

export default App