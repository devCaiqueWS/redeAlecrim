import React from 'react';
import { Phone, Flower2, Palette, ShoppingBag, Home, MapPin } from 'lucide-react';
import './Stores.css';

const Stores: React.FC = () => {
  const storeCategories = [
    {
      id: 'boti',
      title: 'Lojas Boti',
      icon: <Flower2 size={32} />,
      description: '[Descrição sobre as lojas Boti - escreva aqui sobre este segmento]',
      stores: [
        {
          name: '[NOME DA LOJA BOTI 1]',
          nickname: '[APELIDO DA LOJA]',
          address: '[ENDEREÇO COMPLETO DA LOJA]',
          phone: '[TELEFONE]'
        },
        {
          name: '[NOME DA LOJA BOTI 2]',
          nickname: '[APELIDO DA LOJA]',
          address: '[ENDEREÇO COMPLETO DA LOJA]',
          phone: '[TELEFONE]'
        },
        {
          name: '[NOME DA LOJA BOTI 3]',
          nickname: '[APELIDO DA LOJA]',
          address: '[ENDEREÇO COMPLETO DA LOJA]',
          phone: '[TELEFONE]'
        }
      ]
    },
    {
      id: 'qdb',
      title: 'Lojas QDB',
      icon: <Palette size={32} />,
      description: '[Descrição sobre as lojas QDB - escreva aqui sobre este segmento]',
      stores: [
        {
          name: '[NOME DA LOJA QDB 1]',
          nickname: '[APELIDO DA LOJA]',
          address: '[ENDEREÇO COMPLETO DA LOJA]',
          phone: '[TELEFONE]'
        },
        {
          name: '[NOME DA LOJA QDB 2]',
          nickname: '[APELIDO DA LOJA]',
          address: '[ENDEREÇO COMPLETO DA LOJA]',
          phone: '[TELEFONE]'
        }
      ]
    },
    {
      id: 'vd',
      title: 'Venda Direta (VD)',
      icon: <Home size={32} />,
      description: '[Descrição sobre a Venda Direta - escreva aqui sobre este segmento]',
      stores: [
        {
          name: '[NOME DO PONTO VD 1]',
          nickname: '[APELIDO DO PONTO]',
          address: '[ENDEREÇO COMPLETO DO PONTO]',
          phone: '[TELEFONE]'
        },
        {
          name: '[NOME DO PONTO VD 2]',
          nickname: '[APELIDO DO PONTO]',
          address: '[ENDEREÇO COMPLETO DO PONTO]',
          phone: '[TELEFONE]'
        }
      ]
    }
  ];

  return (
    <section id="stores" className="stores section">
      <div className="container">
        <div className="section-header fade-in">
          <h2>[NOSSAS LOJAS]</h2>
          <p>
            [Escreva aqui uma breve introdução sobre a rede de lojas, 
            destacando a presença em diferentes locais e o atendimento de qualidade]
          </p>
        </div>

        <div className="stores-categories">
          {storeCategories.map((category) => (
            <div key={category.id} className="category-section fade-in">
              <div className="category-header">
                <div className="category-icon">{category.icon}</div>
                <div className="category-info">
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                </div>
              </div>

              <div className="stores-grid">
                {category.stores.map((store, index) => (
                  <div key={index} className="store-card">
                    <div className="store-header">
                      <h4>{store.name}</h4>
                      <span className="store-nickname">{store.nickname}</span>
                    </div>
                    <div className="store-details">
                      <div className="store-address">
                        <span className="detail-icon"><MapPin size={16} /></span>
                        <p>{store.address}</p>
                      </div>
                      <div className="store-phone">
                        <span className="detail-icon"><Phone size={16} /></span>
                        <p>{store.phone}</p>
                      </div>
                    </div>
                    <div className="store-actions">
                      <a href="#contact" className="btn btn-outline btn-sm">
                        Mais Informações
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="stores-cta fade-in">
          <h3>[QUER ABRIR UMA LOJA CONOSCO?]</h3>
          <p>[Escreva sobre oportunidades de franquia ou parceria]</p>
          <a href="#contact" className="btn btn-primary">
            [FALE CONOSCO]
          </a>
        </div>
      </div>
    </section>
  );
};

export default Stores;
