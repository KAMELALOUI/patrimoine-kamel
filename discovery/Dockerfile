# Use an official OpenJDK runtime as a parent image
#FROM openjdk:17-jdk-alpine

FROM maven:3.8.5-openjdk-17-slim AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the application's jar file into the container
#COPY target/discovery-0.0.1-SNAPSHOT.jar app.jar
COPY --from=build /app/target/discovery-*.jar ./discovery.jar

# Make port 8761 available to the world outside this container
EXPOSE 8761

# Run the jar file
#ENTRYPOINT ["java", "-jar", "app.jar"]
ENTRYPOINT ["java", "-jar", "discovery.jar"]


