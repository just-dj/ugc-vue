pipeline {
  agent {
    node {
      label 'master'
    }

  }
  stages {
    stage('build') {
      steps {
        bat(script: 'docker build  -t test\\/test\\:latest   .', returnStdout: true)
      }
    }
  }
}