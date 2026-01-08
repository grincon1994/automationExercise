pipeline {
  agent any

  stages {
    stage('Install') {
      steps {
        bat '''
          cd /d %WORKSPACE%
          set NODE_ENV=development
          set npm_config_production=false
          node -v
          npm -v
          npm ci

          echo ===== Verifying Playwright install =====
          dir node_modules\\@playwright
          
          if not exist node_modules\\@playwright\\test (
          echo "@playwright/test not installed!"
          exit /b 1
        )
          npx playwright install --with-deps
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
