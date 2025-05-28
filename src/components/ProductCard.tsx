import React from 'react';
import { Card, Button, Rate, Typography, Space, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';

const { Title, Text } = Typography;

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.thumbnail
    });
    
    message.success(`${product.title} added to cart`);
  };

  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
      <Card
        hoverable
        cover={
          <div style={{ 
            height: 200, 
            padding: '16px',
            backgroundColor: '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img
              alt={product.title}
              src={product.thumbnail}
              style={{ 
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
              }}
            />
          </div>
        }
        bodyStyle={{ padding: '16px' }}
      >
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Title level={5} ellipsis={{ rows: 2 }} style={{ margin: 0, minHeight: '48px' }}>
            {product.title}
          </Title>
          <Text type="secondary" ellipsis>
            {product.brand}
          </Text>
          <Space align="center">
            <Rate disabled defaultValue={product.rating} allowHalf />
            <Text type="secondary">({product.rating})</Text>
          </Space>
          <Space align="baseline">
            <Text strong style={{ fontSize: '1.2em', color: '#1890ff' }}>
              ${product.price.toFixed(2)}
            </Text>
            {product.discountPercentage > 0 && (
              <Text type="secondary" delete>
                ${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
              </Text>
            )}
          </Space>
          <Text type="secondary">Stock: {product.stock}</Text>
          <Button 
            type="primary" 
            icon={<ShoppingCartOutlined />}
            onClick={handleAddToCart}
            block
          >
            Add to Cart
          </Button>
        </Space>
      </Card>
    </Link>
  );
}; 