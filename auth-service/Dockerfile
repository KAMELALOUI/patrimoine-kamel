FROM maven:3.8.5-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/spring-boot-security-jwt-*.jar ./auth-service.jar
EXPOSE 8088
ENTRYPOINT ["java", "-jar", "auth-service.jar"]
