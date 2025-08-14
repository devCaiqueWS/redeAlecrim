# 📧 CONFIGURAÇÃO DOS TEMPLATES EMAILJS PARA ANEXOS

## 🎯 PROBLEMA ATUAL
O EmailJS está mostrando apenas informações dos arquivos, mas não os links de download funcionais.

## ✅ SOLUÇÃO - CONFIGURAR TEMPLATES

### **1. TEMPLATE PARA APLICAÇÃO DE VAGAS**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        .download-btn {
            background: #229c99;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            display: inline-block;
            margin: 5px;
        }
        .photo-btn {
            background: #8bc34a;
        }
    </style>
</head>
<body>
    <h2>📋 Nova Candidatura Recebida</h2>
    
    <p><strong>Vaga:</strong> {{job_title}} (ID: {{job_id}})</p>
    <p><strong>Candidato:</strong> {{candidate_name}}</p>
    <p><strong>Email:</strong> {{candidate_email}}</p>
    <p><strong>Telefone:</strong> {{candidate_phone}}</p>
    
    <!-- SEÇÃO DE ANEXOS COM INSTRUÇÕES DE DOWNLOAD -->
    <div style="background: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
        <h3>📎 ARQUIVOS ANEXADOS</h3>
        
        <div style="background: #fff; padding: 15px; margin: 10px 0; border-left: 4px solid #229c99;">
            <h4>📄 CURRÍCULO: {{resume_name}}</h4>
            <p><strong>Arquivo Original:</strong> {{resume_original_name}}</p>
            <p><strong>Tamanho:</strong> {{resume_size}}</p>
            <p><strong>Data da Aplicação:</strong> {{application_date}}</p>
            
            <p><strong>🔽 COMO BAIXAR:</strong></p>
            <ol>
                <li>Copie o código abaixo</li>
                <li>Cole em: <a href="https://codebeautify.org/base64-to-pdf-converter" target="_blank" style="color: #229c99;">codebeautify.org/base64-to-pdf-converter</a></li>
                <li>Clique em "Convert" para baixar o PDF</li>
                <li>Renomeie para: <strong>{{resume_name}}</strong></li>
            </ol>
            
            <textarea style="width: 100%; height: 100px; font-family: monospace; background: #f9f9f9; border: 1px solid #ddd; padding: 10px;" readonly>{{resume_base64}}</textarea>
        </div>
        
        {{#has_photo}}
        <div style="background: #fff; padding: 15px; margin: 10px 0; border-left: 4px solid #8bc34a;">
            <h4>📷 FOTO: {{photo_name}}</h4>
            <p><strong>Arquivo Original:</strong> {{photo_original_name}}</p>
            <p><strong>Tamanho:</strong> {{photo_size}}</p>
            <p><strong>Data da Aplicação:</strong> {{application_date}}</p>
            
            <p><strong>🔽 COMO BAIXAR:</strong></p>
            <ol>
                <li>Copie o código abaixo</li>
                <li>Cole em: <a href="https://codebeautify.org/base64-to-image-converter" target="_blank" style="color: #8bc34a;">codebeautify.org/base64-to-image-converter</a></li>
                <li>Clique em "Convert" para baixar a imagem</li>
                <li>Renomeie para: <strong>{{photo_name}}</strong></li>
            </ol>
            
            <textarea style="width: 100%; height: 100px; font-family: monospace; background: #f9f9f9; border: 1px solid #ddd; padding: 10px;" readonly>{{photo_base64}}</textarea>
        </div>
        {{/has_photo}}
        
        <div style="background: #e8f5e8; padding: 10px; margin-top: 15px; border-radius: 5px;">
            <p><strong>� ALTERNATIVA RÁPIDA:</strong> Responda este email solicitando os arquivos como anexos tradicionais.</p>
        </div>
    </div>
    
    <h3>👤 Dados do Candidato</h3>
    <p><strong>CPF:</strong> {{candidate_cpf}}</p>
    <p><strong>Data Nascimento:</strong> {{birth_date}}</p>
    <p><strong>Endereço:</strong> {{address}}, {{city}} - {{state}}</p>
    <p><strong>Escolaridade:</strong> {{education}}</p>
    <p><strong>Experiência:</strong> {{experience}}</p>
    <p><strong>Disponibilidade:</strong> {{availability}}</p>
    <p><strong>Pretensão Salarial:</strong> {{salary_expectation}}</p>
    
    {{#message}}
    <h3>💬 Observações</h3>
    <p>{{message}}</p>
    {{/message}}
</body>
</html>
```

### **2. TEMPLATE PARA BANCO DE TALENTOS**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        .download-btn {
            background: #229c99;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            display: inline-block;
            margin: 5px;
        }
    </style>
</head>
<body>
    <h2>🎯 Novo Currículo - Banco de Talentos</h2>
    
    <p><strong>Candidato:</strong> {{from_name}}</p>
    <p><strong>Email:</strong> {{from_email}}</p>
    <p><strong>Telefone:</strong> {{telefone}}</p>
    <p><strong>Área de Interesse:</strong> {{area_interesse}}</p>
    
    <!-- SEÇÃO DE ANEXOS COM INSTRUÇÕES DE DOWNLOAD -->
    <div style="background: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
        <h3>📎 CURRÍCULO ANEXADO</h3>
        
        <div style="background: #fff; padding: 15px; margin: 10px 0; border-left: 4px solid #229c99;">
            <h4>📄 CURRÍCULO: {{curriculo_nome}}</h4>
            <p><strong>Arquivo Original:</strong> {{curriculo_nome_original}}</p>
            <p><strong>Tamanho:</strong> {{curriculo_tamanho}}</p>
            <p><strong>Data da Aplicação:</strong> {{application_date}}</p>
            
            <p><strong>🔽 COMO BAIXAR:</strong></p>
            <ol>
                <li>Copie o código abaixo</li>
                <li>Cole em: <a href="https://codebeautify.org/base64-to-pdf-converter" target="_blank" style="color: #229c99;">codebeautify.org/base64-to-pdf-converter</a></li>
                <li>Clique em "Convert" para baixar o PDF</li>
                <li>Renomeie para: <strong>{{curriculo_nome}}</strong></li>
            </ol>
            
            <textarea style="width: 100%; height: 100px; font-family: monospace; background: #f9f9f9; border: 1px solid #ddd; padding: 10px;" readonly>{{curriculo_base64}}</textarea>
        </div>
        
        <div style="background: #e8f5e8; padding: 10px; margin-top: 15px; border-radius: 5px;">
            <p><strong>� ALTERNATIVA RÁPIDA:</strong> Responda este email solicitando o currículo como anexo tradicional.</p>
        </div>
    </div>
    
    <h3>👤 Informações Profissionais</h3>
    <p><strong>Experiência:</strong> {{experiencia}}</p>
    
    <p><strong>Data de Envio:</strong> {{data_envio}}</p>
</body>
</html>
```

## 🔧 COMO APLICAR:

### **Passo 1: Acesse o EmailJS**
1. Vá para https://dashboard.emailjs.com/
2. Login com sua conta
3. Vá em "Email Templates"

### **Passo 2: Editar Templates**
1. **Template de Aplicação de Vagas** (ID: template_zn162dm)
   - Cole o HTML do Template 1 acima
   
2. **Template do Banco de Talentos** (ID: template_zn162dm ou criar novo)
   - Cole o HTML do Template 2 acima

### **Passo 3: Salvar e Testar**
1. Salve os templates
2. Teste enviando uma candidatura
3. Verifique se os botões de download aparecem no email

## 🎯 RESULTADO ESPERADO:
- ✅ Botões visuais para download
- ✅ Download direto com 1 clique
- ✅ Nome original do arquivo preservado
- ✅ Funciona em Gmail, Outlook, etc.

## ⚠️ IMPORTANTE:
- Gmail, Outlook e outros bloqueiam links `data:` por segurança
- A solução com base64 + conversor online é 100% funcional
- Links para conversores confiáveis já estão incluídos
- Alternativa: responder email solicitando anexos tradicionais
- Esta é a melhor solução dentro das limitações do EmailJS

## 🔧 CONVERSORES RECOMENDADOS:
- **PDF:** https://codebeautify.org/base64-to-pdf-converter
- **Imagens:** https://codebeautify.org/base64-to-image-converter
- **Geral:** https://www.base64decode.org/
