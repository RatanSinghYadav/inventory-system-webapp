import React, { useState } from 'react';
import { Layout, Menu, Typography, Avatar, Dropdown, Button } from 'antd';
import {
  DashboardOutlined,
  LaptopOutlined,
  FileTextOutlined,
  ToolOutlined,
  CloudUploadOutlined,
  UserOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  BellOutlined,
  DeleteOutlined,
  PrinterOutlined,
  ScanOutlined,
  HddOutlined,
  BankOutlined,
  UsbOutlined,
  KeyOutlined,
  SafetyOutlined,
  FireOutlined,
  AppstoreOutlined,
  DesktopOutlined,
  DatabaseOutlined,
  ThunderboltOutlined,
  AimOutlined,
  ShopOutlined,
  ControlOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

const { Header, Sider, Content, Footer } = Layout;
const { Title } = Typography;
const { SubMenu } = Menu;

const CustomLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const notificationMenu = (
    <Menu>
      <Menu.Item key="notification1">
        <span>System update completed</span>
        <div style={{ fontSize: '12px', color: '#999' }}>2 hours ago</div>
      </Menu.Item>
      <Menu.Item key="notification2">
        <span>New user registered</span>
        <div style={{ fontSize: '12px', color: '#999' }}>5 hours ago</div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="viewAll">
        <Button type="link" style={{ padding: 0 }}>View all</Button>
      </Menu.Item>
    </Menu>
  );

  // Find the currently active keys based on the location
  const getSelectedKeys = () => {
    const path = location.pathname;
    const parts = path.split('/');

    if (parts.length >= 3) {
      // For nested routes like /inventory/server
      return [`${parts[1]}-${parts[2]}`];
    } else if (parts.length === 2 && parts[1] !== '') {
      // For top-level routes like /dashboard
      return [parts[1]];
    }

    return ['dashboard'];
  };

  const getOpenKeys = () => {
    const path = location.pathname;
    if (path.includes('/inventory/')) {
      return ['inventory'];
    } else if (path.includes('/reports/')) {
      return ['reports'];
    }
    return [];
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={250}
        className="sidebar-fixed"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 10
        }}
      >
        <div className="logo">
          {!collapsed && <span className="logo-text">Inventory System</span>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={getSelectedKeys()}
          defaultOpenKeys={getOpenKeys()}
        >
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>

          <SubMenu key="inventory" icon={<LaptopOutlined />} title="Add Inventory Item's">
            <Menu.Item key="inventory-server" icon={<DatabaseOutlined />}>
              <Link to="/inventory/server">Server Entry</Link>
            </Menu.Item>
            <Menu.Item key="inventory-switch" icon={<ControlOutlined />}>
              <Link to="/inventory/switch">Switch Entry</Link>
            </Menu.Item>
            <Menu.Item key="inventory-desktop" icon={<DesktopOutlined />}>
              <Link to="/inventory/desktop">Desktop Entry</Link>
            </Menu.Item>
            <Menu.Item key="inventory-laptop" icon={<LaptopOutlined />}>
              <Link to="/inventory/laptop">Laptop Entry</Link>
            </Menu.Item>
            <Menu.Item key="inventory-printer" icon={<PrinterOutlined />}>
              <Link to="/inventory/printer">Printer Entry</Link>
            </Menu.Item>
            <Menu.Item key="inventory-scanner" icon={<ScanOutlined />}>
              <Link to="/inventory/scanner">Scanner Entry</Link>
            </Menu.Item>
            <Menu.Item key="inventory-harddisk" icon={<HddOutlined />}>
              <Link to="/inventory/harddisk">Harddisk Entry</Link>
            </Menu.Item>
            <Menu.Item key="inventory-tally" icon={<ShopOutlined />}>
              <Link to="/inventory/tally">Tally Entry</Link>
            </Menu.Item>
            <Menu.Item key="inventory-ups" icon={<ThunderboltOutlined />}>
              <Link to="/inventory/ups">UPS Entry</Link>
            </Menu.Item>
            <Menu.Item key="inventory-mouse" icon={<AimOutlined />}>
              <Link to="/inventory/mouse">Mouse Entry</Link>
            </Menu.Item>
            <Menu.Item key="inventory-keyboard" icon={<KeyOutlined />}>
              <Link to="/inventory/keyboard">Keyboard Entry</Link>
            </Menu.Item>
            <Menu.Item key="inventory-antivirus" icon={<SafetyOutlined />}>
              <Link to="/inventory/antivirus">Antivirus Entry</Link>
            </Menu.Item>
            <Menu.Item key="inventory-firewall" icon={<FireOutlined />}>
              <Link to="/inventory/firewall">Firewall</Link>
            </Menu.Item>
            <Menu.Item key="inventory-peripherals" icon={<AppstoreOutlined />}>
              <Link to="/inventory/peripherals">Other Peripherals</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="reports" icon={<FileTextOutlined />} title="Report's">
            <Menu.Item key="reports-server" icon={<DatabaseOutlined />}>
              <Link to="/reports/server">Server Report</Link>
            </Menu.Item>
            <Menu.Item key="reports-switch" icon={<ControlOutlined />}>
              <Link to="/reports/switch">Switch Report</Link>
            </Menu.Item>
            <Menu.Item key="reports-desktop" icon={<DesktopOutlined />}>
              <Link to="/reports/desktop">Desktop Report</Link>
            </Menu.Item>
            <Menu.Item key="reports-laptop" icon={<LaptopOutlined />}>
              <Link to="/reports/laptop">Laptop Report</Link>
            </Menu.Item>
            <Menu.Item key="reports-printer" icon={<PrinterOutlined />}>
              <Link to="/reports/printer">Printer Report</Link>
            </Menu.Item>
            <Menu.Item key="reports-scanner" icon={<ScanOutlined />}>
              <Link to="/reports/scanner">Scanner Report</Link>
            </Menu.Item>
            <Menu.Item key="reports-harddisk" icon={<HddOutlined />}>
              <Link to="/reports/harddisk">Harddisk Report</Link>
            </Menu.Item>
            <Menu.Item key="reports-tally" icon={<ShopOutlined />}>
              <Link to="/reports/tally">Tally Report</Link>
            </Menu.Item>
            <Menu.Item key="reports-ups" icon={<ThunderboltOutlined />}>
              <Link to="/reports/ups">UPS Report</Link>
            </Menu.Item>
            <Menu.Item key="reports-mouse" icon={<AimOutlined />}>
              <Link to="/reports/mouse">Mouse Report</Link>
            </Menu.Item>
            <Menu.Item key="reports-keyboard" icon={<KeyOutlined />}>
              <Link to="/reports/keyboard">Keyboard Report</Link>
            </Menu.Item>
            <Menu.Item key="reports-antivirus" icon={<SafetyOutlined />}>
              <Link to="/reports/antivirus">Antivirus Report</Link>
            </Menu.Item>
            <Menu.Item key="reports-firewall" icon={<FireOutlined />}>
              <Link to="/reports/firewall">Firewall Report</Link>
            </Menu.Item>
            <Menu.Item key="reports-peripherals" icon={<AppstoreOutlined />}>
              <Link to="/reports/peripherals">Other Peripherals Report</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="scrapped" icon={<DeleteOutlined />}>
            <Link to="/scrapped">Scrapped Assets</Link>
          </Menu.Item>

          <Menu.Item key="issues" icon={<ToolOutlined />}>
            <Link to="/issues">Issues</Link>
          </Menu.Item>

          <Menu.Item key="backup" icon={<CloudUploadOutlined />}>
            <Link to="/backup">Backup</Link>
          </Menu.Item>

          <Menu.Item key="member" icon={<UserOutlined />}>
            <Link to="/member">Member</Link>
          </Menu.Item>

          <Menu.Item key="master" icon={<SettingOutlined />}>
            <Link to="/master">Master</Link>
          </Menu.Item>

        </Menu>
      </Sider>

      <Layout className="site-layout" style={{ marginLeft: collapsed ? 80 : 250, transition: 'margin-left 0.2s' }}>
        <Header className="site-layout-header" style={{ padding: 0, position: 'sticky', top: 0, zIndex: 9, width: '100%' }}>
          <div className="header-container">
            <div className="header-left">
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: toggle,
              })}
            </div>
            <div className="header-right">
              <Dropdown overlay={notificationMenu} trigger={['click']}>
                <Button type="text" icon={<BellOutlined />} style={{ fontSize: '18px' }} />
              </Dropdown>
              <Dropdown overlay={userMenu} trigger={['click']}>
                <div className="user-profile">
                  <Avatar icon={<UserOutlined />} />
                  {!collapsed && <span className="username">Admin User</span>}
                </div>
              </Dropdown>
            </div>
          </div>
        </Header>

        <Content className="site-layout-content">
          {children}
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          Inventory Management System ©{new Date().getFullYear()} Created by Your Company
        </Footer>
      </Layout>
    </Layout>
  );
};

export default CustomLayout;