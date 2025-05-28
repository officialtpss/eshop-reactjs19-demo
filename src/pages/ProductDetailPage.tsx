import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout, Typography, Space, Rate, Button, InputNumber, message, Skeleton } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { productService } from '../services/api';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';

const { Content } = Layout;
const { Title, Text } = Typography;

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const response = await productService.getProductById(parseInt(id));
          setProduct(response.data);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        message.error('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.thumbnail
      });
      message.success(`${product.title} added to cart`);
    }
  };

  if (loading) {
    return (
      <Content style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
        <Skeleton active />
      </Content>
    );
  }

  if (!product) {
    return (
      <Content style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
        <Title level={2}>Product not found</Title>
      </Content>
    );
  }

  return (
    <Content style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px' }}>
          <div style={{ 
            backgroundColor: '#f5f5f5',
            padding: '24px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '400px'
          }}>
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
              }}
            />
          </div>
        </div>
        <div style={{ flex: '1 1 400px' }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Title level={2}>{product.title}</Title>
              <Text type="secondary">{product.brand}</Text>
            </div>
            <Space align="center">
              <Rate disabled defaultValue={product.rating} allowHalf />
              <Text type="secondary">({product.rating})</Text>
            </Space>
            <Space direction="vertical" size="small">
              <Space align="baseline">
                <Text strong style={{ fontSize: '1.5em', color: '#1890ff' }}>
                  ${product.price.toFixed(2)}
                </Text>
                {product.discountPercentage > 0 && (
                  <Text type="secondary" delete>
                    ${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
                  </Text>
                )}
              </Space>
              <Text type="secondary">Stock: {product.stock}</Text>
            </Space>
            <div>
              <Title level={4}>Description</Title>
              <Text>{product.description}</Text>
            </div>
            <Space>
              <InputNumber
                min={1}
                max={product.stock}
                value={quantity}
                onChange={(value) => setQuantity(value || 1)}
                style={{ width: '100px' }}
              />
              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                onClick={handleAddToCart}
                size="large"
              >
                Add to Cart
              </Button>
            </Space>
          </Space>
        </div>
      </div>
    </Content>
  );
} 