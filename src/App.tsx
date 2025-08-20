
import React, { useState, useEffect } from 'react';

import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Stores from './components/Stores';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Jobs from './components/Jobs';
import JobApplication from './components/JobApplication';
import Colaboradores from './components/Colaboradores';
import WhatsAppPopup from './components/WhatsAppPopup';

function App() {
  const [currentView] = useState('home');
  const [jobData] = useState({ id: 'general', title: 'Banco de Talentos' });





  // useEffect para controlar animações fade-in
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observar todos os elementos com classe fade-in
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    return () => {
      fadeElements.forEach(el => observer.unobserve(el));
    };
  }, [currentView]); // Re-executar quando mudar de view

  if (currentView === 'jobs') {
    return (
      <div className="App">
        <Header />
        <Jobs />
        <Footer />
      </div>
    );
  }

  if (currentView === 'colaboradores') {
    return (
      <div className="App">
        <Header />
        <Colaboradores />
        <Footer />
      </div>
    );
  }

  if (currentView === 'apply') {
    return (
      <div className="App">
        <Header />
        <JobApplication jobId={jobData.id} jobTitle={jobData.title} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <Hero />
      <About />
      <Stores />
      <Gallery />
      <Contact />
      <Footer />
      <WhatsAppPopup />
    </div>
  );
}

export default App;
