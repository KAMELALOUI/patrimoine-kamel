pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: 'main']], userRemoteConfigs: [[url: 'https://github.com/KAMELALOUI/pfe-kamel-aloui.git']]])
            }
        }

        stage('Test Cases') {

            steps {
                script {
                    docker.image('maven:3.9.7').inside('-u root') {
                        sh 'ls'
                        sh 'cd gatway && mvn clean compile -Dmaven.test.skip'
                    }
                } 
            }
        }
        stage('Build docker image') {
            steps {
                 script {
                    docker.image('docker:latest').inside('-u root') {
                        sh 'cd gatway && docker build -t kamelaloui/discovery:3.0 .'
                    }
                 }    
            }
        }
        stage('Push docker image') {
            steps {
                sh 'sudo su && docker login -u kamelaloui -p 08365039Kamel@@'
                sh 'push  kamelaloui/discovery:3.0 .'
            }
        }
    }
}
