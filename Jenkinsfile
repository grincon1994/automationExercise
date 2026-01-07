pipeline {
  agent any

  stages {
    stage('Install') {
      steps {
        bat '''
          node -v
          npm -v
          npm ci
          if not exist node_modules\\@playwright\\test (
          echo "@playwright/test not installed!"
          exit /b 1
        )
          npx playwright install
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
