import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'kani-demo',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '1',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    },
    defaultProfile: 'default'
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    region: 'ap-northeast-1',
    profile: '${opt:profile, self:custom.defaultProfile}',
    logRetentionInDays: 7
  },
  functions: {
    s3Func: {
      handler: 'handler.s3Func',
      memorySize: 128,
      timeout: 30,
      events: [
        {
          s3: {
            bucket: 'example-bucket',
            event: 's3:ObjectCreated:*',
            rules: [
              {
                prefix: '*',
                suffix: '*'
              }
            ],
            existing: true,
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;
