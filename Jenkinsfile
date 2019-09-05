pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile'
    }

  }
  stages {
    stage('error') {
      agent {
        node {
          label 'master'
        }

      }
      steps {
        bat(encoding: 'UTF_8', returnStdout: true, script: 'docker bild -t justdj/ugc_vue:latest', returnStatus: true)
      }
    }
  }
}