import React, { useState } from 'react';
import './Stores.css';
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useAnimations';

const Stores: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [headerRef, headerVisible] = useScrollAnimation(0.1);
  const [storesRef, storesAnimated] = useStaggerAnimation(150);

  const storeCategories = [
    {
      id: 'boti',
      title: 'Lojas Boti',
      icon: '🌸',
      description: 'Nossas lojas Boti oferecem uma ampla variedade de produtos de beleza e cosméticos, com atendimento especializado e as melhores marcas do mercado.',
      stores: [
        {
          id: 'AL02',
          name: 'Boti Assaí Jaguaré',
          nickname: 'Assaí Jaguaré',
          address: 'Av. Corifeu De Azevedo Marques, 4161 Lj 07',
          neighborhood: 'Vila Lajeada',
          cep: '05340-002',
          phone: '(11) 98335-5881'
        },
        {
          id: 'AL03',
          name: 'Boti Portal',
          nickname: 'Portal',
          address: 'Av. Prof. José Horácio Meirelles Teixeira, 1040 Lj 02',
          neighborhood: 'Vila Suzana',
          cep: '05630-130',
          phone: '(11) 98550-8017'
        },
        {
          id: 'AL04',
          name: 'Boti Metrô Butantã',
          nickname: 'Metrô Butantã',
          address: 'Rua Pirajussara, 530 Loja 08',
          neighborhood: 'Butantã',
          cep: '05501-020',
          phone: '(11) 98579-2433'
        },
        {
          id: 'AL05',
          name: 'Boti João Cachoeira',
          nickname: 'João Cachoeira',
          address: 'Rua João Cachoeira, 506',
          neighborhood: 'Itaim-Bibi',
          cep: '04535-001',
          phone: '(11) 98542-4120'
        },
        {
          id: 'AL06',
          name: 'Boti Shopping Taboão',
          nickname: 'Shop. Taboão',
          address: 'Rod. Regis Bittencourt, 1835 Km 271,5 Lj 187/188',
          neighborhood: 'Cid. Intercap',
          cep: '06768-200',
          phone: '(11) 98673-4176'
        },
        {
          id: 'AL07',
          name: 'Boti Cupecê',
          nickname: 'Cupecê',
          address: 'Av. Cupece, 3050',
          neighborhood: 'Jd. Prudência',
          cep: '04366-000',
          phone: '(11) 98593-9628'
        },
        {
          id: 'AL08',
          name: 'Boti Kaçula',
          nickname: 'Kaçula',
          address: 'Rua José Milani, 244 - Lj 08-09',
          neighborhood: 'Jd. Irapuá',
          cep: '06766-420',
          phone: '(11) 98510-5338'
        },
        {
          id: 'AL09',
          name: 'Boti Shopping Butantã',
          nickname: 'Shop. Butantã',
          address: 'Av. Prof. Francisco Morato, 2718 Lj 84',
          neighborhood: 'Butantã',
          cep: '05512-300',
          phone: '(11) 98576-9305'
        },
        {
          id: 'AL10',
          name: 'Boti Shopping Taboão II',
          nickname: 'Shop. Taboão II',
          address: 'Rod. Regis Bittencourt, 1835 Km 271,5 Q1',
          neighborhood: 'Cid. Intercap',
          cep: '06768-200',
          phone: '(11) 98684-7710'
        },
        {
          id: 'AL11',
          name: 'Boti Pirajussara',
          nickname: 'Pirajussara',
          address: 'Est. Kizaemon Takeuti, 2816',
          neighborhood: 'Jardim Mituzi',
          cep: '06775-003',
          phone: '(11) 98520-5919'
        },
        {
          id: 'AL12',
          name: 'Boti D\'Avó',
          nickname: 'D\'Avó',
          address: 'Est. Kizaemon Takeuti, 1300 Box 5',
          neighborhood: 'Jd. Clementino',
          cep: '06775-000',
          phone: '(11) 98480-6639'
        },
        {
          id: 'AL13',
          name: 'Boti Shopping Vila Olimpia',
          nickname: 'Shop. V. Olimpia',
          address: 'Rua Olimpiadas, 360 Loja 333',
          neighborhood: 'Vl. Olímpia',
          cep: '04551-000',
          phone: '(11) 98905-6770'
        },
        {
          id: 'AL14',
          name: 'Boti Atacadão',
          nickname: 'Atacadão',
          address: 'Rua do Tesouro, 680 -LOJA 06',
          neighborhood: 'Pq. Santos Dumont',
          cep: '06754-180',
          phone: '(11) 91064-9845'
        },
        {
          id: 'AL15',
          name: 'Boti Assaí Taboão',
          nickname: 'Assaí Taboão',
          address: 'Rua João Batista De Oliveira, 47 Loja 08',
          neighborhood: 'CENTRO',
          cep: '06763-450',
          phone: '(11) 98684-7693'
        },
        {
          id: 'AL16',
          name: 'Boti Yervant',
          nickname: 'Yervant',
          address: 'Av. Yervant Kissajikian, 1.727',
          neighborhood: 'Americanópolis',
          cep: '04428-010',
          phone: '(11) 98684-3386'
        },
        {
          id: 'AL17',
          name: 'Boti Rod Raf',
          nickname: 'Rod Raf',
          address: 'Rua Paulo Ayres, 470, Lj 05',
          neighborhood: 'Pq. Pinheiros',
          cep: '06767-220',
          phone: '(11) 98335-5867'
        },
        {
          id: 'AL18',
          name: 'Boti TQT',
          nickname: 'TQT',
          address: 'Est. Kizaemon Takeuti, 3261',
          neighborhood: 'Pirajussara',
          cep: '06775-000',
          phone: '(11) 98460-8853'
        },
        {
          id: 'AL19',
          name: 'Boti Jardim Miriam',
          nickname: 'Jd. Miriam',
          address: 'Avenida Cupecê 5616 - Letra A',
          neighborhood: 'Cidade Ademar',
          cep: '04366-001',
          phone: '(11) 98612-3888'
        },
        {
          id: 'AL20',
          name: 'Boti Metrô SP/Morumbi',
          nickname: 'Metrô SP/ Morumbi',
          address: 'Av. Dep. Jacob Salvador Zueibil, 56',
          neighborhood: 'Butantã',
          cep: '05512-390',
          phone: '(11) 98331-9934'
        }
      ]
    },
    {
      id: 'qdb',
      title: 'Lojas QDB - Quem Disse Berenice',
      icon: '💄',
      description: 'As lojas QDB trazem o conceito inovador da marca Quem Disse, Berenice?, com produtos exclusivos de maquiagem e uma experiência única em beleza.',
      stores: [
        {
          id: 'QDB_TS',
          name: 'QDB Taboão',
          nickname: 'QDB Taboão',
          address: 'Rod. Regis Bittencourt, 1835 Km 271,5 Lj 142 Piso 1',
          neighborhood: 'Cid. Intercap',
          cep: '06768-200',
          phone: '(11) 97669-8823'
        },
        {
          id: 'QDB_BT',
          name: 'QDB Butantã',
          nickname: 'QDB Butantã',
          address: 'Av. Dep. Jacob Salvador Zueibil, S/N Loja 81',
          neighborhood: 'Butantã',
          cep: '05512-300',
          phone: '(11) 99235-6673'
        },
        {
          id: 'QDB_VO',
          name: 'QDB Vila Olimpia',
          nickname: 'QDB V. Olimpia',
          address: 'Rua Olimpiadas, 360 Loja 332',
          neighborhood: 'Vila Olimpia',
          cep: '04551-000',
          phone: '(11) 99466-5918'
        }
      ]
    },
    {
      id: 'vd',
      title: 'Venda Direta (VD)',
      icon: '🏠',
      description: 'Nossa operação de Venda Direta inclui o HUB de distribuição e Espaços Revendedores, oferecendo oportunidades de negócio e renda extra.',
      stores: [
        {
          id: 'HUB',
          name: 'HUB - Centro de Distribuição',
          nickname: 'HUB',
          address: 'Av. João Paulo I, 1776 - GALPÃO B2',
          neighborhood: 'Embu das Artes',
          cep: '06817-000',
          phone: '(11) 98232-8310'
        },
        {
          id: 'ER',
          name: 'Espaço Revendedor',
          nickname: 'Espaço Revendedor',
          address: 'Est. Do Campo Limpo, 4805 Lj 35,36 E 37',
          neighborhood: 'Campo Limpo',
          cep: '05787-000',
          phone: '(11) 98232-8310'
        }
      ]
    }
  ];

  const allStores = storeCategories.flatMap(category => 
    category.stores.map(store => ({ ...store, category: category.id }))
  );

  const filteredStores = selectedCategory === 'all' 
    ? allStores 
    : storeCategories.find(cat => cat.id === selectedCategory)?.stores || [];

  const totalStores = allStores.length;

  return (
    <section id="stores" className="stores section">
      <div className="container">
        <div 
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`section-header ${headerVisible ? 'animate-fade-in-up' : ''}`}
        >
          <h2 className="gradient-text-animated">Nossas Lojas</h2>
          <p className={`${headerVisible ? 'animate-fade-in-up delay-200' : ''}`}>
            Conheça nossa rede com {totalStores} pontos de venda espalhados por São Paulo, 
            oferecendo produtos de qualidade e atendimento especializado em beleza e cosméticos.
          </p>
        </div>

        {/* Estatísticas das Lojas */}
        <div className={`stores-stats ${headerVisible ? 'stagger-animation' : ''}`}>
          <div className="stat-card modern-card hover-lift">
            <div className="stat-icon animate-pulse">🏪</div>
            <div className="stat-number gradient-text">{storeCategories[0].stores.length}</div>
            <div className="stat-label">Lojas Boti</div>
          </div>
          <div className="stat-card modern-card hover-lift">
            <div className="stat-icon animate-pulse">💄</div>
            <div className="stat-number gradient-text">{storeCategories[1].stores.length}</div>
            <div className="stat-label">Lojas QDB</div>
          </div>
          <div className="stat-card modern-card hover-lift">
            <div className="stat-icon animate-pulse">🏠</div>
            <div className="stat-number gradient-text">{storeCategories[2].stores.length}</div>
            <div className="stat-label">Pontos VD</div>
          </div>
          <div className="stat-card modern-card hover-lift">
            <div className="stat-icon animate-pulse">📍</div>
            <div className="stat-number gradient-text">{totalStores}</div>
            <div className="stat-label">Total de Lojas</div>
          </div>
        </div>

        {/* Filtros de Categoria */}
        <div className={`store-filters ${headerVisible ? 'animate-fade-in-up delay-400' : ''}`}>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''} hover-lift`}
          >
            <span className="filter-icon">🔥</span>
            Todas as Lojas
          </button>
          {storeCategories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`filter-btn ${selectedCategory === category.id ? 'active' : ''} hover-lift`}
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
            >
              <span className="filter-icon">{category.icon}</span>
              {category.title}
            </button>
          ))}
        </div>

        {/* Grid de Lojas */}
        <div 
          ref={storesRef as React.RefObject<HTMLDivElement>}
          className="stores-grid"
        >
          {selectedCategory === 'all' ? (
            storeCategories.map((category, categoryIndex) => (
              <div 
                key={category.id} 
                className={`category-section ${storesAnimated > categoryIndex ? 'animate-fade-in-up' : ''}`}
                style={{ animationDelay: `${categoryIndex * 0.2}s` }}
              >
                <div className="category-header">
                  <div className="category-icon animate-float">{category.icon}</div>
                  <div className="category-info">
                    <h3 className="gradient-text">{category.title}</h3>
                    <p>{category.description}</p>
                    <span className="store-count">{category.stores.length} lojas</span>
                  </div>
                </div>
                <div className="category-stores">
                  {category.stores.slice(0, 6).map((store, storeIndex) => (
                    <div 
                      key={store.id} 
                      className={`store-card modern-card hover-lift ${storesAnimated > categoryIndex ? 'animate-scale-in' : ''}`}
                      style={{ animationDelay: `${(categoryIndex * 0.2) + (storeIndex * 0.1)}s` }}
                    >
                      <div className="store-header">
                        <h4>{store.nickname}</h4>
                        <span className="store-id">{store.id}</span>
                      </div>
                      <div className="store-info">
                        <div className="store-address">
                          <span className="address-icon">📍</span>
                          <div className="address-text">
                            <p>{store.address}</p>
                            <p>{store.neighborhood} - CEP: {store.cep}</p>
                          </div>
                        </div>
                        <div className="store-phone">
                          <span className="phone-icon">📞</span>
                          <a href={`tel:${store.phone}`} className="phone-link">
                            {store.phone}
                          </a>
                        </div>
                      </div>
                      <div className="store-actions">
                        <a 
                          href={`https://maps.google.com/?q=${encodeURIComponent(store.address + ', ' + store.neighborhood)}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-outline btn-sm hover-glow"
                        >
                          Ver no Mapa
                        </a>
                      </div>
                    </div>
                  ))}
                  {category.stores.length > 6 && (
                    <div className="show-more-card">
                      <button 
                        onClick={() => setSelectedCategory(category.id)}
                        className="btn btn-primary hover-glow"
                      >
                        Ver todas as {category.stores.length} lojas
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            filteredStores.map((store, index) => (
              <div 
                key={store.id} 
                className={`store-card modern-card hover-lift ${storesAnimated > index ? 'animate-scale-in' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="store-header">
                  <h4>{store.nickname}</h4>
                  <span className="store-id">{store.id}</span>
                </div>
                <div className="store-info">
                  <div className="store-address">
                    <span className="address-icon">📍</span>
                    <div className="address-text">
                      <p>{store.address}</p>
                      <p>{store.neighborhood} - CEP: {store.cep}</p>
                    </div>
                  </div>
                  <div className="store-phone">
                    <span className="phone-icon">📞</span>
                    <a href={`tel:${store.phone}`} className="phone-link">
                      {store.phone}
                    </a>
                  </div>
                </div>
                <div className="store-actions">
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(store.address + ', ' + store.neighborhood)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm hover-glow"
                  >
                    Ver no Mapa
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        <div className={`stores-cta ${headerVisible ? 'animate-fade-in-up delay-800' : ''}`}>
          <h3 className="gradient-text">Quer fazer parte da nossa rede?</h3>
          <p>
            Conheça nossas oportunidades de franquia e venda direta. 
            Junte-se à Rede Alecrim e comece seu próprio negócio na área de beleza!
          </p>
          <div className="cta-buttons">
            <a href="#jobs" className="btn btn-primary hover-glow">
              Trabalhe Conosco
            </a>
            <a href="#contact" className="btn btn-outline hover-glow">
              Seja um Revendedor
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stores;
