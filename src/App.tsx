
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
  const [currentView, setCurrentView] = useState('home');
  const [jobData, setJobData] = useState({ id: 'general', title: 'Banco de Talentos' });

  useEffect(() => {
    function handleHashChange() {
      const hash = window.location.hash;
      if (hash.startsWith('#apply-')) {
        const jobId = hash.replace('#apply-', '');
        setCurrentView('apply');
        const jobTitles: Record<string, string> = {
          '1': 'Consultor(a) de Vendas - Boti',
          '2': 'Consultor(a) de Vendas - QDB',
          '3': 'Gerente de Loja',
          '4': 'Supervisor(a) Comercial',
          '5': 'Consultor(a) de Venda Direta',
          '6': 'Líder de Venda Direta',
          '7': 'Assistente Administrativo',
          '8': 'Analista Financeiro',
          '9': 'Consultor(a) de Vendas Sênior - Boti',
          '10': 'Vendedor(a) Interno - QDB',
          '11': 'Promotor(a) de Vendas',
          '12': 'Coordenador(a) Regional',
        };
        const jobTitle = jobTitles[jobId] || 'Banco de Talentos';
        setJobData({ id: jobId, title: jobTitle });
        document.title = `${jobTitle} - Rede Alecrim`;
      } else if (hash === '#jobs') {
        setCurrentView('jobs');
        document.title = 'Trabalhe Conosco - Rede Alecrim';
      } else if (hash === '#colaboradores') {
        setCurrentView('colaboradores');
        document.title = 'Área dos Colaboradores - Rede Alecrim';
      } else if (hash === '#canva') {
        setCurrentView('canva');
        document.title = 'Apresentação Rede Alecrim';
      } else {
        setCurrentView('home');
        document.title = 'Rede Alecrim - Site Institucional';
      }
    }
    // Sempre atualizar ao montar e ao mudar o hash
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);





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
