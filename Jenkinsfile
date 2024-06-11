pipeline {
    agent any
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
                    // docker.image('docker:latest').inside('-u root') {
                    //     sh 'cd gatway && docker build -t kamelaloui/gatway:3.0 .'
                    // }
                     docker.build('kamelaloui/discovery:3.0', 'gatway/')
                 }    
            }
        }
        stage('Push docker image') {
            steps {
       stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry("https://index.docker.io/v1/", "08365039Kamel@@
") {
                        docker.image("kamelaloui/discovery:3.0}").push()
                    }
                }
            }
        } .'
            }
        }
    }
}
