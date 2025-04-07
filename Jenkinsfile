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
