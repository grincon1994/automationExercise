pipeline {
  agent any

  stages {
    stage('Install') {
      steps {
        bat '''
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
      bat '''
      echo ===== Workspace contents =====
      dir
      echo ===== test-results =====
      if exist test-results dir test-results
      echo ===== playwright-report =====
      if exist playwright-report dir playwright-report
    '''
      junit 'test-results/junit.xml'
      
      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: false
      archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: false
    }
  }
}
