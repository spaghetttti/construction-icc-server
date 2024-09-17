FROM node:alpine

# Install PostgreSQL and its dependencies
RUN apk add --no-cache postgresql postgresql-client

# Create a non-root user for PostgreSQL
RUN useradd -m postgres

# Copy your application code
COPY . /app

# Set the working directory
WORKDIR /app

# Install dependencies
RUN npm install

# Expose the PostgreSQL port
EXPOSE 5432

# Switch to the non-root user
USER postgres

# Start the PostgreSQL server
CMD ["pg_ctl", "start", "-d", "-l", "/var/log/postgresql/postgresql-server.log"]