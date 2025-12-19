import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './components/Layout/MainLayout'
import Home from './components/Pages/Home'
import UploadVideo from './components/Pages/UploadVideo'
import Stream from './components/Pages/Stream'
import CommentForm from './components/comments/CommentForm'
import "./assets/style/MediaQuery.css"

function App() {
  return (
    <>
      <Routes>

        <Route element={<MainLayout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/upload" element={<UploadVideo/>}/>
          <Route path="/:id" element={<Stream/>}/>
          <Route path='/comment' element={< CommentForm />}/>

        </Route>
      </Routes>
    </>
  );
}

export default App;
