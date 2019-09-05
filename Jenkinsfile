pipeline {
  agent {
    node {
      label 'master'
    }

  }
  stages {
    stage('pull') {
      agent {
        node {
          label 'master'
        }

      }
      steps {
        bat(returnStdout: true, script: ' git pull https://github.com/just-dj/ugc-vue.git')
      }
    }
    stage('build') {
      steps {
        bat(script: 'docker build  .', returnStdout: true)
      }
    }
  }
}