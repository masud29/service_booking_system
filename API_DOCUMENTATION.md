# Service Booking App API Documentation

Hey there! 👋 This is the API documentation for my service booking application. I built this using Laravel 12 for the backend with Sanctum authentication.

## Quick Start
- **Base URL**: `http://localhost:8000/api`
- **Authentication**: Uses Bearer tokens (Laravel Sanctum)

To use protected endpoints, add this header:
```
Authorization: Bearer {your_token}
```

## API Endpoints

Here are all the endpoints I've implemented. I've organized them by functionality to make it easier to understand.

### 🔐 Authentication

First, you'll need to register or login to get a token.

#### Register a new account
- **POST** `/register`
- **What it does**: Creates a new customer account
- **Body**:
  ```json
  {
    "name": "Masud Rana",
    "email": "masud@gmail.com", 
    "password": "password123",
    "password_confirmation": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "id": 1,
      "name": "Masud Rana",
      "email": "masud@gmail.com",
      "role": "customer"
    },
    "token": "1|abc123..."
  }
  ```

#### Login to your account
- **POST** `/login`
- **What it does**: Authenticates user and returns a token
- **Body**:
  ```json
  {
    "email": "masud@gmail.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Login successful",
    "user": {
      "id": 1,
      "name": "Masud Rana", 
      "email": "masud@gmail.com",
      "role": "customer"
    },
    "token": "1|abc123..."
  }
  ```

#### Get your profile info
- **GET** `/user`
- **What it does**: Returns current user's information
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
  ```json
  {
    "user": {
      "id": 1,
      "name": "Masud Rana",
      "email": "masud@gmail.com",
      "role": "customer"
    }
  }
  ```

#### Logout
- **POST** `/logout`
- **What it does**: Invalidates your token
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
  ```json
  {
    "message": "Logged out successfuly"
  }
  ```

### 🛠️ Services

These endpoints handle the services that customers can book.

#### View available services
- **GET** `/services`
- **What it does**: Shows all active services
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
  ```json
  {
    "services": [
      {
        "id": 1,
        "name": "Plumbing",
        "description": "Professional plumbing services for your home or office.",
        "price": "50.00",
        "status": true
      }
    ]
  }
  ```

#### 6. Create Service (Admin Only)
- **URL:** `POST /services`
- **Description:** Create a new service
- **Access:** Admin
- **Headers:**
  ```
  Authorization: Bearer {admin_token}
  Content-Type: application/json
  Accept: application/json
  ```
- **Body:**
  ```json
  {
    "name": "Carpentry",
    "description": "Professional carpentry services",
    "price": 60.00,
    "status": true
  }
  ```
- **Response (201):**
  ```json
  {
    "message": "Service created successfully",
    "service": {
      "id": 4,
      "name": "Carpentry",
      "description": "Professional carpentry services",
      "price": "60.00",
      "status": true,
      "created_at": "2025-01-28T10:00:00.000000Z",
      "updated_at": "2025-01-28T10:00:00.000000Z"
    }
  }
  ```

#### 7. Update Service (Admin Only)
- **URL:** `PUT /services/{id}`
- **Description:** Update an existing service
- **Access:** Admin
- **Headers:**
  ```
  Authorization: Bearer {admin_token}
  Content-Type: application/json
  Accept: application/json
  ```
- **Body:**
  ```json
  {
    "name": "Updated Plumbing",
    "price": 55.00
  }
  ```
- **Response (200):**
  ```json
  {
    "message": "Service updated successfully",
    "service": {
      "id": 1,
      "name": "Updated Plumbing",
      "description": "Professional plumbing services for your home or office.",
      "price": "55.00",
      "status": true,
      "updated_at": "2025-01-28T10:00:00.000000Z"
    }
  }
  ```

#### 8. Delete Service (Admin Only)
- **URL:** `DELETE /services/{id}`
- **Description:** Delete a service
- **Access:** Admin
- **Headers:**
  ```
  Authorization: Bearer {admin_token}
  Accept: application/json
  ```
- **Response (200):**
  ```json
  {
    "message": "Service deleted successfully"
  }
  ```

### Booking Endpoints

#### 9. List User Bookings
- **URL:** `GET /bookings`
- **Description:** Get all bookings for the authenticated user
- **Access:** Authenticated
- **Headers:**
  ```
  Authorization: Bearer {token}
  Accept: application/json
  ```
- **Response (200):**
  ```json
  {
    "bookings": [
      {
        "id": 1,
        "user_id": 1,
        "service_id": 1,
        "booking_date": "2025-02-15",
        "status": "pending",
        "created_at": "2025-01-28T10:00:00.000000Z",
        "updated_at": "2025-01-28T10:00:00.000000Z",
        "service": {
          "id": 1,
          "name": "Plumbing",
          "description": "Professional plumbing services for your home or office.",
          "price": "50.00",
          "status": true
        }
      }
    ]
  }
  ```

#### 10. Create Booking
- **URL:** `POST /bookings`
- **Description:** Create a new booking
- **Access:** Authenticated
- **Headers:**
  ```
  Authorization: Bearer {token}
  Content-Type: application/json
  Accept: application/json
  ```
- **Body:**
  ```json
  {
    "service_id": 1,
    "booking_date": "2025-02-15"
  }
  ```
