📦 Move – Landing Page com Orçamento Automático

Landing page moderna para empresa de mudanças (Move), desenvolvida em React + Vite + Tailwind, com formulário multi-etapas e cálculo automático de orçamento baseado na distância real entre CEPs.

🚀 Funcionalidades

✅ Landing page responsiva e moderna

✅ Modal de orçamento em múltiplas etapas

✅ Validação de formulário por etapa

✅ Campo de CEP de origem e destino

✅ Cálculo automático de distância (latitude/longitude)

✅ Geração de valor estimado da mudança

✅ Interface limpa, rápida e profissional

🛠️ Tecnologias Utilizadas

React

Vite

TypeScript

Tailwind CSS

Lucide Icons

API de geolocalização por CEP

Cálculo de distância geográfica (Haversine)

📂 Estrutura do Projeto
src/
├── assets/           # Imagens e mídias
├── components/       # Componentes reutilizáveis (Modal, Seções)
├── lib/              # Funções de cálculo e serviços (CEP, distância)
├── pages/            # Página principal
├── styles/           # Estilos globais
├── main.tsx
└── App.tsx

🧮 Como funciona o orçamento

Usuário informa:

Tipo de mudança

Endereço e CEP de origem

Endereço e CEP de destino

O sistema:

Converte os CEPs em coordenadas

Calcula a distância em KM

Aplica regras de preço

O valor estimado é exibido antes da confirmação

⚠️ O valor exibido é estimado e pode variar conforme análise final.

▶️ Rodando o projeto localmente
1️⃣ Clone o repositório
git clone https://github.com/seu-usuario/move-landing-page.git

2️⃣ Entre no projeto
cd move-landing-page

3️⃣ Instale as dependências
npm install

4️⃣ Rode o projeto
npm run dev


Acesse:
👉 http://localhost:5173

📌 Próximas melhorias (roadmap)

🔹 Integração com WhatsApp

🔹 Envio do orçamento por e-mail

🔹 Painel administrativo

🔹 Integração com Google Maps

🔹 Deploy automático (Vercel)

👨‍💻 Desenvolvido por

José Wesley
Desenvolvedor Full-stack
