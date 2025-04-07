# Use an official OpenJDK runtime as a parent image
#FROM openjdk:17-jdk-slim
FROM maven:3.8.5-openjdk-17-slim AS build

# Set the working directory in the container
WORKDIR /app

# Copy the application's jar file to the container
#COPY target/mapping-service-0.0.1-SNAPSHOT.jar app.jar

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app

# Make port  available to the world outside this container
EXPOSE 8087

COPY --from=build /app/target/mapping-service-*.jar ./mapping-service.jar

# Run the jar file
#ENTRYPOINT ["java", "-jar", "app.jar"]
ENTRYPOINT ["java", "-jar", "mapping-service.jar"]



