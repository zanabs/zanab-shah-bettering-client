import './App.css'
import Header from './components/Header/Header'
import Home from './pages/Home'
import { CategoryPage }  from './pages/CategoryPage'
import {Footer} from './components/Footer/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CardDetailsPage } from './pages/CardDetailsPage'

function App() {
  return (
     <>
      <Header/>       
        <Router>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element ={<CategoryPage/>} />
          <Route path="/resource/:categoryId/:resourceId" element ={<CardDetailsPage/>} />
          </Routes>
        </Router>
      <Footer/>
     </>
  )
}

export default App
