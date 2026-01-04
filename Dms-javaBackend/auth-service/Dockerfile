FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY . /app
RUN mvn -B -DskipTests package -DskipITs

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/auth-service/target/*.jar /app/app.jar
COPY wait-for.sh /wait-for.sh
RUN chmod +x /wait-for.sh && apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*
ENV SERVER_PORT=8082
EXPOSE 8082
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s CMD curl -f http://localhost:${SERVER_PORT}/actuator/health || exit 1
ENTRYPOINT ["/wait-for.sh"]
CMD ["java","-jar","/app/app.jar"]
