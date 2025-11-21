import React from 'react'
import { BrowserRouter, Route, Routes, } from 'react-router-dom'
import Request from './POST/Request'

//ok
function App() {
  return (
    <div>
<BrowserRouter>

<Routes>
  <Route path='/' element={<Request/>}/>
</Routes>
</BrowserRouter>
      
    </div>
  )
}

export default App
