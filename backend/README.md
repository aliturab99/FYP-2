# MedMagic Backend API

A robust Node.js/Express backend API for the MedMagic medical store application.

## Features

- 🏥 **Product Management** - CRUD operations for medical products
- 🏷️ **Category Management** - Dynamic category system
- 👑 **Admin Dashboard** - Administrative controls and analytics
- 💬 **Chat API** - Basic chatbot functionality
- 🔒 **Security** - Rate limiting, CORS, validation
- 📊 **Analytics** - Product and category statistics
- 🗄️ **MongoDB** - Database integration with Mongoose

## Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/medmagic
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your_super_secret_jwt_key_here
ADMIN_EMAILS=syedyawaraliturab@gmail.com,admin@medmagic.com
```

### 3. Start the Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Products API (`/api/products`)
- `GET /` - Get all products (with filters, search, pagination)
- `GET /:id` - Get single product
- `POST /` - Create new product
- `PUT /:id` - Update product
- `DELETE /:id` - Delete product
- `GET /category/:categoryId` - Get products by category
- `GET /featured` - Get featured products

### Categories API (`/api/categories`)
- `GET /` - Get all categories
- `GET /:id` - Get single category
- `POST /` - Create new category
- `PUT /:id` - Update category
- `DELETE /:id` - Delete category
- `POST /seed` - Seed default categories
- `PUT /:id/toggle` - Toggle category status

### Admin API (`/api/admin`)
- `GET /stats` - Get dashboard statistics
- `GET /users` - Get user statistics
- `GET /products` - Get all products (admin view)
- `PUT /products/:id/toggle` - Toggle product status
- `PUT /products/:id/feature` - Toggle featured status
- `DELETE /products/bulk` - Bulk delete products
- `GET /analytics` - Get detailed analytics

### Chat API (`/api/chat`)
- `POST /` - Send chat message
- `GET /health` - Chat service health check
- `POST /feedback` - Submit chat feedback

### Health Check
- `GET /health` - Server health check

## Request Examples

### Create Product
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Digital Thermometer",
    "price": 25.99,
    "image": "/thermometer.jpg",
    "link": "https://buy.stripe.com/...",
    "category": "devices",
    "description": "Accurate digital thermometer"
  }'
```

### Get Products with Filters
```bash
curl "http://localhost:5000/api/products?category=medications&sort=price&order=asc&limit=10"
```

### Create Category
```bash
curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "id": "vitamins",
    "name": "Vitamins & Supplements",
    "icon": "💊",
    "description": "Essential vitamins and supplements",
    "order": 7
  }'
```

### Admin Stats (requires admin header)
```bash
curl -H "x-admin-email: syedyawaraliturab@gmail.com" \
  http://localhost:5000/api/admin/stats
```

## Database Schema

### Product Schema
```javascript
{
  name: String (required),
  price: Number (required),
  image: String (required),
  link: String (required),
  category: String (required),
  description: String,
  inStock: Boolean (default: true),
  featured: Boolean (default: false),
  views: Number (default: 0),
  isActive: Boolean (default: true),
  timestamps: true
}
```

### Category Schema
```javascript
{
  id: String (required, unique),
  name: String (required),
  description: String,
  icon: String (default: '📦'),
  isActive: Boolean (default: true),
  order: Number (default: 0),
  productCount: Number (default: 0),
  timestamps: true
}
```

## Security Features

- **Rate Limiting** - 100 requests per 15 minutes per IP
- **CORS** - Configured for frontend domain
- **Helmet** - Security headers
- **Input Validation** - Express-validator middleware
- **Admin Protection** - Admin email verification

## Frontend Integration

### Update Frontend API Calls

Change your frontend API calls from:
```javascript
// Old (Next.js API routes)
fetch('/api/products')

// New (Express backend)
fetch('http://localhost:5000/api/products')
```

### Environment Variables for Frontend
Add to your frontend `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Then use in your frontend:
```javascript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
fetch(`${API_URL}/api/products`)
```

## Deployment

### Production Setup
1. Set `NODE_ENV=production`
2. Use a production MongoDB database
3. Set secure JWT secret
4. Configure proper CORS origins
5. Use process manager like PM2

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## Development Tips

### Seeding Data
```bash
curl -X POST http://localhost:5000/api/categories/seed
```

### Monitoring
- Server logs with Morgan
- Error tracking with custom middleware
- Health check endpoint for monitoring

### Testing
```bash
# Test server health
curl http://localhost:5000/health

# Test API endpoints
curl http://localhost:5000/api/products
curl http://localhost:5000/api/categories
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check MongoDB is running
   - Verify MONGODB_URI in .env

2. **CORS Errors**
   - Update FRONTEND_URL in .env
   - Check origin in CORS config

3. **Port Already in Use**
   - Change PORT in .env
   - Kill existing process: `lsof -ti:5000 | xargs kill`

### Logs
Check server logs for detailed error information. All errors are logged with timestamps and stack traces in development mode.

## Contributing

1. Follow existing code structure
2. Add validation for new endpoints
3. Update this README for new features
4. Test all endpoints before committing

## Support

For issues or questions about the backend API, check the logs or create an issue in the project repository.
