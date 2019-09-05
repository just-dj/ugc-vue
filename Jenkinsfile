pipeline {
  agent {
    node {
      label 'master'
    }

  }
  stages {
    stage('build') {
      steps {
        bat(script: 'docker build  -t justdj/ugc_vue:latest   .', returnStdout: true, returnStatus: true)
      }
    }
  }
}