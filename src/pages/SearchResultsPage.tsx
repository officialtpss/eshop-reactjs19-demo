import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout, Row, Col, Typography, Skeleton, Empty } from 'antd';
import { ProductCard } from '../components/ProductCard';
import { productService } from '../services/api';
import type { Product } from '../types';

const { Content } = Layout;
const { Title } = Typography;

export const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const query = searchParams.get('q') || '';

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await productService.searchProducts(query);
        setProducts(response.data);
      } catch (error) {
        console.error('Error searching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) {
    return (
      <Content style={{ padding: '24px' }}>
        <Title level={2}>Search Results</Title>
        <Row gutter={[24, 24]}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Col xs={24} sm={12} md={8} key={i}>
              <Skeleton active avatar paragraph={{ rows: 4 }} />
            </Col>
          ))}
        </Row>
      </Content>
    );
  }

  if (!query) {
    return (
      <Content style={{ padding: '24px' }}>
        <Title level={2}>Search Results</Title>
        <Empty description="Please enter a search term" />
      </Content>
    );
  }

  if (products.length === 0) {
    return (
      <Content style={{ padding: '24px' }}>
        <Title level={2}>Search Results for "{query}"</Title>
        <Empty description="No products found" />
      </Content>
    );
  }

  return (
    <Content style={{ padding: '24px' }}>
      <Title level={2}>Search Results for "{query}"</Title>
      <Row gutter={[24, 24]}>
        {products.map((product) => (
          <Col xs={24} sm={12} md={8} key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Content>
  );
}; 