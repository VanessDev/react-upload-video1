import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './components/Layout/MainLayout'
import Home from './components/Pages/Home'
import VideoDetail from './components/Pages/VideoDetail'

function App() {

  return (
    <>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/video/:videoId" element={<VideoDetail/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App