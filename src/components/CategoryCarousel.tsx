import React from 'react';
import { Carousel, Card, Typography, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { Category } from '../types';

const { Title } = Typography;

interface CategoryCarouselProps {
  categories: Category[];
}

export const CategoryCarousel: React.FC<CategoryCarouselProps> = ({ categories }) => {
  
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  if (!categories || categories.length === 0) {
    return (
      <div style={{ margin: '24px 0' }}>
        <Title level={3} style={{ marginBottom: 16 }}>
          Categories
        </Title>
        <Empty description="No categories available" />
      </div>
    );
  }

  return (
    <div style={{ margin: '24px 0' }}>
      <Title level={3} style={{ marginBottom: 16 }}>
        Categories
      </Title>
      <Carousel
        slidesToShow={4}
        dots={false}
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
            },
          },
        ]}
      >
        {categories.map((category) => (
          <div key={category.id} style={{ padding: '0 8px' }}>
            <Card
              hoverable
              cover={
                <div style={{ 
                  height: 150, 
                  padding: '16px',
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
              bodyStyle={{ padding: '12px' }}
            >
              <Title level={5} style={{ margin: 0, textAlign: 'center' }}>
                {category.name}
              </Title>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
}; 