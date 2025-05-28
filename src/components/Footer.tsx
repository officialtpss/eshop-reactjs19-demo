import React from 'react';
import { Layout, Row, Col, Typography, Space } from 'antd';
import { Link } from 'react-router-dom';

const { Footer: AntFooter } = Layout;
const { Title, Text } = Typography;

export const Footer: React.FC = () => {
  const footerLinks = [
    {
      title: 'Shop',
      links: [
        { label: 'All Products', to: '/', key: 'all-products' },
        { label: 'Categories', to: '/categories', key: 'categories' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact Us', to: '/contact', key: 'contact' },
        { label: 'Shipping Info', to: '/contact', key: 'shipping' },
        { label: 'Returns', to: '/contact', key: 'returns' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', to: '/contact', key: 'about' },
        { label: 'Privacy Policy', to: '/contact', key: 'privacy' },
        { label: 'Terms of Service', to: '/contact', key: 'terms' },
      ],
    },
  ];

  return (
    <AntFooter style={{ 
      background: '#f0f2f5',
      padding: '48px 24px',
      marginTop: 'auto'
    }}>
      <Row gutter={[48, 48]}>
        {footerLinks.map((section) => (
          <Col xs={24} sm={8} key={section.title}>
            <Title level={5}>{section.title}</Title>
            <Space direction="vertical">
              {section.links.map((link) => (
                <Link key={link.key} to={link.to}>
                  <Text>{link.label}</Text>
                </Link>
              ))}
            </Space>
          </Col>
        ))}
      </Row>
      <Row justify="center" style={{ marginTop: 48 }}>
        <Col>
          <Text type="secondary">
            © {new Date().getFullYear()} E-Shop. All rights reserved.
          </Text>
        </Col>
      </Row>
    </AntFooter>
  );
}; 