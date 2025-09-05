import React, { useState } from 'react';
import { Eye, EyeOff, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';
import { useToast } from '../hooks/useToast';
import './AlterarSenhaObrigatoria.css';

interface AlterarSenhaObrigatoriaProps {
  colaboradorId: number;
  email: string;
  onSenhaAlterada: () => void;
}

const AlterarSenhaObrigatoria: React.FC<AlterarSenhaObrigatoriaProps> = ({
  colaboradorId,
  email,
  onSenhaAlterada
}) => {
  const { showSuccess, showError } = useToast();
  const [formData, setFormData] = useState({
    senhaAtual: 'Alecrim@25',
    novaSenha: '',
    confirmarSenha: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    senhaAtual: false,
    novaSenha: false,
    confirmarSenha: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('A senha deve ter pelo menos 8 caracteres');
    }
    
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('A senha deve conter pelo menos uma letra minúscula');
    }
    
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('A senha deve conter pelo menos uma letra maiúscula');
    }
    
    if (!/(?=.*\d)/.test(password)) {
      errors.push('A senha deve conter pelo menos um número');
    }
    
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      errors.push('A senha deve conter pelo menos um caractere especial (@$!%*?&)');
    }
    
    if (password === 'Alecrim@25') {
      errors.push('A nova senha não pode ser igual à senha padrão');
    }
    
    return errors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validar senha em tempo real
    if (name === 'novaSenha') {
      const passwordErrors = validatePassword(value);
      setErrors(passwordErrors);
    }

    // Verificar se senhas coincidem
    if (name === 'confirmarSenha' || name === 'novaSenha') {
      const novaSenha = name === 'novaSenha' ? value : formData.novaSenha;
      const confirmarSenha = name === 'confirmarSenha' ? value : formData.confirmarSenha;
      
      if (confirmarSenha && novaSenha !== confirmarSenha) {
        setErrors(prev => {
          const filtered = prev.filter(error => !error.includes('coincidem'));
          return [...filtered, 'As senhas não coincidem'];
        });
      } else {
        setErrors(prev => prev.filter(error => !error.includes('coincidem')));
      }
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (errors.length > 0) {
      showError('Por favor, corrija os erros antes de continuar.');
      return;
    }

    if (formData.novaSenha !== formData.confirmarSenha) {
      showError('As senhas não coincidem.');
      return;
    }

    if (formData.novaSenha === 'Alecrim@25') {
      showError('A nova senha não pode ser igual à senha padrão.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_ENDPOINTS.users}/${colaboradorId}/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: formData.senhaAtual,
          newPassword: formData.novaSenha,
          confirmPassword: formData.confirmarSenha
        })
      });

      const data = await response.json();

      if (response.ok) {
        showSuccess('Senha alterada com sucesso!');
        onSenhaAlterada();
      } else {
        showError(data.error || 'Erro ao alterar senha. Tente novamente.');
      }
    } catch (error) {
      showError('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="alterar-senha-obrigatoria-overlay">
      <div className="alterar-senha-obrigatoria-modal">
        <div className="modal-header">
          <div className="warning-icon">
            <AlertCircle size={32} />
          </div>
          <h2>Alteração de Senha Obrigatória</h2>
          <p>
            Por motivos de segurança, você deve alterar sua senha padrão antes de continuar.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="alterar-senha-form">
          <div className="form-group">
            <label htmlFor="senhaAtual">Senha Atual</label>
            <div className="password-input-container">
              <Lock className="input-icon" />
              <input
                type={showPasswords.senhaAtual ? 'text' : 'password'}
                id="senhaAtual"
                name="senhaAtual"
                value={formData.senhaAtual}
                onChange={handleInputChange}
                placeholder="Sua senha atual"
                disabled
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => togglePasswordVisibility('senhaAtual')}
              >
                {showPasswords.senhaAtual ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="novaSenha">Nova Senha</label>
            <div className="password-input-container">
              <Lock className="input-icon" />
              <input
                type={showPasswords.novaSenha ? 'text' : 'password'}
                id="novaSenha"
                name="novaSenha"
                value={formData.novaSenha}
                onChange={handleInputChange}
                placeholder="Digite sua nova senha"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => togglePasswordVisibility('novaSenha')}
              >
                {showPasswords.novaSenha ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmarSenha">Confirmar Nova Senha</label>
            <div className="password-input-container">
              <Lock className="input-icon" />
              <input
                type={showPasswords.confirmarSenha ? 'text' : 'password'}
                id="confirmarSenha"
                name="confirmarSenha"
                value={formData.confirmarSenha}
                onChange={handleInputChange}
                placeholder="Confirme sua nova senha"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => togglePasswordVisibility('confirmarSenha')}
              >
                {showPasswords.confirmarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {errors.length > 0 && (
            <div className="password-requirements">
              <h4>Requisitos da senha:</h4>
              <ul>
                {errors.map((error, index) => (
                  <li key={index} className="requirement-error">
                    <AlertCircle size={16} />
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="password-requirements">
            <h4>Sua senha deve conter:</h4>
            <ul>
              <li className={formData.novaSenha.length >= 8 ? 'requirement-met' : ''}>
                {formData.novaSenha.length >= 8 ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                Pelo menos 8 caracteres
              </li>
              <li className={/(?=.*[a-z])/.test(formData.novaSenha) ? 'requirement-met' : ''}>
                {/(?=.*[a-z])/.test(formData.novaSenha) ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                Uma letra minúscula
              </li>
              <li className={/(?=.*[A-Z])/.test(formData.novaSenha) ? 'requirement-met' : ''}>
                {/(?=.*[A-Z])/.test(formData.novaSenha) ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                Uma letra maiúscula
              </li>
              <li className={/(?=.*\d)/.test(formData.novaSenha) ? 'requirement-met' : ''}>
                {/(?=.*\d)/.test(formData.novaSenha) ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                Um número
              </li>
              <li className={/(?=.*[@$!%*?&])/.test(formData.novaSenha) ? 'requirement-met' : ''}>
                {/(?=.*[@$!%*?&])/.test(formData.novaSenha) ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                Um caractere especial (@$!%*?&)
              </li>
              <li className={formData.novaSenha !== 'Alecrim@25' && formData.novaSenha ? 'requirement-met' : ''}>
                {formData.novaSenha !== 'Alecrim@25' && formData.novaSenha ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                Diferente da senha padrão
              </li>
            </ul>
          </div>

          <button
            type="submit"
            className="btn-alterar-senha"
            disabled={isSubmitting || errors.length > 0}
          >
            {isSubmitting ? 'Alterando...' : 'Alterar Senha'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AlterarSenhaObrigatoria;
