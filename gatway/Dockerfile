# Use an official OpenJDK runtime as a parent image
#FROM openjdk:17-jdk-alpine
FROM maven:3.8.4-jdk-11-slim AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the application's jar file into the container
#COPY target/gateway-0.0.1-SNAPSHOT.jar app.jar

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=build /app/target/gateway-*.jar ./gateway.jar

# Make port 8222 available to the world outside this container
EXPOSE 8222

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]

