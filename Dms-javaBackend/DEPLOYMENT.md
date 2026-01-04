# DMS Backend Deployment Guide

This guide provides step-by-step instructions for deploying the DMS Backend microservices stack on a Linux server using Docker Compose.

## Prerequisites

- Linux server with Docker and Docker Compose installed
- At least 4GB RAM and 2 CPU cores recommended
- Ports 8080-8085, 8761, 9092, 2181, 5432, 27017 available
- Git for cloning the repository

## Architecture Overview

The stack includes:
- **Infrastructure Services**: Zookeeper, Kafka, PostgreSQL, MongoDB, Keycloak
- **Microservices**: Discovery Server (Eureka), API Gateway, Auth Service, Audit Trail Service, Document Initiation Service, Subscription Panel
- **Startup Order**: Zookeeper → Kafka → Databases → Discovery Server → Keycloak → API Gateway → Microservices

## Deployment Steps

### 1. Clone Repository

```bash
git clone <repository-url>
cd DMS-Backend
```

### 2. Configure Environment (Optional)

Edit `docker-compose.yml` to customize:
- Database credentials
- Keycloak admin credentials
- Port mappings
- Volume paths

### 3. Build Docker Images

Build all service images:

```bash
docker-compose build --pull --no-cache
```

This will:
- Build Maven projects for each microservice
- Create optimized Docker images with multi-stage builds
- Include health checks and wait-for logic

### 4. Start Services

Launch the entire stack:

```bash
docker-compose up -d
```

Services will start in dependency order with automatic waiting for required services.

### 5. Verify Deployment

Check container status:

```bash
docker-compose ps
```

All containers should show "Up" status.

### 6. Monitor Logs

View logs for specific services:

```bash
# API Gateway logs
docker-compose logs -f api-gateway

# Discovery Server logs
docker-compose logs -f discovery-server

# All services logs
docker-compose logs -f
```

## Service Verification

### Eureka Discovery Server
```bash
curl http://localhost:8761/
```
Should show Eureka dashboard with registered services.

### API Gateway Health
```bash
curl http://localhost:8081/actuator/health
```
Should return `{"status":"UP"}`.

### Keycloak
```bash
curl http://localhost:8080/realms
```
Should list available realms.

### Individual Microservices
```bash
# Auth Service
curl http://localhost:8082/actuator/health

# Audit Trail Service
curl http://localhost:8083/actuator/health

# Document Initiation Service
curl http://localhost:8084/actuator/health

# Subscription Panel
curl http://localhost:8085/actuator/health
```

### Kafka Topics
```bash
docker-compose exec kafka kafka-topics --bootstrap-server kafka:9092 --list
```

## Service Endpoints

After successful deployment:

- **API Gateway**: http://localhost:8081
- **Eureka Dashboard**: http://localhost:8761
- **Keycloak Admin**: http://localhost:8080 (admin/admin)
- **Auth Service**: http://localhost:8082
- **Audit Trail Service**: http://localhost:8083
- **Document Initiation Service**: http://localhost:8084
- **Subscription Panel**: http://localhost:8085

## Common Issues & Fixes

### Services Not Starting
- Check logs: `docker-compose logs <service-name>`
- Verify dependencies are running: `docker-compose ps`
- Ensure ports are not in use: `netstat -tlnp | grep <port>`

### Database Connection Errors
- Check PostgreSQL logs: `docker-compose logs postgres`
- Verify credentials in `docker-compose.yml`
- Ensure volume permissions: `docker-compose down -v` then restart

### Kafka Connectivity Issues
- Verify Zookeeper is running: `docker-compose logs zookeeper`
- Check advertised listeners in compose file
- Test with: `docker-compose exec kafka kafka-console-producer --bootstrap-server kafka:9092 --topic test`

### Keycloak Realm Import Fails
- Place realm JSON files in `./keycloak/` directory
- Restart Keycloak: `docker-compose restart keycloak`
- Check Keycloak logs for import errors

### Memory Issues
- Increase Docker memory limit in Docker Desktop/settings
- Reduce service replicas or add more RAM to host

## Maintenance

### Update Services
```bash
# Pull latest images
docker-compose pull

# Rebuild and restart
docker-compose up -d --build
```

### Backup Data
```bash
# Backup PostgreSQL
docker-compose exec postgres pg_dump -U keycloak keycloakdb > backup.sql

# Backup MongoDB
docker-compose exec mongodb mongodump --out /backup
docker cp $(docker-compose ps -q mongodb):/backup ./mongo-backup
```

### Stop Services
```bash
# Stop all
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

## Troubleshooting Commands

```bash
# Check resource usage
docker stats

# Inspect container
docker-compose exec <service> bash

# View container environment
docker-compose exec <service> env

# Restart specific service
docker-compose restart <service>
```

## Security Considerations

- Change default Keycloak admin credentials
- Use environment variables for sensitive data
- Configure SSL/TLS for production
- Set up proper firewall rules
- Regularly update Docker images

## Support

For issues:
1. Check service logs
2. Verify network connectivity between containers
3. Ensure sufficient system resources
4. Review Docker and Docker Compose versions