pipeline {
  agent any

  stages {
    stage('Install') {
      steps {
        bat '''
          set NODE_ENV=development
          set npm_config_production=false
          node -v
          npm -v
          npm ci
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
          npm run test:ci
        '''
      }
    }
  }

  stage('Debug') {
      steps {
        bat '''
        cd /d "%WORKSPACE%"
        node -v
        npm -v
        dir
        if exist node_modules\\@playwright\\test (echo "OK: @playwright/test exists") else (echo "MISSING: @playwright/test")
        '''
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
