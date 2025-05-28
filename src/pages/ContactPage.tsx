import React from 'react';
import { Layout, Row, Col, Typography, Card, Space } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { ContactForm } from '../components/ContactForm';

const { Content } = Layout;
const { Title, Text } = Typography;

export const ContactPage: React.FC = () => {
  const contactInfo = [
    {
      icon: <MailOutlined style={{ fontSize: '24px' }} />,
      title: 'Email',
      content: 'support@eshop.com',
    },
    {
      icon: <PhoneOutlined style={{ fontSize: '24px' }} />,
      title: 'Phone',
      content: '+1 (555) 123-4567',
    },
    {
      icon: <EnvironmentOutlined style={{ fontSize: '24px' }} />,
      title: 'Address',
      content: '123 E-Shop Street, Digital City, 12345',
    },
  ];

  return (
    <Content style={{ padding: '24px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 48 }}>
        Contact Us
      </Title>

      <Row gutter={[48, 48]}>
        <Col xs={24} md={12}>
          <Card>
            <Title level={4}>Get in Touch</Title>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {contactInfo.map((info) => (
                <div key={info.title}>
                  <Space>
                    {info.icon}
                    <div>
                      <Text strong>{info.title}</Text>
                      <br />
                      <Text>{info.content}</Text>
                    </div>
                  </Space>
                </div>
              ))}
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card>
            <Title level={4}>Send us a Message</Title>
            <ContactForm />
          </Card>
        </Col>
      </Row>
    </Content>
  );
}; 