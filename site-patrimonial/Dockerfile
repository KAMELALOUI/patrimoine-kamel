# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the application's jar file to the container
COPY target/site-patrimonial-0.0.1-SNAPSHOT.jar app.jar

# Make port 8085 available to the world outside this container
EXPOSE 8085

# Set the environment variables for the application

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]
