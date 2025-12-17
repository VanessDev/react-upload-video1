import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './components/Layout/MainLayout'
import Home from './components/Pages/Home'
import UploadVideo from './components/Pages/UploadVideo'
import Stream from './components/Pages/Stream'

function App() {

  return (
    <>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/upload" element={<UploadVideo/>}/>
          <Route path="/stream/:id" element={<Stream/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App