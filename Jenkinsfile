pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.48.0-jammy'
      args '--ipc=host'
    }
  }

  options { timestamps() }

  environment {
    CI = 'true'
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Install') {
      steps { sh '''node -v
      npm -v
      npm ci''' }
    }

    stage('Run Playwright Tests') {
      steps { sh 'npm run test:ci' }
      post {
        always {
          junit 'test-results/junit.xml'
          archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true
        }
      }
    }
  }
}
