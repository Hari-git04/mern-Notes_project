import React from 'react'
import {Routes,Route} from 'react-router';
import Homepage from './pages/Homepage';
import Createpage from './pages/Createpage'
import Notedetail from './pages/Notedetail';

function App() {
  return (
    <div data-theme="forest">

  
     
  <Routes>
    <Route path='/' element={<Homepage/>}/>
     <Route path='/create' element={<Createpage/>}/>
      <Route path='/note/:id' element={<Notedetail/>}/>
  </Routes>







    </div>
  )
}

export default App;