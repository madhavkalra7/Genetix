# You can use most Debian-based base images
FROM node:21-slim

# Install curl
RUN apt-get update && apt-get install -y curl && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY compile_page.sh /compile_page.sh
RUN chmod +x /compile_page.sh

# Install dependencies and customize sandbox
WORKDIR /home/user/nextjs-app

RUN npm create next-app@15.3.3 . -- --verbose


RUN npx --yes shadcn@2.6.3 init --yes -b neutral --force
# RUN npx --yes shadcn@2.6.3 add --all --yes
RUN npx --yes shadcn@2.6.3 add button card input

# Move the Nextjs app to the home directory and remove the nextjs-app directory
RUN mv /home/user/nextjs-app/* /home/user/ && rm -rf /home/user/nextjs-app
    
EXPOSE 3000