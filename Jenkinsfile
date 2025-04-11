node{
    stage('Clone From Github'){
        
    git branch: 'deploy_avec_kubernetes', credentialsId: 'Gitlab', url: 'git@github.com:KAMELALOUI/patrimoine-kamel.git'
    }
    stage('Docker clean'){
             
        sh 'docker rmi -f pfee_app-mapping-service || true'
        sh 'docker rmi -f pfee_app-gateway || true'
        sh 'docker rmi -f pfee_app-articles-services || true'
        sh 'docker rmi -f pfee_app-site-patrimonial || true'
        sh 'docker rmi -f pfee_app-media || true'
        sh 'docker rmi -f pfee_app-frontend || true'
        sh 'docker rmi -f pfee_app-auth-service || true'
        sh 'docker rmi -f pfee_app-discovery || true'
    }
       stage('Docker Images'){
        sh 'docker build -t pfee_app-mapping-service -f mapping-service/Dockerfile .'
        sh 'docker build -t pfee_app-gateway -f gatway/Dockerfile .'
        sh 'docker build -t pfee_app-articles-services -f articles-services/Dockerfile .'
        sh 'docker build -t pfee_app-site-patrimonial -f site-patrimonial/Dockerfile .'
        sh 'docker build -t pfee_app-media -f media/Dockerfile .'
        sh 'docker build -t pfee_app-frontend -f front/Dockerfile .'
        sh 'docker build -t pfee_app-auth-service -f auth-service/Dockerfile .'
        sh 'docker build -t pfee_app-discovery -f discovery/Dockerfile .'
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
    
         stage('Push Docker Images to dockerhub') {
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
        stage('Push to Nexus') {
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
                    }}
              stage('k8s clean') {
                kubectl delete -f discovery/discovery-service.yaml
                kubectl delete -f auth-service/auth-service.yaml
                kubectl delete -f site-patrimonial/site-service.yaml
                kubectl delete -f mapping-service/mapping-service.yaml
                kubectl delete -f articles-services/articles-service.yaml
                kubectl delete -f media/media-service.yaml
                kubectl delete -f gatway/gateway-service.yaml
                kubectl delete -f front/frontend-service.yaml
              }
            stage('k8s') {
                kubectl apply -f discovery/discovery-service.yaml
                kubectl apply -f auth-service/auth-service.yaml
                kubectl apply -f site-patrimonial/site-service.yaml
                kubectl apply -f mapping-service/mapping-service.yaml
                kubectl apply -f articles-services/articles-service.yaml
                kubectl apply -f media/media-service.yaml
                kubectl apply -f gatway/gateway-service.yaml
                kubectl apply -f front/frontend-service.yaml

                
              }

    
            }

        
    


  

    


