import React, { useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

interface SearchBarProps {
  onSearch?: (value: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search products...',
  style,
}) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue) {
      navigate(`/search?q=${encodeURIComponent(trimmedValue)}`);
      onSearch?.(trimmedValue);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <Search
      placeholder={placeholder}
      allowClear
      enterButton={<SearchOutlined />}
      size="large"
      value={searchValue}
      onChange={handleChange}
      onSearch={handleSearch}
      style={{ maxWidth: 600, ...style }}
    />
  );
}; 