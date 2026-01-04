# Dockerfile (fixed)
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy parent POM
COPY pom.xml /app/pom.xml

# Copy subscription-panel module
COPY subscription-panel /app/subscription-panel

# Build module
RUN mvn -B -f subscription-panel/pom.xml clean install -DskipTests -Dmaven.test.skip=true

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/subscription-panel/target/*.jar /app/app.jar

COPY wait-for.sh /wait-for.sh
RUN chmod +x /wait-for.sh && apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

ENV SERVER_PORT=8085
EXPOSE 8085

ENTRYPOINT ["/wait-for.sh"]
CMD ["java","-jar","/app/app.jar"]

