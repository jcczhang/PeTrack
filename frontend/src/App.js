import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import GeneratePoster from './pages/GeneratePoster';
import PosterTemplates from './pages/PosterTemplates';
import LostAndFound from './pages/LostAndFound';
import ReportPet from './pages/ReportPet';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generate-poster" element={<GeneratePoster />} />
            <Route path="/poster-templates" element={<PosterTemplates />} />
            <Route path="/lost-and-found" element={<LostAndFound />} />
            <Route path="/report-pet" element={<ReportPet />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
