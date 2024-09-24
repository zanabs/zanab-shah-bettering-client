import './App.scss'
import Header from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ResourceDetailPage } from './pages/ResourceDetailPage/ResourceDetailPage'
import HomePage from './pages/HomePage/HomePage'
import { CategoryPage } from './pages/CategoryPage/CategoryPage';
import { CitySelectorPage } from './pages/CitySelectorPage/CitySelectorPage';
import { CityPage } from './pages/CityPage/CityPage';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <>
      <Header />
      <div className='main-content'>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/city" element={<CitySelectorPage />} />
            <Route path="/city/:cityName" element={<CityPage />} />
            <Route path="/city/:cityName/category/:categoryId" element={<CategoryPage />} />
            <Route path="/city/:cityName/category/:categoryId/:resourceId" element={<ResourceDetailPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
      <Footer />
    </>
  )
}

export default App
