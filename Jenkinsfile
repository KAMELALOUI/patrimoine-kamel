node{
    stage('Clone From Github'){
        
    git branch: 'main', credentialsId: 'Gitlab', url: 'git@github.com:KAMELALOUI/patrimoine-kamel.git'
    }
    stage('Docker clean'){
        sh 'docker rm -f gatway || true'
        sh 'docker rm -f articles-services || true'
        sh 'docker rm -f site-patrimonial || true'
        sh 'docker rm -f media || true'
        sh 'docker rm -f mapping-service || true'
        sh 'docker rm -f frontend || true'
        sh 'docker rm -f discovery || true'
        
        
        sh 'docker rmi -f pfee_app-mapping-service || true'
        sh 'docker rmi -f pfee_app-gatway || true'
        sh 'docker rmi pfee_app-articles-services || true'
        sh 'docker rmi pfee_app-site-patrimonial || true'
        sh 'docker rmi pfee_app-media || true'
        sh 'docker rmi pfee_app-frontend || true'
    }
      stage('Docker up'){
        sh 'docker-compose up -d'
    }
            stage('Tag Docker Images') {
                withDockerRegistry([credentialsId: "DockerHub", url: ""]) {
                    sh '''
                            docker tag pfee_app-discovery:latest kamelaloui/pfee_app-discovery:latest
                            docker tag pfee_app-articles-service:latest kamelaloui/pfee_app-articles-service:latest
                            docker tag pfee_app-media-service:latest kamelaloui/pfee_app-media-service:latest
                            docker tag pfee_app-mapping-service:latest kamelaloui/pfee_app-mapping-service:latest
                            docker tag pfee_app-frontend:latest kamelaloui/pfee_app-frontend:latest
                            docker tag pfee_app-auth-service:latest kamelaloui/pfee_app-auth-service:latest  
                            docker tag pfee_app-site-service:latest kamelalouipfee_app-site-service:latest  
                            pfee_app-gateway                       latest                  38eb729ec8a3   2 hours ago    408MB


                     
                        '''
                    }}
         stage('Push Docker Images to dockerhub') {
                withDockerRegistry([credentialsId: "DockerHub", url: ""]) {
                    sh '''
                            docker push kamelaloui/pfee_app-discovery:latest
                            docker push kamelaloui/pfee_app-articles-service:latest
                            docker push kamelaloui/pfee_app-media-service:latest
                            docker push kamelaloui/pfee_app-mapping-service:latest
                            docker push kamelaloui/pfee_app-articles-service:latest
                            docker push kamelaloui/pfee_app-frontend:latest
                            docker push kamelaloui/pfee_app-site-patrimonial:latest  
                     
                        '''
                    }
         }
  

    

}
