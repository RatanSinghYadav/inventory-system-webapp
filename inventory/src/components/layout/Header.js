import React from 'react';
import { Layout, Typography, Space, Avatar, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Header.css';

const { Header: AntHeader } = Layout;
const { Text, Title } = Typography;

const Header = () => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getDate()}th ${currentDate.getFullYear()}`;
  const formattedTime = currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  
  return (
    <AntHeader className="site-header">
      <div className="header-content">
        <Title level={4} style={{ margin: 0 }}>Admin Dashboard</Title>
        <div className="header-right">
          <Space split={<Divider type="vertical" />}>
            <Space>
              <Text>Date : {formattedDate}</Text>
              <Text style={{ color: '#52c41a' }}>●</Text>
              <Text>Time : {formattedTime}</Text>
            </Space>
            <Space>
              <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />}>R</Avatar>
              <div>
                <Text strong>Ratan Singh Yadav</Text>
                <div>
                  <Text type="secondary">Admin</Text>
                </div>
              </div>
            </Space>
          </Space>
        </div>
      </div>
    </AntHeader>
  );
};

export default Header;