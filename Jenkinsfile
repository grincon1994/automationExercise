pipeline {
  agent any

  stages {
    stage('Install') {
      steps {
        bat '''

          cd /d %WORKSPACE%

          echo ===== Installing dependencies =====
          npm ci

          echo ===== Installing Playwright browsers =====
          npx playwright install 
        '''
      }
    }

    stage('Test') {
      steps {
        bat '''
          cd /d %WORKSPACE%
          npm run test:ci
        '''
      }
    }
  }

  post {
    always {
      bat '''

      cd /d %WORKSPACE%
      echo ===== Workspace contents =====
      dir
      echo ===== test-results =====
      if exist test-results dir test-results
      echo ===== playwright-report =====
      if exist playwright-report dir playwright-report
    '''
      junit allowEmptyResults: true, testResults: 'test-results/**/*.xml'

      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyResults: true
      archiveArtifacts artifacts: 'test-results/**', allowEmptyResults: true
    }
  }
}
