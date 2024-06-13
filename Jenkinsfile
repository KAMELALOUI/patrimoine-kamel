pipeline {
    agent any
    environment {
        DOCKER_CREDENTIAL_ID = 'docker' // Your Jenkins credential ID for DockerHub
        DOCKER_IMAGE = 'kamelaloui/gateway'
        DOCKER_TAG = '4.0'
        DOCKER_REGISTRY = 'https://index.docker.io/v1/' // DockerHub registry URL
        SSH_CREDENTIAL_ID = 'ssh' // Your Jenkins SSH credential ID
        SSH_SERVER = '44.196.235.9'               // Your server's address
        SSH_USER = 'root'    
        MAVEN_HOME = 'Maven 3.6.3' // Ensure to define the Maven tool in Jenkins
        NEXUS_CREDENTIALS = credentials('nexus') // Replace with the ID of the Nexus credentials in Jenkins
        NEXUS_URL = 'http://44.196.235.9:8081/service/rest/repository/browse/maven-central/'
    }
    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: 'main']], userRemoteConfigs: [[url: 'https://github.com/KAMELALOUI/pfe-kamel-aloui.git']]])
            }
        }

        
        // stage('SonarQube Code Analysis') {
        //     steps {
        //         nexusPolicyEvaluation(
        //                         iqApplication: 'SampApp',
        //                         iqInstanceId: 'MyIQServer1',
        //                         iqStage: 'build'
        //         )
        //     }   
        // }
        stage('Build project') {

            steps {
                script {
                    docker.image('maven:3.9.7').inside('-u root') {
                        sh 'ls'
                        sh 'cd gatway && mvn clean compile -Dmaven.test.skip'
                    }
                } 
            }
        }
        stage('Publish to Nexus') {
            steps {
                script {
                docker.image('maven:3.9.7').inside('-u root') {
                    def nexusRepo = "-DaltDeploymentRepository=nexus-releases::default::${NEXUS_URL}"
                    def nexusCreds = "-DnexusUsername=${NEXUS_CREDENTIALS_USR} -DnexusPassword=${NEXUS_CREDENTIALS_PSW}"
                    sh 'cd gatway && mvn deploy -DaltDeploymentRepository=nexus::default::http://44.196.235.9:8081/repository/maven-snapshots/ -DnexusUsername=admin -DnexusPassword=nexus -DskipTests -Dmaven.install.skip=true'                 }
                }
            }
        }
    

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
        stage('Deploy to Server') {
            steps {
                script {
                    // Use SSH Agent to provide credentials
                    sshagent(credentials: [env.SSH_CREDENTIAL_ID]) {
                        sh """
                            ssh -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_SERVER} << EOF
                            cd /home/ubuntu/project/pfe-kamel-aloui
                            docker-compose up -d 
                            
                        """
                    }
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
