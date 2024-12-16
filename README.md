# Project Title

This project sets up a multi-container Docker application using Docker Compose, which includes WordPress, MySQL, Nginx, a Flask app, and a Node.js app. Additionally, there is a reverse proxy setup using Nginx.

## Table of Contents

- [Project Title](#project-title)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Services](#services)
    - [WordPress](#wordpress)
    - [MySQL](#mysql)
    - [Nginx](#nginx)
    - [Flask App](#flask-app)
    - [Node.js App](#nodejs-app)
    - [Reverse Proxy](#reverse-proxy)
  - [Network](#network)
  - [Update WordPress to Handle Subdirectory](#update-wordpress-to-handle-subdirectory)
  - [***Access the apps via Reverse Proxy***](#access-the-apps-via-reverse-proxy)
  - [Purpose of Reverse Proxy](#purpose-of-reverse-proxy)
  - [Contributing](#contributing)
  - [License](#license)

## Prerequisites

Ensure you have the following installed:

- Docker
- Docker Compose

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.

    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

3. Start the Docker containers using Docker Compose.

```bash
docker-compose -f docker-compose-provisioning.yaml up -d
docker-compose -f reverseproxy-docker-compose.yaml up -d
```

## Usage

- Access WordPress at `http://localhost:9090`.
- The Node.js app can be accessed at `http://localhost:3000`.
- The Flask app is available at `http://localhost:5001`.
- The reverse proxy is configured to listen on port `8080`.

## Services

### WordPress

- **Image**: wordpress
- **Ports**: 9090:80
- **Environment Variables**:
  - `WORDPRESS_DB_HOST`: mysql
  - `WORDPRESS_DB_USER`: root
  - `WORDPRESS_DB_PASSWORD`: admin123
  - `WORDPRESS_DB_NAME`: wordpress

### MySQL

- **Image**: mysql:latest
- **Ports**: 3306:3306
- **Environment Variables**:
  - `MYSQL_ROOT_PASSWORD`: admin123
  - `MYSQL_DATABASE`: wordpress

### Nginx

- **Image**: nginx
- **Ports**: 80:80

### Flask App

- **Image**: tiangolo/uwsgi-nginx-flask:python3.9
- **Ports**: 5001:80

### Node.js App

- **Image**: bitnami/node:latest
- **Ports**: 3000:3000
- **Command**: Runs `script.js` which sets up a basic HTTP server.

### Reverse Proxy

- **Image**: nginx:latest
- **Ports**: 8080:8080
- Uses a custom Nginx configuration file (`nginx.conf`).

## Network

- Before running the docker-compose file make sure that `reverse_proxy_net` is created.
- If not, create it using:

```bash
docker network create reverse_proxy_net
```

## Update WordPress to Handle Subdirectory

Since WordPress is being accessed through `/wordpress/`, we need to ensure WordPress is aware of this path. Add the following to your `wp-config.php` file:

```php
define('WP_HOME', 'http://localhost:8080/wordpress');
define('WP_SITEURL', 'http://localhost:8080/wordpress');
```

## ***Access the apps via Reverse Proxy***

> **URLS**

<http://localhost:8080/wordpress/>
<http://localhost:8080/nginx/>
<http://localhost:8080/flask/>
<http://localhost:8080/nodejs/>

## Purpose of Reverse Proxy

A reverse proxy serves several purposes in a multi-container environment:

- **Routing Traffic:** It directs incoming requests to the appropriate service based on the request URL or path, simplifying access to multiple services through a single entry point.
  
- **Security:** It can help in masking the internal services and handling SSL termination, reducing exposure of backend services directly to the internet.

- **Load Balancing:** It distributes incoming requests across multiple instances of a service, enhancing performance and reliability.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

