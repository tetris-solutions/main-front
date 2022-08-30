pipeline {
  agent any
  environment {
    svc_name = 'main-front'
    name_env = '.env.main-front'
    htdocs = "/var/www/html/main-front"
    ssh_key = credentials('tetris-oracle.key')
    ssh_ip = credentials("${env.DEPLOY_TO}")
    tetris_github_user = credentials('tetris_github_user')
    tetris_github_pass = credentials('tetris_github_pass')
    production_env = credentials('production.env')
    dev_env = credentials('dev.env')
  }
  stages {
    stage('Provision') {
      steps {
        script {
          if (env.TETRIS_ENV == 'dev') {
            sh "cp ${env.dev_env} ${env.name_env}"
          } else {
            sh "cp ${env.production_env} ${env.name_env}"
          }
        }

        sh "chmod 644 ${env.name_env}"
      }
    }
    stage('Deploy') {
      steps {
        sh "cp ${env.ssh_key} tetris-oracle.key"
        sh "chmod 600 tetris-oracle.key"
        sh "scp -i tetris-oracle.key -o StrictHostKeyChecking=no ${env.name_env} opc@${env.ssh_ip}:/var/www/full/${env.name_env}"
        sh "ssh -i tetris-oracle.key -o StrictHostKeyChecking=no -t opc@${env.ssh_ip} 'sudo mv /var/www/full/${env.name_env} ${htdocs}/.env'"
        sh "ssh -i tetris-oracle.key -o StrictHostKeyChecking=no -t opc@${env.ssh_ip} 'cd ${env.htdocs} && sudo MY_GIT_USER=${env.tetris_github_user} MY_GIT_PASS=${env.tetris_github_pass} GIT_ASKPASS=/root/.git-askpass git fetch --all'"
        sh "ssh -i tetris-oracle.key -o StrictHostKeyChecking=no -t opc@${env.ssh_ip} 'cd ${env.htdocs} && sudo MY_GIT_USER=${env.tetris_github_user} MY_GIT_PASS=${env.tetris_github_pass} GIT_ASKPASS=/root/.git-askpass git checkout ${env.BRANCH}'"
        sh "ssh -i tetris-oracle.key -o StrictHostKeyChecking=no -t opc@${env.ssh_ip} 'sudo su -c \"cd ${htdocs}; ./docker.sh restart\"'"
      }
    }
  }
  post {
    failure {
      slackSend channel: '#ops',
        color: 'RED',
        message: "Oops! ${currentBuild.fullDisplayName} failed to build for ${env.TETRIS_ENV}: ${env.BUILD_URL}"
    }
    success {
      slackSend channel: '#ops',
        color: 'good',
        message: "THIS JUST IN... ${currentBuild.fullDisplayName} built for ${env.TETRIS_ENV}, deployed to ${env.DEPLOY_TO}: ${env.BUILD_URL}"
    }
    always {
      echo 'The End'
      deleteDir()
    }
  }
}
