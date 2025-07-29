# Development Workflow

This document outlines the development workflow for the Service Booking App.

## 🚀 Development Setup

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL 8.0+
- Git

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/masud29/service_booking_system.git
   cd service_booking_system
   ```

2. **Backend Setup (Laravel)**
   ```bash
   cd backend
   composer install
   cp .env.example .env
   php artisan key:generate
   # Configure database in .env file
   php artisan migrate
   php artisan serve
   ```
### DATABASE
download sql file and import it into phpmyadmin.
3. **Frontend Setup (React)**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 📋 Development Workflow

### 1. Feature Development

1. **Create a new branch**
   ```bash
   git checkout -b feature/feature-name
   ```

2. **Develop the feature**
   - Backend: Create API endpoints, models, migrations
   - Frontend: Create components, pages, state management

3. **Test your changes**
   ```bash
   # Backend tests
   cd backend
   php artisan test

   # Frontend tests (when configured)
   cd frontend
   npm test
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add feature description"
   ```

5. **Push to remote**
   ```bash
   git push origin feature/feature-name
   ```

6. **Create Pull Request**
   - Go to GitHub repository
   - Create a new Pull Request
   - Add description of changes
   - Request review if needed

### 2. Commit Message Convention

Use conventional commit messages:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Example:
```
feat: add user authentication system
fix: resolve booking date validation issue
docs: update API documentation
```

### Backend (Laravel)

1. **API Design**
   - Use RESTful conventions
   - Implement proper HTTP status codes
   - Add API documentation

2. **Database**
   - Use migrations for schema changes
   - Follow naming conventions
   - Add proper indexes

3. **Security**
   - Validate all inputs
   - Use Laravel Sanctum for authentication
   - Implement proper authorization

### Frontend (React)

1. **Component Structure**
   - Use functional components with hooks
   - Follow component naming conventions
   - Implement proper prop validation

2. **State Management**
   - Use React Context for global state
   - Keep components focused and reusable
   - Implement proper error handling

3. **Styling**
   - Maintain consistent design system
   - Ensure responsive design

## 🧪 Testing Strategy

### Backend Testing
- Unit tests for models and services
- Feature tests for API endpoints
- Database testing with factories

### Frontend Testing
- Component testing with React Testing Library
- Integration tests for user flows
- E2E tests for critical paths

## 📦 Deployment

### Development Environment
- Local development with XAMPP
- Hot reload for frontend development
- Database seeding for testing

### Production Environment
- Secure environment configuration
- Database backups
- Monitoring and logging

## 🔧 Useful Commands

### Backend Commands
```bash
# Create new model with migration
php artisan make:model ModelName -m

# Create new controller
php artisan make:controller ControllerName

# Run migrations
php artisan migrate

# Rollback migrations
php artisan migrate:rollback

# Seed database
php artisan db:seed

# Clear cache
php artisan cache:clear
```

### Frontend Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

## 📚 Resources

- [Laravel Documentation](https://laravel.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [GitHub Flow](https://guides.github.com/introduction/flow/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📞 Support

For questions or issues:
1. Check existing issues on GitHub
2. Create a new issue with detailed description
3. Contact the development team

---

**Last updated**: January 2025 