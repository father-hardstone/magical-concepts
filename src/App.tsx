import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TouristDestination from './concepts/tourist-destination/TouristDestination'
import TouristDestinationTwo from './concepts/tourist-destination-two/TouristDestinationTwo'
import CelestialSkyComplication from './concepts/celestial-sky-complication/CelestialSkyComplication'
import NotFound from './pages/NotFound'
import usePageTitle from './hooks/usePageTitle'
import './App.css'

function AppContent() {
  usePageTitle()
  
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/concepts/tourist-destination" element={<TouristDestination />} />
      <Route path="/concepts/tourist-destination-two" element={<TouristDestinationTwo />} />
      <Route path="/concepts/celestial-sky-complication" element={<CelestialSkyComplication key="celestial-sky-complication" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
