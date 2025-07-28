# Service Booking App

A full-stack service booking application built with Laravel 12 (Backend) and React + Vite (Frontend).

## 🚀 Project Overview

This application allows users to book various services online. It features a modern, responsive design with a robust backend API and an intuitive frontend interface.

## 🛠️ Tech Stack

### Backend
- **Laravel 12** - PHP framework for robust API development
- **MySQL** - Database management
- **Laravel Sanctum** - API authentication
- **Eloquent ORM** - Database operations

### Frontend
- **React 18** - Modern JavaScript library for UI
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API communication

## 📁 Project Structure

```
service_booking_app/
├── backend/                 # Laravel 12 API
│   ├── app/
│   ├── config/
│   ├── database/
│   ├── routes/
│   └── ...
├── frontend/               # React + Vite application
│   ├── src/
│   ├── public/
│   └── ...
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL 8.0+
- Git

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Copy environment file:
   ```bash
   cp .env.example .env
   ```

4. Generate application key:
   ```bash
   php artisan key:generate
   ```

5. Configure database in `.env` file:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=service_booking_db
   DB_USERNAME=root
   DB_PASSWORD=
   ```

6. Run migrations:
   ```bash
   php artisan migrate
   ```

7. Start the Laravel development server:
   ```bash
   php artisan serve
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 📋 Features (Planned)

- [ ] User authentication and authorization
- [ ] Service listing and search
- [ ] Booking management
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Real-time notifications
- [ ] Review and rating system
- [ ] Service provider management

## 🔧 Development Workflow

1. **Backend Development**: API endpoints, database models, and business logic
2. **Frontend Development**: User interface, state management, and API integration
3. **Testing**: Unit tests, integration tests, and end-to-end testing
4. **Deployment**: Production-ready deployment configuration

## 📝 API Documentation

The API documentation will be available at `/api/documentation` when the backend is running.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Masud** - [GitHub Profile](https://github.com/masud29)

## 📞 Support

If you have any questions or need support, please open an issue in the GitHub repository.

---

**Note**: This is a work in progress. Features and documentation will be updated as the project develops. 