import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { MailOutlined, UserOutlined } from '@ant-design/icons';

const { TextArea } = Input;

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const ContactForm: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: ContactFormData) => {
    try {
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', values);
      message.success('Thank you for your message! We will get back to you soon.');
      form.resetFields();
    } catch {
      message.error('Something went wrong. Please try again later.');
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{ maxWidth: 600, margin: '0 auto' }}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please enter your name' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Your name" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Please enter your email' },
          { type: 'email', message: 'Please enter a valid email' },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="Your email" />
      </Form.Item>

      <Form.Item
        name="message"
        label="Message"
        rules={[{ required: true, message: 'Please enter your message' }]}
      >
        <TextArea
          placeholder="Your message"
          rows={4}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Send Message
        </Button>
      </Form.Item>
    </Form>
  );
}; 