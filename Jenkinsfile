node{
    stage('Clone From Github'){
        
    git branch: 'main', credentialsId: 'Gitlab', url: 'git@github.com:KAMELALOUI/patrimoine-kamel.git'
    }
    stage('Docker clean'){
        sh 'docker-compose down'
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
