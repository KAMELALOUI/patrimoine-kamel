# Étape de build Maven
FROM maven:3.8.6-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Étape d'exécution
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/spring-boot-security-jwt-*.jar app.jar
EXPOSE 8088
ENTRYPOINT ["java", "-jar", "app.jar"]
