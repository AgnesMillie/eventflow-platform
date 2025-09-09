# Estágio Base: Imagem Node
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json PRIMEIRO para aproveitar o cache do Docker
# (Só reinstala dependências se o package.json mudar)
COPY package*.json ./
RUN npm install

# Copia o resto do código da aplicação
COPY . .

# O Nest CLI precisa estar disponível para rodar o servidor de dev
RUN npm install -g @nestjs/cli

# Expõe a porta que o Nest roda por padrão
EXPOSE 3000

# Comando para iniciar a app em modo "watch" (hot-reload)
CMD ["npm", "run", "start:dev"]