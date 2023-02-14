FROM alpine:latest

# Update the package repository and install iptables
RUN apk update && apk add iptables && apk add node && apk add npm
RUN apk add rsyslog

# Set the working directory to /app
WORKDIR /app

# Expose any necessary ports
EXPOSE 80

# Start the application
CMD ["/bin/sh"]
