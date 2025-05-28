# E-Shop - Modern E-commerce Platform

A modern e-commerce platform built with React, TypeScript, and Ant Design, powered by the DummyJSON API.

## Features

### Product Management
- Browse all products 
- View product details with images, descriptions, and specifications
- Search products with real-time results
- Filter products by category, price range, and rating
- Sort products by price, rating, and newest

### Category Management
- Browse all product categories
- View products by category
- Category-specific product listings
- Visual category cards with images

### Shopping Cart
- Add products to cart
- Update product quantities
- Remove products from cart
- View cart summary
- Persistent cart data using localStorage
- Real-time cart total calculation

### User Interface
- Responsive design for all screen sizes
- Modern and clean UI using Ant Design
- Loading states and skeletons
- Error handling and user feedback
- Smooth navigation and transitions

### Navigation
- Home page with featured products
- Category browsing
- Product search
- Contact page
- Cart drawer

## Tech Stack

- **Frontend Framework**: React 19.1.0 with TypeScript 5.8.3
- **Build Tool**: Vite 6.3.5
- **UI Library**: Ant Design 5.25.3
- **State Management**: React Context API
- **Routing**: React Router v7.6.1
- **HTTP Client**: Axios 1.9.0
- **API**: DummyJSON API

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd reactjs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:5173
   ```

## Project Structure

```
src/
├── components/         # Reusable UI components
├── context/           # React Context providers
├── pages/             # Page components
├── routes/            # Route configurations
├── services/          # API services
├── types/             # TypeScript type definitions
├── App.tsx           # Root component
└── main.tsx          # Entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

## API Integration

The project uses the DummyJSON API for product data. Key endpoints:

- Products: `https://dummyjson.com/products`
- Categories: `https://dummyjson.com/products/categories`
- Product by ID: `https://dummyjson.com/products/{id}`
- Products by Category: `https://dummyjson.com/products/category/{category}`
- Search Products: `https://dummyjson.com/products/search?q={query}`

## 👤 Author

Tech Prastish - [github.com/officialtpss](https://github.com/officialtpss)  

Contact: info@tech-prastish.com

## License

This is a sample project intended for learning and demo purposes only.

## Acknowledgments

- [DummyJSON](https://dummyjson.com/) for providing the API
- [Ant Design](https://ant.design/) for the UI components
- [React](https://reactjs.org/) for the frontend framework
- [Vite](https://vitejs.dev/) for the build tool
