pipeline {
  agent any

  stages {
    stage('Install') {
      steps {
        bat '''

          cd /d %WORKSPACE%

          echo ===== Installing Playwright browsers =====
          npx playwright install --with-deps

          echo ===== Installing dependencies =====
          npm ci

          echo ===== Playwright Version =====
          npx playwright --version

          

          echo ===== Verify browsers folder =====
          dir "%USERPROFILE%\\AppData\\Local\\ms-playwright" || echo "ms-playwright folder not found yet"
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
      junit testResults: 'test-results/**/*.xml'

      archiveArtifacts artifacts: 'playwright-report/**'
      archiveArtifacts artifacts: 'test-results/**'
    }
  }
}
