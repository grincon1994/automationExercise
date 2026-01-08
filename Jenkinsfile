pipeline {
  agent any

  stages {
    stage('Install') {
      steps {
        bat '''

          echo ===== Installing dependencies =====
          npm ci

          echo ===== Installing Playwright browsers =====
          npx playwright install chromium
        '''
      }
    }

    stage('Test') {
      steps {
        bat '''
          npm run test:ci
        '''
      }
    }
  }

  post {
    always {
      bat '''
      echo ===== Workspace contents =====
      dir
      echo ===== test-results =====
      if exist test-results dir test-results
      echo ===== playwright-report =====
      if exist playwright-report dir playwright-report
    '''
      junit 'test-results/junit.xml'

      archiveArtifacts artifacts: 'playwright-report/**'
      archiveArtifacts artifacts: 'test-results/**'
    }
  }
}
