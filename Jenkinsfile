pipeline {
    agent any
    
    options {
        // Keep builds for 30 days
        buildDiscarder(logRotator(daysToKeepStr: '30', numToKeepStr: '50'))
        // Timeout after 1 hour
        timeout(time: 1, unit: 'HOURS')
        // Skip default checkout
        skipDefaultCheckout()
    }
    
    environment {
        // Set CI environment variable
        CI = 'true'
        // Docker image name
        DOCKER_IMAGE = 'favbet-ui-tests'
        // Allure results directory
        ALLURE_RESULTS_DIR = 'allure-results'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                script {
                    docker.build("${DOCKER_IMAGE}:${env.BUILD_NUMBER}")
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                echo 'Running Playwright tests in Docker...'
                script {
                    try {
                        sh """
                            docker run --rm \
                                -v \${WORKSPACE}/test-results:/app/test-results \
                                -v \${WORKSPACE}/allure-results:/app/allure-results \
                                -v \${WORKSPACE}/playwright-report:/app/playwright-report \
                                -v \${WORKSPACE}/results:/app/results \
                                ${DOCKER_IMAGE}:${env.BUILD_NUMBER}
                        """
                    } catch (Exception e) {
                        echo "Tests failed, but continuing to collect results..."
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }
        
        stage('Collect Results') {
            parallel {
                stage('Publish Test Results') {
                    steps {
                        echo 'Publishing test results...'
                        script {
                            // Publish JUnit results
                            if (fileExists('results/ui.xml')) {
                                publishTestResults testResultsPattern: 'results/ui.xml'
                            }
                            
                            // Archive HTML reports
                            if (fileExists('playwright-report')) {
                                publishHTML([
                                    allowMissing: false,
                                    alwaysLinkToLastBuild: true,
                                    keepAll: true,
                                    reportDir: 'playwright-report',
                                    reportFiles: 'index.html',
                                    reportName: 'Playwright HTML Report'
                                ])
                            }
                        }
                    }
                }
                
                stage('Generate Allure Report') {
                    steps {
                        echo 'Generating Allure report...'
                        script {
                            if (fileExists(ALLURE_RESULTS_DIR)) {
                                allure([
                                    includeProperties: false,
                                    jdk: '',
                                    properties: [],
                                    reportBuildPolicy: 'ALWAYS',
                                    results: [[path: ALLURE_RESULTS_DIR]]
                                ])
                            } else {
                                echo 'No Allure results found'
                            }
                        }
                    }
                }
            }
        }
        
        stage('Archive Artifacts') {
            steps {
                echo 'Archiving test artifacts...'
                script {
                    // Archive test artifacts
                    archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
                    archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
                    archiveArtifacts artifacts: 'results/**/*', allowEmptyArchive: true
                    archiveArtifacts artifacts: 'allure-results/**/*', allowEmptyArchive: true
                }
            }
        }
    }
    
    post {
        always {
            echo 'Cleaning up...'
            script {
                // Clean up Docker images
                sh """
                    docker rmi ${DOCKER_IMAGE}:${env.BUILD_NUMBER} || true
                    docker system prune -f || true
                """
            }
        }
        
        success {
            echo 'Pipeline completed successfully!'
            script {
                // Send success notification (customize as needed)
                emailext (
                    subject: "✅ Tests PASSED - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                    body: """
                        <h2>Test Results: SUCCESS</h2>
                        <p><strong>Job:</strong> ${env.JOB_NAME}</p>
                        <p><strong>Build:</strong> #${env.BUILD_NUMBER}</p>
                        <p><strong>Status:</strong> All tests passed</p>
                        <p><strong>Duration:</strong> ${currentBuild.durationString}</p>
                        <p><a href="${env.BUILD_URL}">View Build Details</a></p>
                        <p><a href="${env.BUILD_URL}allure/">View Allure Report</a></p>
                    """,
                    mimeType: 'text/html',
                    to: '${DEFAULT_RECIPIENTS}'
                )
            }
        }
        
        failure {
            echo 'Pipeline failed!'
            script {
                // Send failure notification (customize as needed)
                emailext (
                    subject: "❌ Tests FAILED - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                    body: """
                        <h2>Test Results: FAILURE</h2>
                        <p><strong>Job:</strong> ${env.JOB_NAME}</p>
                        <p><strong>Build:</strong> #${env.BUILD_NUMBER}</p>
                        <p><strong>Status:</strong> Pipeline failed</p>
                        <p><strong>Duration:</strong> ${currentBuild.durationString}</p>
                        <p><a href="${env.BUILD_URL}">View Build Details</a></p>
                        <p><a href="${env.BUILD_URL}console">View Console Output</a></p>
                    """,
                    mimeType: 'text/html',
                    to: '${DEFAULT_RECIPIENTS}'
                )
            }
        }
        
        unstable {
            echo 'Pipeline completed with test failures!'
            script {
                // Send unstable notification (customize as needed)
                emailext (
                    subject: "⚠️ Tests UNSTABLE - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                    body: """
                        <h2>Test Results: UNSTABLE</h2>
                        <p><strong>Job:</strong> ${env.JOB_NAME}</p>
                        <p><strong>Build:</strong> #${env.BUILD_NUMBER}</p>
                        <p><strong>Status:</strong> Some tests failed</p>
                        <p><strong>Duration:</strong> ${currentBuild.durationString}</p>
                        <p><a href="${env.BUILD_URL}">View Build Details</a></p>
                        <p><a href="${env.BUILD_URL}allure/">View Allure Report</a></p>
                    """,
                    mimeType: 'text/html',
                    to: '${DEFAULT_RECIPIENTS}'
                )
            }
        }
    }
}
