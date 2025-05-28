import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout, Row, Col, Card, Select, Slider, Typography, Space, Skeleton } from 'antd';
import { ProductCard } from '../components/ProductCard';
import { productService } from '../services/api';
import type { Product, ProductFilters } from '../types';

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

export const ProductListingPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ProductFilters>({
    category,
    sortBy: 'newest',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await productService.getAllProducts(filters);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  const handleSortChange = (value: string) => {
    setFilters((prev) => ({ ...prev, sortBy: value as ProductFilters['sortBy'] }));
  };

  const handlePriceRangeChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: value[0],
      maxPrice: value[1],
    }));
  };

  const handleRatingChange = (value: number) => {
    setFilters((prev) => ({ ...prev, minRating: value }));
  };

  return (
    <Content style={{ padding: '24px' }}>
      <Row gutter={[24, 24]}>
        {/* Filters Sidebar */}
        <Col xs={24} md={6}>
          <Card title="Filters">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Text strong>Sort By</Text>
                <Select
                  style={{ width: '100%', marginTop: 8 }}
                  value={filters.sortBy}
                  onChange={handleSortChange}
                >
                  <Option value="newest">Newest</Option>
                  <Option value="price">Price: Low to High</Option>
                  <Option value="rating">Rating: High to Low</Option>
                </Select>
              </div>

              <div>
                <Text strong>Price Range</Text>
                <Slider
                  range
                  min={0}
                  max={2000}
                  defaultValue={[0, 2000]}
                  onChange={handlePriceRangeChange}
                  style={{ marginTop: 8 }}
                />
              </div>

              <div>
                <Text strong>Minimum Rating</Text>
                <Slider
                  min={0}
                  max={5}
                  step={0.5}
                  defaultValue={0}
                  onChange={handleRatingChange}
                  style={{ marginTop: 8 }}
                />
              </div>
            </Space>
          </Card>
        </Col>

        {/* Product Grid */}
        <Col xs={24} md={18}>
          <Title level={3}>
            {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : 'All Products'}
          </Title>
          {loading ? (
            <Row gutter={[24, 24]}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Col xs={24} sm={12} md={8} key={i}>
                  <Skeleton active avatar paragraph={{ rows: 4 }} />
                </Col>
              ))}
            </Row>
          ) : (
            <Row gutter={[24, 24]}>
              {products.map((product) => (
                <Col xs={24} sm={12} md={8} key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Content>
  );
}; 