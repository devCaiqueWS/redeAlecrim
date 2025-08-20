import React, { useState } from 'react';
import { User, Mail, Lock, Building, Calendar, Eye, EyeOff, Check, X, UserPlus } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';
import './CadastroColaborador.css';

interface CadastroColaboradorProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  isModal?: boolean;
}

interface FormData {
  nome: string;
  email: string;
  cargo: string;
  departamento: string;
  dataAdmissao: string;
  senha: string;
  confirmSenha: string;
}

interface FormErrors {
  nome?: string;
  email?: string;
  cargo?: string;
  departamento?: string;
  dataAdmissao?: string;
  senha?: string;
  confirmSenha?: string;
}

const CadastroColaborador: React.FC<CadastroColaboradorProps> = ({
  onSuccess,
  onCancel,
  isModal = false
}) => {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    cargo: '',
    departamento: '',
    dataAdmissao: '',
    senha: '',
    confirmSenha: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailSuggestion, setEmailSuggestion] = useState('');

  // Lista de cargos organizados por departamento
  const cargosPorDepartamento = {
    'Diretoria': [
      'Diretor(a) Geral',
      'Diretor(a) Comercial',
      'Diretor(a) Financeiro',
      'Diretor(a) Operacional'
    ],
    'Compras': [
      'Gerente de Compras',
      'Coordenador(a) de Compras',
      'Comprador(a)',
      'Assistente de Compras'
    ],
    'Financeiro': [
      'Gerente Financeiro',
      'Coordenador(a) Financeiro',
      'Analista Financeiro',
      'Assistente Financeiro',
      'Auxiliar Financeiro'
    ],
    'Marketing': [
      'Gerente de Marketing',
      'Coordenador(a) de Marketing',
      'Analista de Marketing',
      'Assistente de Marketing',
      'Designer Gráfico',
      'Social Media'
    ],
    'RH': [
      'Gerente de RH',
      'Coordenador(a) de RH',
      'Analista de RH',
      'Assistente de RH',
      'Recruiter',
      'Business Partner'
    ],
    'TI': [
      'Gerente de TI',
      'Coordenador(a) de TI',
      'Analista de Sistemas',
      'Desenvolvedor(a)',
      'Analista TI Jr',
      'Suporte Técnico'
    ],
    'Vendas': [
      'Gerente de Vendas',
      'Supervisor de Vendas',
      'Vendedor(a)',
      'Promotor(a)',
      'Consultor(a) de Vendas'
    ],
    'Operações': [
      'Gerente de Operações',
      'Supervisor de Operações',
      'Operador de Caixa',
      'Estoquista',
      'Auxiliar de Operações'
    ],
    'Sem setor': [
      'Estagiário(a)',
      'Consultor(a)',
      'Freelancer',
      'Terceirizado(a)'
    ]
  };

  // Validação em tempo real
  const validateField = (field: keyof FormData, value: string) => {
    const newErrors = { ...errors };

    switch (field) {
      case 'nome':
        if (!value.trim()) {
          newErrors.nome = 'Nome é obrigatório';
        } else if (value.trim().split(' ').length < 2) {
          newErrors.nome = 'Digite o nome completo';
        } else {
          delete newErrors.nome;
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          newErrors.email = 'E-mail é obrigatório';
        } else if (!emailRegex.test(value)) {
          newErrors.email = 'E-mail inválido';
        } else if (!value.includes('@redealecrim.com.br')) {
          newErrors.email = 'Use o domínio corporativo @redealecrim.com.br';
        } else {
          delete newErrors.email;
        }
        break;

      case 'cargo':
        if (!value) {
          newErrors.cargo = 'Cargo é obrigatório';
        } else {
          delete newErrors.cargo;
        }
        break;

      case 'departamento':
        if (!value) {
          newErrors.departamento = 'Departamento é obrigatório';
        } else {
          delete newErrors.departamento;
        }
        break;

      case 'dataAdmissao':
        if (!value) {
          newErrors.dataAdmissao = 'Data de admissão é obrigatória';
        } else {
          const dataAdmissao = new Date(value);
          const hoje = new Date();
          if (dataAdmissao > hoje) {
            newErrors.dataAdmissao = 'Data não pode ser futura';
          } else {
            delete newErrors.dataAdmissao;
          }
        }
        break;

      case 'senha':
        if (!value) {
          newErrors.senha = 'Senha é obrigatória';
        } else if (value.length < 6) {
          newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
        } else {
          delete newErrors.senha;
        }
        break;

      case 'confirmSenha':
        if (!value) {
          newErrors.confirmSenha = 'Confirmação de senha é obrigatória';
        } else if (value !== formData.senha) {
          newErrors.confirmSenha = 'Senhas não coincidem';
        } else {
          delete newErrors.confirmSenha;
        }
        break;
    }

    setErrors(newErrors);
  };

  // Gerar sugestão de e-mail
  const generateEmailSuggestion = (nome: string) => {
    if (nome.trim().split(' ').length >= 2) {
      const [primeiro, ...resto] = nome.trim().toLowerCase().split(' ');
      const ultimo = resto[resto.length - 1];
      const sugestao = `${primeiro}.${ultimo}@redealecrim.com.br`;
      setEmailSuggestion(sugestao);
    } else {
      setEmailSuggestion('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validação em tempo real
    validateField(name as keyof FormData, value);

    // Gerar sugestão de e-mail quando o nome muda
    if (name === 'nome') {
      generateEmailSuggestion(value);
    }
  };

  const useEmailSuggestion = () => {
    setFormData(prev => ({
      ...prev,
      email: emailSuggestion
    }));
    validateField('email', emailSuggestion);
    setEmailSuggestion('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar todos os campos
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      validateField(key as keyof FormData, formData[key as keyof FormData]);
      if (!formData[key as keyof FormData]) {
        newErrors[key as keyof FormErrors] = 'Campo obrigatório';
      }
    });
    // Se senha não for preenchida, bloquear envio
    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória';
    }
    setErrors(newErrors);
    // Verificar se há erros
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Logar o formData inteiro para depuração
  // console.log removido
      // Log para depuração do payload
      const payload = {
        name: formData.nome.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.senha,
        setor: formData.departamento,
        funcao: formData.cargo
      };
  // console.log removido
  const response = await fetch(API_ENDPOINTS.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
        // Resetar formulário
        setFormData({
          nome: '',
          email: '',
          cargo: '',
          departamento: '',
          dataAdmissao: '',
          senha: '',
          confirmSenha: ''
        });
        setErrors({});
        alert('Colaborador cadastrado com sucesso!');
        if (onSuccess) {
          onSuccess();
        }
      } else {
        if (result.error && result.error.includes('email')) {
          setErrors({ email: 'E-mail já está sendo usado por outro colaborador' });
        } else {
          alert(result.error || 'Erro ao cadastrar colaborador');
        }
      }
    } catch (error) {
      console.error('Erro ao cadastrar colaborador:', error);
      alert('Erro de conexão. Verifique se o servidor está funcionando.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const cargosDisponiveis = formData.departamento ? 
    cargosPorDepartamento[formData.departamento as keyof typeof cargosPorDepartamento] || [] : 
    [];

  const containerClass = isModal ? 'cadastro-modal-container' : 'cadastro-container';

  return (
    <div className={containerClass}>
      <div className="cadastro-header">
        <div className="header-icon">
          <UserPlus size={24} />
        </div>
        <div>
          <h2>Cadastrar Novo Colaborador</h2>
          <p>Preencha todas as informações para criar uma nova conta</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="cadastro-form">
        <div className="form-section">
          <h3>Informações Pessoais</h3>
          
          <div className="form-group">
            <label htmlFor="nome">
              <User size={18} />
              Nome Completo *
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              placeholder="Ex: João da Silva Santos"
              className={errors.nome ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.nome && <span className="error-message">{errors.nome}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <Mail size={18} />
              E-mail Corporativo *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="nome.sobrenome@redealecrim.com.br"
              className={errors.email ? 'error' : ''}
              disabled={isSubmitting}
            />
            {emailSuggestion && !formData.email && (
              <div className="email-suggestion">
                <span>Sugestão: {emailSuggestion}</span>
                <button type="button" onClick={useEmailSuggestion} className="use-suggestion">
                  <Check size={14} />
                  Usar
                </button>
              </div>
            )}
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
        </div>

        <div className="form-section">
          <h3>Informações Profissionais</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="departamento">
                <Building size={18} />
                Departamento *
              </label>
              <select
                id="departamento"
                name="departamento"
                value={formData.departamento}
                onChange={handleInputChange}
                className={errors.departamento ? 'error' : ''}
                disabled={isSubmitting}
              >
                <option value="">Selecione o departamento</option>
                {Object.keys(cargosPorDepartamento).map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              {errors.departamento && <span className="error-message">{errors.departamento}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="cargo">
                <User size={18} />
                Cargo *
              </label>
              <select
                id="cargo"
                name="cargo"
                value={formData.cargo}
                onChange={handleInputChange}
                className={errors.cargo ? 'error' : ''}
                disabled={isSubmitting || !formData.departamento}
              >
                <option value="">
                  {formData.departamento ? 'Selecione o cargo' : 'Primeiro selecione o departamento'}
                </option>
                {cargosDisponiveis.map(cargo => (
                  <option key={cargo} value={cargo}>{cargo}</option>
                ))}
              </select>
              {errors.cargo && <span className="error-message">{errors.cargo}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="dataAdmissao">
              <Calendar size={18} />
              Data de Admissão *
            </label>
            <input
              type="date"
              id="dataAdmissao"
              name="dataAdmissao"
              value={formData.dataAdmissao}
              onChange={handleInputChange}
              max={new Date().toISOString().split('T')[0]}
              className={errors.dataAdmissao ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.dataAdmissao && <span className="error-message">{errors.dataAdmissao}</span>}
          </div>
        </div>

        <div className="form-section">
          <h3>Configurações de Acesso</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="senha">
                <Lock size={18} />
                Senha *
              </label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="senha"
                  name="senha"
                  value={formData.senha}
                  onChange={handleInputChange}
                  placeholder="Mínimo 6 caracteres"
                  className={errors.senha ? 'error' : ''}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.senha && <span className="error-message">{errors.senha}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmSenha">
                <Lock size={18} />
                Confirmar Senha *
              </label>
              <div className="password-input">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmSenha"
                  name="confirmSenha"
                  value={formData.confirmSenha}
                  onChange={handleInputChange}
                  placeholder="Digite a senha novamente"
                  className={errors.confirmSenha ? 'error' : ''}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isSubmitting}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmSenha && <span className="error-message">{errors.confirmSenha}</span>}
            </div>
          </div>
        </div>

        <div className="form-actions">
          {onCancel && (
            <button
              type="button"
              className="btn-secondary"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              <X size={18} />
              Cancelar
            </button>
          )}
          
          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting || Object.keys(errors).length > 0}
          >
            {isSubmitting ? (
              <>
                <div className="loading-spinner" />
                Cadastrando...
              </>
            ) : (
              <>
                <UserPlus size={18} />
                Cadastrar Colaborador
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroColaborador;
