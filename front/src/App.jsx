import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './components/Layout/MainLayout'
import Home from './components/Pages/Home'

import VideoDetail from './components/Pages/VideoDetail'

import UploadVideo from './components/Pages/UploadVideo'
import Stream from './components/Pages/Stream'


function App() {

  return (
    <>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Home/>}/>

          <Route path="/video/:videoId" element={<VideoDetail/>}/>
          <Route path="/upload" element={<UploadVideo/>}/>
          <Route path="/:id" element={<Stream/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App