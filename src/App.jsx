import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import AddNew from './pages/AddNew'
import AllPost from './pages/AllPost'
import EditArticle from './pages/EditArticle'
import Preview from './pages/Preview'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container flex">
        <Sidebar />
        <div className="content-container flex-grow p-5">
          <Routes>
            <Route path="/" element={<AllPost />} />
            <Route path='/edit/:id' element={<EditArticle />}/>
            <Route path='/addnew' element={<AddNew/>}/>
            <Route path="/preview" element={<Preview/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

function Home() {
  return <div>Home Page</div>;
}

export default App
