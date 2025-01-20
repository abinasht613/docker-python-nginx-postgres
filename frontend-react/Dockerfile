# Dockerfile for ReactJS
FROM node:16-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./     
RUN npm install

# Copy app source and build it 
COPY . .    
#   Copy everything from the current directory to the /app directory in the container
RUN npm run build

# Serve the app with nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html  
# Copy the build folder from the previous stage to the nginx folder
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]      
# Start nginx and keep it running in the foreground
