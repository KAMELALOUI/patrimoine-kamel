pipeline {
    agent any
    environment {
        DOCKER_CREDENTIAL_ID = 'docker' // Your Jenkins credential ID for DockerHub
        DOCKER_IMAGE = 'kamelaloui/gatway'
        DOCKER_TAG = '4.0'
        DOCKER_REGISTRY = 'https://index.docker.io/v1/' // DockerHub registry URL
    }
    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: 'main']], userRemoteConfigs: [[url: 'https://github.com/KAMELALOUI/pfe-kamel-aloui.git']]])
            }
        }

        // stage('Test Cases') {

        //     steps {
        //         script {
        //             docker.image('maven:3.9.7').inside('-u root') {
        //                 sh 'ls'
        //                 sh 'cd gatway && mvn clean compile -Dmaven.test.skip'
        //             }
        //         } 
        //     }
        // }
        stage('Build docker image') {
            steps {
                 script {
                    docker.build("${env.DOCKER_IMAGE}:${env.DOCKER_TAG}", 'gatway/')

                 }    
            }
        }
       stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry("${env.DOCKER_REGISTRY}", "${env.DOCKER_CREDENTIAL_ID}") {
                        docker.image("${env.DOCKER_IMAGE}:${env.DOCKER_TAG}").push()
                    }
                }
            }
        }
    }
}
