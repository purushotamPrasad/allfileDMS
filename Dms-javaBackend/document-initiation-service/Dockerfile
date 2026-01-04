# ---------- BUILD STAGE ----------
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Parent pom (root pom.xml)
COPY pom.xml /app/pom.xml

# Copy only document-initiation-service module
COPY document-initiation-service /app/document-initiation-service

# Build only this module
RUN mvn -B -f document-initiation-service/pom.xml clean install \
    -DskipTests -Dmaven.test.skip=true


# ---------- RUNTIME STAGE ----------
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy generated jar
COPY --from=build /app/document-initiation-service/target/*.jar /app/app.jar

# wait-for script
COPY wait-for.sh /wait-for.sh
RUN chmod +x /wait-for.sh \
 && apt-get update \
 && apt-get install -y netcat-openbsd curl \
 && rm -rf /var/lib/apt/lists/*

ENV SERVER_PORT=8084
EXPOSE 8084

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
 CMD curl -f http://localhost:${SERVER_PORT}/actuator/health || exit 1

ENTRYPOINT ["/wait-for.sh"]
CMD ["java","-jar","/app/app.jar"]

