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
    dir('mapping-service') {
        sh 'docker build -t pfee_app-mapping-service -f Dockerfile . '
    }
    dir('gatway') {
        sh 'docker build -t pfee_app-gateway -f Dockerfile . '
    }
    dir('articles-services') {
        sh 'docker build -t pfee_app-articles-service -f Dockerfile . '
    }
    dir('site-patrimonial') {
        sh 'docker build -t pfee_app-site-service -f Dockerfile . '
    }
    dir('media') {
        sh 'docker build -t pfee_app-media-service -f Dockerfile . '
    }
    dir('front') {
        sh 'docker build -t pfee_app-frontend -f Dockerfile . '
    }
    dir('auth-service') {
        sh 'docker build -t pfee_app-auth-service -f Dockerfile . '
    }
    dir('discovery') {
        sh 'docker build -t pfee_app-discovery -f Dockerfile . '
    }
}
    
            stage('Tag Docker Images ') {
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
                    }
    
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
        
              stage('k8s clean') {
                 withKubeConfig(credentialsId: 'k8s', serverUrl: 'https://172.31.22.20:6443') {
                     sh '''
                     
                 
                kubectl delete -f discovery/discovery-service.yaml || true
                kubectl delete -f auth-service/auth-service.yaml || true
                kubectl delete -f site-patrimonial/site-service.yaml || true
                kubectl delete -f mapping-service/mapping-service.yaml || true
                kubectl delete -f articles-services/articles-service.yaml || true
                kubectl delete -f media/media-service.yaml || true
                kubectl delete -f gatway/gateway-service.yaml || true
                kubectl delete -f front/frontend-service.yaml || true
                '''
              }}
            stage('k8s') {
                        withKubeConfig(credentialsId: 'k8s', serverUrl: 'https://172.31.22.20:6443') {


                    sh '''


                kubectl apply -f discovery/discovery-service.yaml
                kubectl apply -f auth-service/auth-service.yaml
                kubectl apply -f site-patrimonial/site-service.yaml
                kubectl apply -f mapping-service/mapping-service.yaml
                kubectl apply -f articles-services/articles-service.yaml
                kubectl apply -f media/media-service.yaml
                kubectl apply -f gatway/gateway-service.yaml
                kubectl apply -f front/frontend-service.yaml
'''
                        }
              }

    
            }

        
    


  

    


