# ================= BUILD STAGE =================
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy full multi-module project
COPY . .

# Build only discovery-server with parent
RUN mvn -B -pl discovery-server -am clean package -DskipTests


# ================= RUNTIME STAGE =================
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy discovery-server jar only
COPY --from=build /app/discovery-server/target/*.jar /app/app.jar

# Wait-for script
COPY wait-for.sh /wait-for.sh
RUN chmod +x /wait-for.sh && \
    apt-get update && \
    apt-get install -y netcat-openbsd curl && \
    rm -rf /var/lib/apt/lists/*

# Server config
ENV SERVER_PORT=8761
EXPOSE 8761

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
CMD curl -f http://localhost:${SERVER_PORT}/actuator/health || exit 1

# Startup
ENTRYPOINT ["/wait-for.sh"]
CMD ["java","-jar","/app/app.jar"]

