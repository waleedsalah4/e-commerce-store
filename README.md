# 🛒 E-commerce Assessment Project

An e-commerce application built with TypeScript and Vite, featuring simulated authentication and cart management using localStorage.

## 🚀 Features

### 🔐 Authentication System (Simulated with localStorage)

- **User Registration** - Create new user accounts with validation
- **User Login** - Secure credential verification
- **User Logout** - Clear user session
- **Session Persistence** - User stays logged in after browser refresh
- **Form Validation** - Email format, password strength, unique usernames
- **Error Handling** - User-friendly error messages and toast notifications

> **Note**: This project simulates a real authentication system using localStorage for educational/assessment purposes. In a production environment, authentication would be handled by a secure backend server.

### 🛍️ Shopping Cart Management

- **User-Specific Carts** - Each authenticated user has their own cart
- **Cart Persistence** - Cart items saved between sessions
- **Quantity Management** - Add, remove, and update item quantities
- **Cart Analytics** - Real-time totals and item counts
- **Guest Restriction** - Only logged-in users can add items to cart
- **Cart Operations** - Clear cart, reorder items (drag & drop ready)

### 📱 Application Pages

- **🏠 Home Page** - Product showcase and navigation
- **ℹ️ About Page** - Information about the store
- **📦 Product Details** - Detailed product information and specifications
- **🛒 Cart Page** - View and manage cart items
- **🔑 Login Page** - User authentication
- **📝 Register Page** - New user account creation

### 🎨 User Experience

- **Responsive Design** - Works on desktop and mobile devices
- **Loading States** - Visual feedback during operations
- **Toast Notifications** - Success and error messages
- **Form Validation** - Real-time input validation
- **Protected Routes** - Cart functionality requires authentication

## 🛠️ Technical Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState, useEffect)
- **Data Storage**: localStorage (simulating backend)
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

## 🐛 Known Limitations

- **No Backend**: Authentication and data storage are simulated with localStorage
- **Basic Security**: No encryption or advanced security measures
- **Single Device**: Data doesn't sync across devices

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 20.0 or higher)
- **npm** package manager
- **Git** (for cloning the repository)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/waleedsalah4/e-commerce-store
cd e-commerce-store
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

### 3. Start the Development Server

Using npm:

```bash
npm run dev

```

### 4. Open in Browser

The application will be available at:

```
http://localhost:5173
```

## 📚 How to Use

### Registration Process

1. Navigate to the **Register** page
2. Fill in all required fields:
   - First Name
   - Last Name
   - Username (minimum 3 characters)
   - Email (valid format required)
   - Password (minimum 6 characters)
   - Address (optional)
3. Click **Register** to create your account
4. You'll be automatically logged in after successful registration

### Login Process

1. Go to the **Login** page
2. Enter your registered email and password
3. Click **Login** to access your account
4. Your previous cart items will be restored if any exist

### Shopping Experience

1. Browse products on the **Home** page
2. Click on products to view **Product Details**
3. **Add items to cart** (requires login)
4. Manage your cart on the **Cart** page
5. Adjust quantities or remove items as needed

## 🗃️ Data Storage Structure

The application uses localStorage to simulate a backend database:

```
localStorage Structure:
├── "users"           → Array of all registered users
├── "currentUser"     → Currently logged-in user data
└── "cart_${userId}"  → Individual user's cart data
```

## 🔒 Security Notes

- **Password Storage**: In this simulation, passwords are stored in plain text in localStorage. In a real application, passwords would be hashed and stored securely on the server.
- **Data Validation**: Client-side validation is implemented, but server-side validation would be essential in production.
- **Session Management**: Real applications would use secure tokens (JWT) and server-side session management.

## 🎯 Assessment Features Demonstrated

- ✅ **Component Architecture** - Modular, reusable components
- ✅ **Custom Hooks** - Business logic separation
- ✅ **State Management** - Complex state handling with React hooks
- ✅ **Form Handling** - Controlled components with validation
- ✅ **Local Storage** - Client-side data persistence
- ✅ **TypeScript** - Type safety and better development experience
- ✅ **Error Handling** - Graceful error management
- ✅ **User Experience** - Loading states, notifications, responsive design

---

**Note**: This project demonstrates frontend development skills and simulates backend functionality for assessment purposes. In a production environment, proper backend infrastructure, security measures, and database management would be implemented.
