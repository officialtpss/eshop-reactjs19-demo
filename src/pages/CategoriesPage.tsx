import React, { useEffect, useState } from 'react';
import { Layout, Typography, Row, Col, Card, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { productService } from '../services/api';
import type { Category } from '../types';

const { Content } = Layout;
const { Title } = Typography;

export function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await productService.getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  if (loading) {
    return (
      <Content style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      </Content>
    );
  }

  return (
    <Content style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
      <Title level={2} style={{ marginBottom: '24px' }}>
        All Categories
      </Title>

      <Row gutter={[24, 24]}>
        {categories.map((category) => (
          <Col xs={24} sm={12} md={8} lg={6} key={category.id}>
            <Card
              hoverable
              cover={
                <div style={{ 
                  height: 200, 
                  padding: '24px',
                  backgroundColor: '#f5f5f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img
                    alt={category.name}
                    src={`https://picsum.photos/seed/${category.id}/400/300`}
                    style={{ 
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </div>
              }
              onClick={() => handleCategoryClick(category.id)}
              bodyStyle={{ padding: '16px' }}
            >
              <Title level={4} style={{ margin: 0, textAlign: 'center' }}>
                {category.name}
              </Title>
            </Card>
          </Col>
        ))}
      </Row>
    </Content>
  );
} 