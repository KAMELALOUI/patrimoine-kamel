# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the application's jar file into the container
COPY target/gateway-0.0.1-SNAPSHOT.jar app.jar

# Make port 8222 available to the world outside this container
EXPOSE 8222

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]
