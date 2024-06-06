# Utiliser une image officielle OpenJDK comme image de base
FROM openjdk:17-jdk-slim

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier JAR de l'application dans le conteneur
# Assurez-vous que le chemin cible correspond à votre projet Spring Boot
COPY target/media-0.0.1-SNAPSHOT.jar app.jar

# Exposer le port utilisé par l'application
EXPOSE 8086

# Définir les variables d'environnement pour l'application (si nécessaire)
# ENV SPRING_PROFILES_ACTIVE=prod

# Exécuter le fichier JAR
ENTRYPOINT ["java", "-jar", "app.jar"]
