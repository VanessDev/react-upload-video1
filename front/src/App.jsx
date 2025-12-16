import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './components/Layout/MainLayout'
import Home from './components/Pages/Home'
import UploadVideo from './components/Pages/UploadVideo'

function App() {

  return (
    <>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/upload" element={<UploadVideo/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App