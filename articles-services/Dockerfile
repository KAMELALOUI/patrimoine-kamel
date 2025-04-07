# Use an official OpenJDK runtime as a parent image
#FROM openjdk:17-jdk-slim
FROM maven:3.8.6-openjdk-17 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the application's jar file to the container
#COPY target/articles-services-0.0.1-SNAPSHOT.jar app.jar
COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=build /app/target/articles-services-*.jar ./articles-services.jar

# Make port  available to the world outside this container
EXPOSE 8084

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]
