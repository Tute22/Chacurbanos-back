# Utiliza una imagen base de Node.js
FROM node:20-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json para instalar las dependencias
COPY package.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos al directorio de trabajo
COPY . .

# Expone el puerto en el que la aplicación se ejecuta
EXPOSE 3001

# Comando para ejecutar la aplicación
CMD ["npm", "start"]