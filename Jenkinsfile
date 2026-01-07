pipeline {
  agent any

  stages {
    stage('Install') {
      steps {
        bat '''
          cd /d "%WORKSPACE%"
          echo WORKSPACE=%CD%
          node -v
          npm -v
          npm ci
          if not exist node_modules\\@playwright\\test (
          echo "@playwright/test not installed!"
          exit /b 1
        )

          dir node_modules\\@playwright
          dir node_modules\\.bin | findstr /i playwright

          px --no-install playwright --version
          

        '''
      }
    }

    stage('Test') {
      steps {
        bat '''
          cd /d "%WORKSPACE%"
          npx --no-install playwright test --reporter=line,html,junit
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
