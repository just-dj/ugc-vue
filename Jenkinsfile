pipeline {
  agent {
    node {
      label 'master'
    }

  }
  stages {
    stage('') {
      steps {
        bat(encoding: 'UTF_8', returnStdout: true, script: 'docker bild -t justdj/ugc_vue:latest')
      }
    }
  }
}