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

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [jobData, setJobData] = useState({ id: 'general', title: 'Banco de Talentos' });

  useEffect(() => {
    const handleHashChange = () => {
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
          '13': 'Gerente de Desenvolvimento',
          '14': 'Coordenador(a) de Venda Direta',
          '15': 'Especialista em Treinamento VD',
          '16': 'Analista de RH',
          '17': 'Analista de Marketing',
          '18': 'Coordenador(a) de TI',
          '19': 'Assistente de Compras',
          '20': 'Diretor(a) Comercial',
          '21': 'Gerente Nacional de Franquias',
          'general': 'Banco de Talentos'
        };
        
        const jobTitle = jobTitles[jobId] || 'Vaga Não Encontrada';
        setJobData({
          id: jobId,
          title: jobTitle
        });
        
        // Atualizar título da página
        document.title = `${jobTitle} - Rede Alecrim`;
      } else if (hash === '#jobs') {
        setCurrentView('jobs');
        document.title = 'Trabalhe Conosco - Rede Alecrim';
      } else {
        setCurrentView('home');
        document.title = 'Rede Alecrim - Site Institucional';
      }
    };

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
    </div>
  );
}

export default App;
