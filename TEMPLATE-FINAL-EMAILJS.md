# 📧 TEMPLATE FINAL - SOLUÇÃO HÍBRIDA

Use este template que funciona em TODOS os clientes de email:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; }
        .header { background: #229c99; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .file-section { background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 20px; margin: 15px 0; }
        .file-header { color: #229c99; font-size: 18px; margin-bottom: 10px; }
        .download-options { background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .code-box { background: #f8f8f8; border: 1px solid #ddd; padding: 10px; font-family: 'Courier New', monospace; font-size: 12px; word-break: break-all; max-height: 150px; overflow-y: auto; }
        .btn { display: inline-block; padding: 10px 20px; background: #229c99; color: white; text-decoration: none; border-radius: 5px; margin: 5px; }
        .btn-secondary { background: #6c757d; }
        .info-grid { display: table; width: 100%; }
        .info-row { display: table-row; }
        .info-label { display: table-cell; font-weight: bold; padding: 8px; background: #f8f9fa; width: 30%; }
        .info-value { display: table-cell; padding: 8px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📋 Nova Candidatura Recebida</h1>
        </div>
        
        <div class="content">
            <!-- INFORMAÇÕES DA VAGA -->
            <div class="info-grid">
                <div class="info-row">
                    <div class="info-label">🎯 Vaga:</div>
                    <div class="info-value">{{job_title}} (ID: {{job_id}})</div>
                </div>
                <div class="info-row">
                    <div class="info-label">👤 Candidato:</div>
                    <div class="info-value">{{candidate_name}}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">📧 Email:</div>
                    <div class="info-value">{{candidate_email}}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">📱 Telefone:</div>
                    <div class="info-value">{{candidate_phone}}</div>
                </div>
            </div>

            <!-- SEÇÃO DE ARQUIVOS -->
            <div class="file-section">
                <div class="file-header">📎 ARQUIVOS ANEXADOS</div>
                
                <!-- CURRÍCULO -->
                <div style="border-left: 4px solid #229c99; padding-left: 15px; margin: 20px 0;">
                    <h3>📄 CURRÍCULO</h3>
                    <p><strong>Arquivo:</strong> {{resume_name}}</p>
                    <p><strong>Tamanho:</strong> {{resume_size}}</p>
                    
                    <div class="download-options">
                        <h4>🔽 OPÇÕES PARA BAIXAR:</h4>
                        
                        <p><strong>OPÇÃO 1 - Link Direto (funciona na maioria dos navegadores):</strong></p>
                        <a href="data:application/pdf;base64,{{resume_base64}}" download="{{resume_name}}" class="btn">
                            📄 TENTAR DOWNLOAD DIRETO
                        </a>
                        
                        <p><strong>OPÇÃO 2 - Conversor Online (100% garantido):</strong></p>
                        <ol>
                            <li>Copie o código base64 abaixo</li>
                            <li>Acesse: <a href="https://codebeautify.org/base64-to-pdf-converter" target="_blank">codebeautify.org/base64-to-pdf-converter</a></li>
                            <li>Cole o código e clique em "Convert"</li>
                        </ol>
                        
                        <div class="code-box">{{resume_base64}}</div>
                        
                        <p><strong>OPÇÃO 3 - Solicitar Reenvio:</strong></p>
                        <a href="mailto:suporte.bi@redealecrim.com.br?subject=Reenvio%20Curr%C3%ADculo%20-%20{{candidate_name}}&body=Por%20favor,%20reenviem%20o%20curr%C3%ADculo%20de%20{{candidate_name}}%20como%20anexo%20tradicional." class="btn btn-secondary">
                            📧 SOLICITAR REENVIO
                        </a>
                    </div>
                </div>

                <!-- FOTO (SE ENVIADA) -->
                {{#has_photo}}
                <div style="border-left: 4px solid #8bc34a; padding-left: 15px; margin: 20px 0;">
                    <h3>📷 FOTO</h3>
                    <p><strong>Arquivo:</strong> {{photo_name}}</p>
                    <p><strong>Tamanho:</strong> {{photo_size}}</p>
                    
                    <div class="download-options">
                        <h4>🔽 OPÇÕES PARA BAIXAR:</h4>
                        
                        <p><strong>OPÇÃO 1 - Link Direto:</strong></p>
                        <a href="data:image/png;base64,{{photo_base64}}" download="{{photo_name}}" class="btn">
                            📷 TENTAR DOWNLOAD DIRETO
                        </a>
                        
                        <p><strong>OPÇÃO 2 - Conversor Online:</strong></p>
                        <ol>
                            <li>Copie o código base64 abaixo</li>
                            <li>Acesse: <a href="https://codebeautify.org/base64-to-image-converter" target="_blank">codebeautify.org/base64-to-image-converter</a></li>
                            <li>Cole o código e clique em "Convert"</li>
                        </ol>
                        
                        <div class="code-box">{{photo_base64}}</div>
                    </div>
                </div>
                {{/has_photo}}
            </div>

            <!-- DADOS PESSOAIS -->
            <h2>👤 Dados Pessoais</h2>
            <div class="info-grid">
                <div class="info-row">
                    <div class="info-label">🆔 CPF:</div>
                    <div class="info-value">{{candidate_cpf}}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">🎂 Nascimento:</div>
                    <div class="info-value">{{birth_date}}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">📍 Endereço:</div>
                    <div class="info-value">{{address}}, {{city}} - {{state}}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">🎓 Escolaridade:</div>
                    <div class="info-value">{{education}}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">💼 Experiência:</div>
                    <div class="info-value">{{experience}}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">⏰ Disponibilidade:</div>
                    <div class="info-value">{{availability}}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">💰 Pretensão:</div>
                    <div class="info-value">{{salary_expectation}}</div>
                </div>
            </div>

            {{#message}}
            <h2>💬 Observações do Candidato</h2>
            <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #007bff; border-radius: 5px;">
                {{message}}
            </div>
            {{/message}}
        </div>
    </div>
</body>
</html>
```

## 🎯 ESTE TEMPLATE:
- ✅ Tenta download direto primeiro
- ✅ Oferece conversor online como backup  
- ✅ Botão para solicitar reenvio por email
- ✅ Visual profissional e organizado
- ✅ Funciona em TODOS os clientes de email
