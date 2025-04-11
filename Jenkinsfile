node{
    stage('Clone From Github'){
        
    git branch: 'main', credentialsId: 'Gitlab', url: 'git@github.com:KAMELALOUI/patrimoine-kamel.git'
    }
    stage('Docker clean'){
        sh 'docker rm -f gateway || true'
        sh 'docker rm -f articles-service || true'
        sh 'docker rm -f site-service || true'
        sh 'docker rm -f media-service || true'
        sh 'docker rm -f mapping-service || true'
        sh 'docker rm -f frontend || true'
        sh 'docker rm -f discovery || true'
        sh 'docker rm -f auth-service || true'
        
        
        sh 'docker rmi -f pfee_app-mapping-service || true'
        sh 'docker rmi -f pfee_app-gateway || true'
        sh 'docker rmi -f pfee_app-articles-services || true'
        sh 'docker rmi -f pfee_app-site-patrimonial || true'
        sh 'docker rmi -f pfee_app-media || true'
        sh 'docker rmi -f pfee_app-frontend || true'
        sh 'docker rmi -f pfee_app-auth-service || true'
        sh 'docker rmi -f pfee_app-discovery || true'
    }
       stage('Docker up'){
        sh 'docker-compose up -d'
    }
            stage('Tag Docker Images ') {
                withDockerRegistry([credentialsId: "DockerHub", url: ""]) {
                    sh '''
                            docker tag pfee_app-discovery:latest kamelaloui/pfee_app-discovery:latest
                            docker tag pfee_app-articles-service:latest kamelaloui/pfee_app-articles-service:latest
                            docker tag pfee_app-media-service:latest kamelaloui/pfee_app-media-service:latest
                            docker tag pfee_app-mapping-service:latest kamelaloui/pfee_app-mapping-service:latest
                            docker tag pfee_app-frontend:latest kamelaloui/pfee_app-frontend:latest
                            docker tag pfee_app-auth-service:latest kamelaloui/pfee_app-auth-service:latest  
                            docker tag pfee_app-site-service:latest kamelaloui/pfee_app-site-service:latest  
                            docker tag pfee_app-gateway:latest kamelaloui/pfee_app-gateway:latest  
                     
                        '''
                    }}
    
         stage('Dockerhub') {
                withDockerRegistry([credentialsId: "DockerHub", url: ""]) {
                    sh '''
                            docker push kamelaloui/pfee_app-discovery:latest
                            docker push kamelaloui/pfee_app-articles-service:latest
                            docker push kamelaloui/pfee_app-media-service:latest
                            docker push kamelaloui/pfee_app-mapping-service:latest
                            docker push kamelaloui/pfee_app-frontend:latest
                            docker push kamelaloui/pfee_app-auth-service:latest  
                            docker push kamelaloui/pfee_app-site-service:latest  
                            docker push kamelaloui/pfee_app-gateway:latest
                     
                        '''
                    }
         }
        stage('Nexus') {
                    withDockerRegistry([credentialsId: "Nexus", url: "http://51.21.219.120:8090/"]) {
                        sh '''

                            docker tag pfee_app-discovery:latest 51.21.219.120:8090/pfee_app-discovery:latest
                            docker tag pfee_app-articles-service:latest 51.21.219.120:8090/pfee_app-articles-service:latest
                            docker tag pfee_app-media-service:latest 51.21.219.120:8090/pfee_app-media-service:latest
                            docker tag pfee_app-mapping-service:latest 51.21.219.120:8090/pfee_app-mapping-service:latest
                            docker tag pfee_app-frontend:latest 51.21.219.120:8090/pfee_app-frontend:latest
                            docker tag pfee_app-auth-service:latest 51.21.219.120:8090/pfee_app-auth-service:latest  
                            docker tag pfee_app-site-service:latest 51.21.219.120:8090/pfee_app-site-service:latest  
                            docker tag pfee_app-gateway:latest 51.21.219.120:8090/pfee_app-gateway:latest  

                            docker push 51.21.219.120:8090/pfee_app-discovery:latest
                            docker push 51.21.219.120:8090/pfee_app-articles-service:latest
                            docker push 51.21.219.120:8090/pfee_app-media-service:latest
                            docker push 51.21.219.120:8090/pfee_app-mapping-service:latest
                            docker push 51.21.219.120:8090/pfee_app-frontend:latest
                            docker push 51.21.219.120:8090/pfee_app-auth-service:latest  
                            docker push 51.21.219.120:8090/pfee_app-site-service:latest  
                            docker push 51.21.219.120:8090/pfee_app-gateway:latest
                           
                        '''
                    }
            }

        }
    


  

    


