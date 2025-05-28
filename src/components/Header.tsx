import React, { useState } from 'react';
import { Layout, Menu, Button, Space, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { CartDrawer } from './CartDrawer';
import { useCart } from '../context/CartContext';

const { Header: AntHeader } = Layout;

export function Header() {
  const location = useLocation();
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();

  const menuItems = [
    {
      key: '/',
      label: <Link to="/">Home</Link>,
    },
    {
      key: '/categories',
      label: <Link to="/categories">Categories</Link>,
    },
    {
      key: '/contact',
      label: <Link to="/contact">Contact</Link>,
    },
  ];

  return (
    <>
      <AntHeader style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 1, 
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        height: '64px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Link to="/" style={{ marginRight: 8 }}>
            <h1 style={{ margin: 0, fontSize: '1.5em' }}>E-Shop</h1>
          </Link>
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            style={{ 
              border: 'none',
              lineHeight: '64px',
              display: 'flex',
              alignItems: 'center'
            }}
          />
        </div>
        <Space size="large" style={{ display: 'flex', alignItems: 'center' }}>
          <SearchBar style={{ width: 300, margin: 0 }} />
          <Badge count={totalItems} size="small" offset={[-2, 2]}>
            <Button 
              type="text" 
              icon={<ShoppingCartOutlined style={{ fontSize: '1.5em' }} />}
              onClick={() => setCartOpen(true)}
              style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '40px',
                width: '40px'
              }}
            />
          </Badge>
        </Space>
      </AntHeader>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
} 