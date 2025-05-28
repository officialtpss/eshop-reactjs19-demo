import React, { useEffect, useState } from 'react';
import { Layout, Typography, Row, Col, Carousel, Skeleton } from 'antd';
import { CategoryCarousel } from '../components/CategoryCarousel';
import { ProductCard } from '../components/ProductCard';
import { productService } from '../services/api';
import type { Product, Category } from '../types';

const { Content } = Layout;
const { Title } = Typography;

export const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [bestSellingProducts, setBestSellingProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          productService.getCategories(),
          productService.getAllProducts({ sortBy: 'rating' })
        ]);

        setCategories(categoriesResponse.data);
        // Get top 8 products by rating
        setBestSellingProducts(productsResponse.data.slice(0, 8));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Content style={{ padding: '24px' }}>
      {/* Hero Banner */}
      <Carousel autoplay style={{ marginBottom: 48 }}>
        <div>
          <div style={{ 
            height: '400px', 
            background: 'linear-gradient(45deg, #1890ff, #722ed1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '2em'
          }}>
            Welcome to E-Shop
          </div>
        </div>
        <div>
          <div style={{ 
            height: '400px', 
            background: 'linear-gradient(45deg, #52c41a, #1890ff)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '2em'
          }}>
            Discover Amazing Products
          </div>
        </div>
      </Carousel>

      {/* Categories */}
      {loading ? (
        <Skeleton active paragraph={{ rows: 4 }} />
      ) : (
        <CategoryCarousel categories={categories} />
      )}

      {/* Best Selling Products */}
      <div style={{ marginTop: 48 }}>
        <Title level={3}>Best Selling Products</Title>
        {loading ? (
          <Row gutter={[24, 24]}>
            {[1, 2, 3, 4].map((i) => (
              <Col xs={24} sm={12} md={8} lg={6} key={i}>
                <Skeleton active avatar paragraph={{ rows: 4 }} />
              </Col>
            ))}
          </Row>
        ) : (
          <Row gutter={[24, 24]}>
            {bestSellingProducts.map((product) => (
              <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Content>
  );
}; 