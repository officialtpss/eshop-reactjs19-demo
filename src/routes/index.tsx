import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const { Content } = Layout;

// Lazy load pages
const HomePage = React.lazy(() => import('../pages/HomePage').then(module => ({ default: module.HomePage })));
const ProductListingPage = React.lazy(() => import('../pages/ProductListingPage').then(module => ({ default: module.ProductListingPage })));
const ProductDetailPage = React.lazy(() => import('../pages/ProductDetailPage').then(module => ({ default: module.ProductDetailPage })));
const ContactPage = React.lazy(() => import('../pages/ContactPage').then(module => ({ default: module.ContactPage })));
const CategoriesPage = React.lazy(() => import('../pages/CategoriesPage').then(module => ({ default: module.CategoriesPage })));
const SearchResultsPage = React.lazy(() => import('../pages/SearchResultsPage').then(module => ({ default: module.SearchResultsPage })));

const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '400px' 
  }}>
    <Spin size="large" />
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Content>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/category/:category" element={<ProductListingPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="*" element={<div style={{ padding: '24px', textAlign: 'center' }}>Page not found</div>} />
          </Routes>
        </Suspense>
      </Content>
      <Footer />
    </Layout>
  );
}; 