export const swaggerDocument = {
  openapi: '3.0.3',
  info: {
    title: 'Furniro API',
    version: '1.0.0',
    description: 'Furniro e-commerce API for product browsing, user authentication, contact submission, and checkout.'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local server'
    }
  ],
  tags: [
    { name: 'Products', description: 'Product browsing and search' },
    { name: 'Auth', description: 'User management (Login and Register)' },
    { name: 'Contact', description: 'Contact form submission' },
    { name: 'Orders', description: 'Order creation and checkout' }
  ],
  paths: {
    '/products': {
      get: {
        tags: ['Products'],
        summary: 'List products',
        description: 'Returns paginated products with filtering, search, and sorting support.',
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
          { name: 'category', in: 'query', schema: { type: 'string', example: 'dining' } },
          { name: 'search', in: 'query', schema: { type: 'string', example: 'chair' } },
          { name: 'minPrice', in: 'query', schema: { type: 'number' } },
          { name: 'maxPrice', in: 'query', schema: { type: 'number' } },
          { name: 'sort', in: 'query', schema: { type: 'string', enum: ['id', 'price', 'name', 'category'], default: 'id' } },
          { name: 'order', in: 'query', schema: { type: 'string', enum: ['ASC', 'DESC'], default: 'ASC' } }
        ],
        responses: {
          '200': {
            description: 'Paginated product list.',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/PaginatedProducts' } } }
          },
          '500': { description: 'Internal server error.' }
        }
      }
    },
    '/products/{identifier}': {
      get: {
        tags: ['Products'],
        summary: 'Find product by ID or Slug',
        parameters: [
          { name: 'identifier', in: 'path', required: true, schema: { type: 'string', example: 'syltherine' } }
        ],
        responses: {
          '200': {
            description: 'Product found.',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Product' } } }
          },
          '404': { description: 'Product not found.' }
        }
      }
    },
    '/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register new user',
        description: 'Creates a new user account in the application.',
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/RegisterInput' } }
          }
        },
        responses: {
          '201': { description: 'User registered successfully.' },
          '400': { description: 'Invalid registration data or email already exists.' }
        }
      }
    },
    '/login': {
      post: {
        tags: ['Auth'],
        summary: 'Authenticate user',
        description: 'Validates credentials and returns a JWT token.',
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/LoginInput' } }
          }
        },
        responses: {
          '200': {
            description: 'Login successful.',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } }
          },
          '401': { description: 'Invalid credentials.' }
        }
      }
    },
    '/contact': {
      post: {
        tags: ['Contact'],
        summary: 'Send contact message (Protected)',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/ContactInput' } }
          }
        },
        responses: {
          '201': { description: 'Message sent successfully.' },
          '401': { description: 'Unauthorized. JWT token required.' }
        }
      }
    },
    '/orders': {
      post: {
        tags: ['Orders'],
        summary: 'Place order / Checkout (Protected)',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/OrderInput' } }
          }
        },
        responses: {
          '201': { description: 'Order placed successfully.' },
          '401': { description: 'Unauthorized. JWT token required.' }
        }
      }
    }
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      PaginatedProducts: {
        type: 'object',
        properties: {
          data: { type: 'array', items: { $ref: '#/components/schemas/Product' } },
          page: { type: 'integer', example: 1 },
          limit: { type: 'integer', example: 10 },
          totalItems: { type: 'integer', example: 8 },
          totalPages: { type: 'integer', example: 1 }
        }
      },
      Product: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          slug: { type: 'string', example: 'syltherine' },
          sku: { type: 'string', example: 'FUR-DIN-001' },
          name: { type: 'string', example: 'Syltherine' },
          category: { type: 'string', example: 'dining' },
          price: { type: 'number', example: 3500000 },
          finalPrice: { type: 'number', example: 2450000 },
          discount: { type: 'number', example: 30 },
          isNew: { type: 'boolean', example: false },
          image: { type: 'string', example: 'prod-1.jpeg' },
          description: { type: 'string', example: 'Stylish cafe chair' }
        }
      },
      RegisterInput: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: { type: 'string', example: 'John Doe' },
          email: { type: 'string', example: 'john@example.com' },
          password: { type: 'string', example: '123456' }
        }
      },
      LoginInput: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', example: 'john@example.com' },
          password: { type: 'string', example: '123456' }
        }
      },
      AuthResponse: {
        type: 'object',
        properties: {
          token: { type: 'string', example: 'eyJhbGciOiJIUzI1Ni...' },
          user: {
            type: 'object',
            properties: {
              id: { type: 'integer', example: 1 },
              name: { type: 'string', example: 'John Doe' },
              email: { type: 'string', example: 'john@example.com' }
            }
          }
        }
      },
      ContactInput: {
        type: 'object',
        required: ['name', 'email'],
        properties: {
          name: { type: 'string', example: 'John Doe' },
          email: { type: 'string', example: 'john@example.com' },
          subject: { type: 'string', example: 'Shipping inquiry' },
          message: { type: 'string', example: 'I would like to know the estimated delivery time.' }
        }
      },
      OrderInput: {
        type: 'object',
        required: ['items', 'paymentMethod', 'zipCode', 'streetAddress', 'city'],
        properties: {
          zipCode: { type: 'string', example: '33134' },
          streetAddress: { type: 'string', example: '400 University Drive' },
          city: { type: 'string', example: 'Coral Gables' },
          paymentMethod: { type: 'string', example: 'direct_bank_transfer' },
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                productId: { type: 'integer', example: 1 },
                quantity: { type: 'integer', example: 2 }
              }
            }
          }
        }
      }
    }
  }
};