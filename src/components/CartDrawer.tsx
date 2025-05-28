import React from 'react';
import { Drawer, Button, InputNumber, Empty, Typography, Space, Divider } from 'antd';
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from '../context/CartContext';

const { Title, Text } = Typography;

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  return (
    <Drawer
      title="Shopping Cart"
      placement="right"
      onClose={onClose}
      open={open}
      width={400}
      extra={
        items.length > 0 && (
          <Button type="link" onClick={clearCart} danger>
            Clear Cart
          </Button>
        )
      }
    >
      {items.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Your cart is empty"
          style={{ marginTop: 60 }}
        />
      ) : (
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          {items.map((item) => (
            <div key={item.id} style={{ display: 'flex', gap: '12px' }}>
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: 80,
                  height: 80,
                  objectFit: 'contain',
                  backgroundColor: '#f5f5f5',
                  padding: 8,
                  borderRadius: 4,
                }}
              />
              <div style={{ flex: 1 }}>
                <Text strong style={{ display: 'block', marginBottom: 4 }}>
                  {item.title}
                </Text>
                <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
                  ${item.price.toFixed(2)}
                </Text>
                <Space>
                  <InputNumber
                    min={1}
                    value={item.quantity}
                    onChange={(value) => updateQuantity(item.id, value || 1)}
                    size="small"
                  />
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removeFromCart(item.id)}
                  />
                </Space>
              </div>
            </div>
          ))}
          <Divider />
          <div style={{ textAlign: 'right' }}>
            <Title level={4}>Total: ${totalPrice.toFixed(2)}</Title>
            <Button type="primary" block icon={<ShoppingCartOutlined />}>
              Checkout
            </Button>
          </div>
        </Space>
      )}
    </Drawer>
  );
}; 