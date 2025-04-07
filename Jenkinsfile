node{
    stage('Clone From Github'){
        
    git branch: 'main', credentialsId: 'Gitlab', url: 'git@github.com:KAMELALOUI/patrimoine-kamel.git'
    }
    stage('Docker clean'){
        sh 'docker rm -f gatway'
        sh 'docker rm -f articles-services'
        sh 'docker rm -f site-patrimonial'
        sh 'docker rm -f media'
        sh 'docker rm -f mapping-service'
        sh 'docker rm -f frontend'
        
        sh 'docker rm -f patrimoine-kamel-discovery'
        sh 'docker rmi patrimoine-kamel-articles-services'
        sh 'docker rmi patrimoine-kamel-site-patrimonial'
        sh 'docker rmi patrimoine-kamel-mapping-service'
        sh 'docker rmi patrimoine-kamel-frontend'
        sh 'docker rmi patrimoine-kamel-media'
        sh 'docker rmi patrimoine-kamel-gatway'
    }
      stage('Docker up'){
        sh 'docker-compose up --build'
    }
    stage('restart'){
        sh 'docker restart discovery'
        sh 'docker restart frontend'
        sh 'docker restart gatway'
        sh 'docker restart articles-services'
        sh 'docker restart media'
        sh 'docker restart mapping-service'
        sh 'docker restart site-patrimonial'

    
    }
    
}
