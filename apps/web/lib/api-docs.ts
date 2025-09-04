/**
 * API Documentation Schema for Dubhe Website
 * OpenAPI 3.0 compliant documentation
 */

export const apiDocumentation = {
  openapi: '3.0.0',
  info: {
    title: 'Dubhe Website API',
    version: '1.0.0',
    description: 'API documentation for the Dubhe blockchain project website',
    contact: {
      name: 'Dubhe Foundation',
      email: 'contact@dubhe.network',
      url: 'https://dubhe.obelisk.build'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  servers: [
    {
      url: 'https://dubhe.obelisk.build/api',
      description: 'Production API server'
    },
    {
      url: 'http://localhost:3001/api',
      description: 'Development API server'
    }
  ],
  paths: {
    '/contact': {
      post: {
        tags: ['Contact'],
        summary: 'Submit contact form',
        description: 'Submit a contact form message to the Dubhe team',
        operationId: 'submitContactForm',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ContactRequest'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Message sent successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ContactResponse'
                }
              }
            }
          },
          '400': {
            description: 'Invalid input data',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          },
          '429': {
            description: 'Too many requests',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RateLimitResponse'
                }
              }
            }
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          }
        },
        security: []
      }
    },
    '/error': {
      post: {
        tags: ['Error Reporting'],
        summary: 'Report client-side error',
        description: 'Report JavaScript errors and exceptions from the client',
        operationId: 'reportError',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorReportRequest'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Error report received successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true
                    },
                    message: {
                      type: 'string',
                      example: 'Error report received'
                    }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Invalid error report data',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          }
        },
        security: []
      }
    }
  },
  components: {
    schemas: {
      ContactRequest: {
        type: 'object',
        required: ['name', 'email', 'type', 'message'],
        properties: {
          name: {
            type: 'string',
            minLength: 2,
            maxLength: 100,
            description: 'Full name of the person contacting',
            example: 'John Doe'
          },
          email: {
            type: 'string',
            format: 'email',
            maxLength: 254,
            description: 'Valid email address for response',
            example: 'john@example.com'
          },
          type: {
            type: 'string',
            enum: ['general', 'partnership', 'grant', 'technical', 'media'],
            description: 'Type of inquiry',
            example: 'general'
          },
          message: {
            type: 'string',
            minLength: 10,
            maxLength: 5000,
            description: 'The message content',
            example: 'I am interested in learning more about the Dubhe project and how I can contribute to the ecosystem.'
          }
        }
      },
      ContactResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true
          },
          message: {
            type: 'string',
            example: 'Email sent successfully'
          },
          id: {
            type: 'string',
            description: 'Email service message ID',
            example: '550e8400-e29b-41d4-a716-446655440000'
          }
        }
      },
      ErrorReportRequest: {
        type: 'object',
        required: ['error', 'timestamp'],
        properties: {
          error: {
            type: 'string',
            maxLength: 2000,
            description: 'Error message',
            example: 'TypeError: Cannot read property of undefined'
          },
          stack: {
            type: 'string',
            maxLength: 5000,
            description: 'Stack trace',
            example: 'TypeError: Cannot read property of undefined\n  at Component.render (main.js:123:45)'
          },
          url: {
            type: 'string',
            format: 'uri',
            maxLength: 500,
            description: 'URL where error occurred',
            example: 'https://dubhe.obelisk.build/grants'
          },
          userAgent: {
            type: 'string',
            maxLength: 500,
            description: 'Browser user agent',
            example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          timestamp: {
            type: 'string',
            format: 'date-time',
            description: 'When the error occurred',
            example: '2024-01-15T10:30:00Z'
          },
          userId: {
            type: 'string',
            maxLength: 100,
            description: 'User identifier (if available)',
            example: 'user_123'
          },
          sessionId: {
            type: 'string',
            maxLength: 100,
            description: 'Session identifier',
            example: 'sess_abc123'
          }
        }
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false
          },
          error: {
            type: 'string',
            description: 'Error message',
            example: 'Invalid input data'
          },
          details: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'Detailed validation errors',
            example: ['Name is required', 'Invalid email format']
          }
        }
      },
      RateLimitResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false
          },
          error: {
            type: 'string',
            example: 'Too many requests. Please try again later.'
          },
          retryAfter: {
            type: 'number',
            description: 'Seconds to wait before retrying',
            example: 900
          }
        }
      }
    },
    securitySchemes: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'X-API-Key',
        description: 'API key for authentication (if required for future endpoints)'
      }
    }
  },
  tags: [
    {
      name: 'Contact',
      description: 'Contact form submission endpoints'
    },
    {
      name: 'Error Reporting',
      description: 'Client-side error reporting endpoints'
    }
  ],
  externalDocs: {
    description: 'Find more info about Dubhe',
    url: 'https://dubhe.mintlify.app'
  }
}

