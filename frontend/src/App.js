import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ReportPet from './pages/ReportPet';
import LostAndFound from './pages/LostAndFound';
import MapSearch from './pages/MapSearch';
import AISearch from './pages/AISearch';
import GeneratePoster from './pages/GeneratePoster';
import PosterTemplates from './pages/PosterTemplates';
import PreviewPoster from './pages/PreviewPoster';
import ScrollToTop from './components/ScrollToTop';
import LostPetDetail from './pages/LostPetDetail';
import './App.css';

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report-pet" element={<ReportPet />} />
          <Route path="/lost-and-found" element={<LostAndFound />} />
          <Route path="/map-search" element={<MapSearch />} />
          <Route path="/ai-search" element={<AISearch />} />
          <Route path="/generate-poster" element={<GeneratePoster />} />
          <Route path="/poster-templates" element={<PosterTemplates />} />
          <Route path="/preview-poster" element={<PreviewPoster />} />    
          <Route path="/lost-pets/:id" element={<LostPetDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
