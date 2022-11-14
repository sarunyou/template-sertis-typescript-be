swagger: '2.0'
info:
  description: External user entrypoint to Sertis Chat Commerce system
  title: Sertis Chat Commerce User Service
  version: 3.0.0
host: $CLOUD_ENDPOINTS
basePath: /
schemes:
  - https
paths:
  /user/health:
    get:
      summary: Check Health Endpoints
      operationId: user-get-health
      tags:
        - Health
      responses:
        '200':
          description: A successful response
          schema:
            $ref: '#/definitions/ResponseHealthCheck'
  /v2/sendbird/token:
    post:
      summary: Login user with token
      tags:
        - Sendbird
      operationId: user-v3-post-login
      parameters:
        - in: body
          name: body
          schema:
            type: object
            required:
              - user_profile
            properties:
              user_profile:
                type: string
      responses:
        '200':
          description: A successful response
          schema:
            $ref: '#/definitions/LoginResponse'
        '400':
          description: Bad request exception
          schema:
            $ref: '#/definitions/HttpException'
  /v2/sendbird/anonymoustoken:
    post:
      summary: Login guest user
      tags:
        - Sendbird
      operationId: user-v3-post-guest-login
      parameters:
        - in: body
          name: body
          schema:
            type: object
            required:
              - user_id
            properties:
              user_id:
                type: string
      responses:
        '200':
          description: A successful response
          schema:
            $ref: '#/definitions/LoginResponse'
        '400':
          description: Bad request exception
          schema:
            $ref: '#/definitions/HttpException'
  /v2/sendbird/device_token:
    post:
      description: Request to add device token to Sendbird
      summary: Add Device Token
      tags:
        - Sendbird
      operationId: user-v3-post-device-token
      parameters:
        - in: body
          name: body
          schema:
            type: object
            required:
              - user_id
              - token
            properties:
              user_id:
                type: string
              token:
                type: object
                properties:
                  type:
                    type: string
                  value:
                    type: string
      responses:
        '200':
          description: A successful response
          schema:
            $ref: '#/definitions/ManageDeviceTokenResponse'
        '400':
          description: Bad request exception
          schema:
            $ref: '#/definitions/HttpException'
    delete:
      description: Request to delete device token from Sendbird
      summary: Delete Device Token
      tags:
        - Sendbird
      operationId: user-v3-delete-device-token
      parameters:
        - in: body
          name: body
          schema:
            type: object
            required:
              - user_id
              - token
            properties:
              user_id:
                type: string
              token:
                type: object
                properties:
                  type:
                    type: string
                  value:
                    type: string
      responses:
        '200':
          description: A successful response
          schema:
            $ref: '#/definitions/ManageDeviceTokenResponse'
        '400':
          description: Bad request exception
          schema:
            $ref: '#/definitions/HttpException'

definitions:
  HttpException:
    properties:
      code:
        description: Error Code
        enum:
          - INTERNAL_ERROR
          - INVALID_USER_DATA
        type: string
      message:
        description: Error message
        type: string
    type: object
  LoginResponse:
    type: object
    properties:
      token:
        type: string
  ManageDeviceTokenResponse:
    type: object
    properties:
      status:
        type: string
        example: success
  ResponseHealthCheck:
    properties:
      timestamp:
        type: number
      cpu:
        type: object
      memory:
        type: object
      resource:
        type: object
    type: object
    example:
      {
        'timestamp': 1646968146005,
        'cpu': { 'user': 20586, 'system': 8234 },
        'memory':
          { 'rss': 31469568, 'heapTotal': 4468736, 'heapUsed': 2631960, 'external': 851977, 'arrayBuffers': 9914 },
        'resource':
          {
            'userCPUTime': 20666,
            'systemCPUTime': 8266,
            'maxRSS': 30732,
            'sharedMemorySize': 0,
            'unsharedDataSize': 0,
            'unsharedStackSize': 0,
            'minorPageFault': 1888,
            'majorPageFault': 0,
            'swappedOut': 0,
            'fsRead': 0,
            'fsWrite': 0,
            'ipcSent': 0,
            'ipcReceived': 0,
            'signalsCount': 0,
            'voluntaryContextSwitches': 22,
            'involuntaryContextSwitches': 2,
          },
      }