/**
 * Generate OpenAPI documentation as JSON
 */
export function getOpenApiSpec(): object {
  return apiDocumentation
}

/**
 * Generate Swagger UI HTML
 */
export function generateSwaggerUI(): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dubhe API Documentation</title>
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5.10.3/swagger-ui.css" />
  <link rel="icon" type="image/png" href="/favicon.ico" />
  <style>
    html {
      box-sizing: border-box;
      overflow: -moz-scrollbars-vertical;
      overflow-y: scroll;
    }
    *, *:before, *:after {
      box-sizing: inherit;
    }
    body {
      margin:0;
      background: #fafafa;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }
    .swagger-ui .topbar {
      background-color: #1e293b;
      border-bottom: 1px solid #334155;
    }
    .swagger-ui .topbar .download-url-wrapper .select-label {
      color: #f1f5f9;
    }
    .swagger-ui .topbar .download-url-wrapper input[type=text] {
      border: 1px solid #475569;
      background: #334155;
      color: #f1f5f9;
    }
    .swagger-ui .info {
      margin: 50px 0;
    }
    .swagger-ui .info .title {
      color: #1e293b;
      font-size: 2.5rem;
      font-weight: 700;
    }
    .swagger-ui .info .description {
      color: #475569;
      font-size: 1.125rem;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.10.3/swagger-ui-bundle.js"></script>
  <script src="https://unpkg.com/swagger-ui-dist@5.10.3/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = function() {
      const ui = SwaggerUIBundle({
        url: '/api/docs/openapi.json',
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout",
        validatorUrl: null,
        tryItOutEnabled: true,
        supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
        docExpansion: 'list',
        filter: true,
        showExtensions: true,
        showCommonExtensions: true,
        displayOperationId: false,
        displayRequestDuration: true,
        defaultModelsExpandDepth: 2,
        defaultModelExpandDepth: 2,
        requestInterceptor: function(request) {
          // Add any custom headers or authentication here
          return request;
        },
        responseInterceptor: function(response) {
          // Handle responses here if needed
          return response;
        }
      });
      
      // Custom styling
      ui.getConfigs().onComplete = function() {
        // Add custom logo or branding
        const topbar = document.querySelector('.topbar');
        if (topbar) {
          const logo = document.createElement('div');
          logo.innerHTML = '<a href="/" style="color: #f1f5f9; text-decoration: none; font-weight: 700; font-size: 1.5rem;">← Dubhe</a>';
          logo.style.cssText = 'position: absolute; left: 20px; top: 50%; transform: translateY(-50%);';
          topbar.style.position = 'relative';
          topbar.appendChild(logo);
        }
      };
    };
  </script>
</body>
</html>`
}

/**
 * API endpoint patterns and their documentation
 */
export const apiEndpoints = {
  '/api/contact': {
    methods: ['POST'],
    description: 'Submit contact form messages',
    rateLimit: '100 requests per 15 minutes per IP',
    authentication: 'None required',
    cors: 'Enabled for allowed origins'
  },
  '/api/error': {
    methods: ['POST'],
    description: 'Report client-side errors',
    rateLimit: '100 requests per 15 minutes per IP', 
    authentication: 'None required',
    cors: 'Enabled for allowed origins'
  },
  '/monitoring': {
    methods: ['GET'],
    description: 'Health check endpoint',
    rateLimit: 'None',
    authentication: 'None required',
    cors: 'Enabled'
  }
}