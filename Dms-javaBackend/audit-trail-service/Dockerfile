FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# 1️⃣ Root pom copy (VERY IMPORTANT)
COPY pom.xml .

# 2️⃣ Required modules copy (dependencies ke liye)
COPY discovery-server discovery-server
COPY api-gateway api-gateway
COPY auth-service auth-service
COPY document-initiation-service document-initiation-service
COPY subscription-panel subscription-panel

# 3️⃣ Target service
COPY audit-trail-service audit-trail-service

# 4️⃣ Sirf audit-trail-service build karo
RUN mvn -pl audit-trail-service -am -DskipTests package

# ================= RUNTIME =================
FROM eclipse-temurin:17-jre
WORKDIR /app

COPY --from=build /app/audit-trail-service/target/*.jar app.jar
COPY wait-for.sh /wait-for.sh

RUN chmod +x /wait-for.sh \
 && apt-get update \
 && apt-get install -y netcat-openbsd \
 && rm -rf /var/lib/apt/lists/*

EXPOSE 8083
ENTRYPOINT ["/wait-for.sh"]
CMD ["java","-jar","/app/app.jar"]


