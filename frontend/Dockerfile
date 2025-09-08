# Imagem Node para o ambiente de desenvolvimento
FROM node:20-alpine

WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./
RUN npm install

# Copia o resto do código-fonte
COPY . .

# Expõe a porta padrão do Vite
EXPOSE 5173

# Comando para rodar o servidor de dev do Vite.
# O "--host" é CRUCIAL para que o Docker possa expor a porta.
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]