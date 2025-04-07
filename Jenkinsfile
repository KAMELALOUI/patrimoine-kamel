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
    
    
}
