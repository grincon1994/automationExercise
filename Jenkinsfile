pipeline {
  agent any

  stages {
    stage('Install') {
      steps {
        bat '''
          cd /d %WORKSPACE%
          node -v
          npm -v
          npm ci
          npx playwright install
        '''
      }
    }

    stage('Test') {
      steps {
        bat '''
          cd /d %WORKSPACE%
          npx playwright test
        '''
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
      archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
    }
  }
}