- **Response (201):**
  ```json
  {
    "message": "Booking created successfully",
    "booking": {
      "id": 1,
      "user_id": 1,
      "service_id": 1,
      "booking_date": "2025-02-15",
      "status": "pending",
      "created_at": "2025-01-28T10:00:00.000000Z",
      "updated_at": "2025-01-28T10:00:00.000000Z",
      "service": {
        "id": 1,
        "name": "Plumbing",
        "description": "Professional plumbing services for your home or office.",
        "price": "50.00",
        "status": true
      }
    }
  }
  ```

#### 11. Get Booking Details
- **URL:** `GET /bookings/{id}`
- **Description:** Get details of a specific booking
- **Access:** Authenticated (own bookings only)
- **Headers:**
  ```
  Authorization: Bearer {token}
  Accept: application/json
  ```
- **Response (200):**
  ```json
  {
    "booking": {
      "id": 1,
      "user_id": 1,
      "service_id": 1,
      "booking_date": "2025-02-15",
      "status": "pending",
      "created_at": "2025-01-28T10:00:00.000000Z",
      "updated_at": "2025-01-28T10:00:00.000000Z",
      "service": {
        "id": 1,
        "name": "Plumbing",
        "description": "Professional plumbing services for your home or office.",
        "price": "50.00",
        "status": true
      }
    }
  }
  ```

#### 12. Update Booking
- **URL:** `PUT /bookings/{id}`
- **Description:** Update booking details
- **Access:** Authenticated (own bookings only)
- **Headers:**
  ```
  Authorization: Bearer {token}
  Content-Type: application/json
  Accept: application/json
  ```
- **Body:**
  ```json
  {
    "booking_date": "2025-02-20",
    "status": "confirmed"
  }
  ```
- **Response (200):**
  ```json
  {
    "message": "Booking updated successfully",
    "booking": {
      "id": 1,
      "user_id": 1,
      "service_id": 1,
      "booking_date": "2025-02-20",
      "status": "confirmed",
      "updated_at": "2025-01-28T10:00:00.000000Z",
      "service": {
        "id": 1,
        "name": "Plumbing",
        "description": "Professional plumbing services for your home or office.",
        "price": "50.00",
        "status": true
      }
    }
  }
  ```

#### 13. Cancel Booking
- **URL:** `DELETE /bookings/{id}`
- **Description:** Cancel a booking
- **Access:** Authenticated (own bookings only)
- **Headers:**
  ```
  Authorization: Bearer {token}
  Accept: application/json
  ```
- **Response (200):**
  ```json
  {
    "message": "Booking cancelled successfully"
  }
  ```

### 👨‍💼 Admin Features

These are admin-only endpoints for managing the system.

#### View all bookings (Admin only)
- **GET** `/admin/bookings`
- **What it does**: Shows all bookings from all users
- **Headers**: `Authorization: Bearer {admin_token}`
- **Response**:
  ```json
  {
    "bookings": [
      {
        "id": 1,
        "user_id": 1,
        "service_id": 1,
        "booking_date": "2025-02-15",
        "status": "pending",
        "user": {
          "id": 1,
          "name": "John Doe",
          "email": "john@example.com",
          "role": "customer"
        },
        "service": {
          "id": 1,
          "name": "Plumbing",
          "description": "Professional plumbing services for your home or office.",
          "price": "50.00",
          "status": true
        }
      }
    ]
  }
  ```

#### View all services (Admin only)
- **GET** `/admin/services`
- **What it does**: Shows all services including inactive ones
- **Headers**: `Authorization: Bearer {admin_token}`
- **Response**:
  ```json
  {
    "services": [
      {
        "id": 1,
        "name": "Plumbing",
        "description": "Professional plumbing services for your home or office.",
        "price": "50.00",
        "status": true
      }
    ]
  }
  ```

## Error Responses

### Validation Errors (422)
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "email": [
      "The email field is required."
    ],
    "password": [
      "The password field is required."
    ]
  }
}
```

### Authentication Error (401)
```json
{
  "message": "Unauthenticated."
}
```

### Authorization Error (403)
```json
{
  "message": "Unauthorized. Admin access required."
}
```

### Not Found Error (404)
```json
{
  "message": "No query results for model [App\\Models\\Service] 1"
}
```

## 🧪 Testing the API

I've included a Postman collection file that you can import to test all the endpoints easily.

### Quick Test Setup:
1. Import the `Service_Booking_API.postman_collection.json` file
2. Set the base URL to `http://localhost:8000/api`
3. Use the login endpoints to get your tokens
4. Start testing! 🚀

### Test Credentials:
- **Admin Account**: 
  - Email: `admin@qtec.com`
  - Password: `password123`

- **Sample Services** (already seeded):
  - Plumbing (50.00)
  - Electrical (75.00) 
  - Cleaning (40.00)

## 📊 Response Status Codes

- **200** - Everything worked! ✅
- **201** - Successfully created something new
- **401** - You need to login first
- **403** - You don't have permission for this
- **404** - The resource wasn't found
- **422** - There's an issue with your data
- **500** - Something went wrong on the server

## 🛠️ What I Built

This is a full-stack service booking application I developed for my portfolio. Here's what I implemented:

- **Backend**: Laravel 12 with Sanctum authentication
- **Database**: MySQL with proper relationships
- **API**: RESTful endpoints with validation
- **Security**: Role-based access control
- **Testing**: Comprehensive API documentation

I focused on clean code, proper validation, and user-friendly error messages. The admin can manage services and view all bookings, while customers can book services and manage their appointments.

Feel free to test it out and let me know if you have any questions! 

**- Masud Rana** 