# Utiliser une image officielle OpenJDK comme image de base
#FROM openjdk:17-jdk-slim
FROM maven:3.8.5-openjdk-17-slim AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier JAR de l'application dans le conteneur
# Assurez-vous que le chemin cible correspond à votre projet Spring Boot
#COPY target/media-0.0.1-SNAPSHOT.jar app.jar
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/media-*.jar ./media.jar

# Exposer le port utilisé par l'application
EXPOSE 8086

# Définir les variables d'environnement pour l'application (si nécessaire)
# ENV SPRING_PROFILES_ACTIVE=prod

# Exécuter le fichier JAR
#ENTRYPOINT ["java", "-jar", "app.jar"]
ENTRYPOINT ["java", "-jar", "media.jar"]





