import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CustomLayout from './components/layout/Layout.js';
import Dashboard from './components/dashboard/Dashboard';
import ServerEntry from './components/inventory/ServerEntry';
import SwitchEntry from './components/inventory/SwitchEntry';
import DesktopEntry from './components/inventory/DesktopEntry';
import LaptopEntry from './components/inventory/LaptopEntry';
// import PrinterEntry from './components/inventory/PrinterEntry';
// import ScannerEntry from './components/inventory/ScannerEntry';
// import HarddiskEntry from './components/inventory/HarddiskEntry';
import TallyEntry from './components/inventory/TallyEntry';
// import UPSEntry from './components/inventory/UPSEntry';
// import MouseEntry from './components/inventory/MouseEntry';
// import KeyboardEntry from './components/inventory/KeyboardEntry';
// import AntivirusEntry from './components/inventory/AntivirusEntry';
// import FirewallEntry from './components/inventory/FirewallEntry';
// import PeripheralsEntry from './components/inventory/PeripheralsEntry';

// Reports
import ServerReport from './components/reports/ServerReport';
// import SwitchReport from './components/reports/SwitchReport';
import DesktopReport from './components/reports/DesktopReport';
import LaptopReport from './components/reports/LaptopReport.js';
import PrinterReport from './components/reports/PrinterReport';
import ScannerReport from './components/reports/ScannerReport';
// import HarddiskReport from './components/reports/HarddiskReport';
import TallyReport from './components/reports/TallyReport';
// import UPSReport from './components/reports/UPSReport';
// import MouseReport from './components/reports/MouseReport';
// import KeyboardReport from './components/reports/KeyboardReport';
// import AntivirusReport from './components/reports/AntivirusReport';
// import FirewallReport from './components/reports/FirewallReport';
// import PeripheralsReport from './components/reports/PeripheralsReport';

// Other sections
import ScrappedAssetReport from './components/scrapped/ScrappedAssetReport';
import IssueManagement from './components/issues/IssueManagement';
// import UserDataBackup from './components/backup/UserDataBackup';
import Member from './components/member/Member';
import Master from './components/master/Master';

import 'antd/dist/reset.css';
import './App.css';

// Remove these unused imports
// import { Layout, Menu, Typography, Avatar, Dropdown, Button } from 'antd';
// import { ... } from '@ant-design/icons';

function App() {
  return (
    <Router>
      <CustomLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Inventory Routes */}
          <Route path="/inventory/server" element={<ServerEntry />} />
          <Route path="/inventory/switch" element={<SwitchEntry />} />
          <Route path="/inventory/desktop" element={<DesktopEntry />} />
          <Route path="/inventory/laptop" element={<LaptopEntry />} />
          {/* <Route path="/inventory/printer" element={<PrinterEntry />} /> */}
          {/* <Route path="/inventory/scanner" element={<ScannerEntry />} /> */}
          {/* <Route path="/inventory/harddisk" element={<HarddiskEntry />} /> */}
          <Route path="/inventory/tally" element={<TallyEntry />} />
          {/* <Route path="/inventory/ups" element={<UPSEntry />} /> */}
          {/* <Route path="/inventory/mouse" element={<MouseEntry />} /> */}
          {/* <Route path="/inventory/keyboard" element={<KeyboardEntry />} /> */}
          {/* <Route path="/inventory/antivirus" element={<AntivirusEntry />} /> */}
          {/* <Route path="/inventory/firewall" element={<FirewallEntry />} /> */}
          {/* <Route path="/inventory/peripherals" element={<PeripheralsEntry />} /> */}
          
          {/* Report Routes */}
          <Route path="/reports/server" element={<ServerReport />} />
          {/* <Route path="/reports/switch" element={<SwitchReport />} /> */}
          <Route path="/reports/desktop" element={<DesktopReport />} />
          <Route path="/reports/laptop" element={<LaptopReport />} />
          <Route path="/reports/printer" element={<PrinterReport />} />
          <Route path="/reports/scanner" element={<ScannerReport />} />
          {/* <Route path="/reports/harddisk" element={<HarddiskReport />} /> */}
          <Route path="/reports/tally" element={<TallyReport />} />
          {/* <Route path="/reports/ups" element={<UPSReport />} /> */}
          {/* <Route path="/reports/mouse" element={<MouseReport />} /> */}
          {/* <Route path="/reports/keyboard" element={<KeyboardReport />} /> */}
          {/* <Route path="/reports/antivirus" element={<AntivirusReport />} /> */}
          {/* <Route path="/reports/firewall" element={<FirewallReport />} /> */}
          {/* <Route path="/reports/peripherals" element={<PeripheralsReport />} /> */}
          
          {/* Other Routes */}
          <Route path="/scrapped" element={<ScrappedAssetReport />} />
          <Route path="/issues" element={<IssueManagement />} />
          {/* <Route path="/backup" element={<UserDataBackup />} /> */}
          <Route path="/member" element={<Member />} />
          <Route path="/master" element={<Master />} />
        </Routes>
      </CustomLayout>
    </Router>
  );
}

// Remove everything from here to the end of the file
// const { Header, Sider, Content, Footer } = Layout;
// const { Title } = Typography;
// const { SubMenu } = Menu;
// 
// const App = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   
//   const toggle = () => {
//     setCollapsed(!collapsed);
//   };
//   
//   const userMenu = (
//     <Menu>
//       <Menu.Item key="profile" icon={<UserOutlined />}>
//         Profile
//       </Menu.Item>
//       <Menu.Item key="settings" icon={<SettingOutlined />}>
//         Settings
//       </Menu.Item>
//       <Menu.Divider />
//       <Menu.Item key="logout" icon={<LogoutOutlined />}>
//         Logout
//       </Menu.Item>
//     </Menu>
//   );
//   
//   const notificationMenu = (
//     <Menu>
//       <Menu.Item key="notification1">
//         <span>System update completed</span>
//         <div style={{ fontSize: '12px', color: '#999' }}>2 hours ago</div>
//       </Menu.Item>
//       <Menu.Item key="notification2">
//         <span>New user registered</span>
//         <div style={{ fontSize: '12px', color: '#999' }}>5 hours ago</div>
//       </Menu.Item>
//       <Menu.Divider />
//       <Menu.Item key="viewAll">
//         <Button type="link" style={{ padding: 0 }}>View all</Button>
//       </Menu.Item>
//     </Menu>
//   );
//
//   return (
//     <Router>
//       <Layout style={{ minHeight: '100vh' }}>
//         <Sider trigger={null} collapsible collapsed={collapsed} width={250}>
//           <div className="logo">
//             {!collapsed && <span className="logo-text">Inventory System</span>}
//           </div>
//           <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']}>
//             <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
//               <Link to="/dashboard">Dashboard</Link>
//             </Menu.Item>
//             
//             <SubMenu key="inventory" icon={<LaptopOutlined />} title="Inventory">
//               <Menu.Item key="server">
//                 <Link to="/inventory/server">Server Entry</Link>
//               </Menu.Item>
//               <Menu.Item key="switch">
//                 <Link to="/inventory/switch">Switch Entry</Link>
//               </Menu.Item>
//             </SubMenu>
//             
//             <SubMenu key="reports" icon={<FileTextOutlined />} title="Reports">
//               <Menu.Item key="laptop-report">
//                 <Link to="/reports/laptop">Laptop Report</Link>
//               </Menu.Item>
//               <Menu.Item key="desktop-report">
//                 <Link to="/reports/desktop">Desktop Report</Link>
//               </Menu.Item>
//               <Menu.Item key="tally-report">
//                 <Link to="/reports/tally">Tally Report</Link>
//               </Menu.Item>
//             </SubMenu>
//             
//             <Menu.Item key="scrapped" icon={<DeleteOutlined />}>
//               <Link to="/scrapped">Scrapped Assets</Link>
//             </Menu.Item>
//             
//             <Menu.Item key="issues" icon={<ToolOutlined />}>
//               <Link to="/issues">Issues</Link>
//             </Menu.Item>
//             
//             <Menu.Item key="backup" icon={<CloudUploadOutlined />}>
//               <Link to="/backup">Backup</Link>
//             </Menu.Item>
//             
//             <Menu.Item key="member" icon={<UserOutlined />}>
//               <Link to="/member">Member</Link>
//             </Menu.Item>
//             
//             <Menu.Item key="master" icon={<SettingOutlined />}>
//               <Link to="/master">Master</Link>
//             </Menu.Item>
//           </Menu>
//         </Sider>
//         
//         <Layout className="site-layout">
//           <Header className="site-layout-header" style={{ padding: 0 }}>
//             <div className="header-container">
//               <div className="header-left">
//                 {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
//                   className: 'trigger',
//                   onClick: toggle,
//                 })}
//               </div>
//               <div className="header-right">
//                 <Dropdown overlay={notificationMenu} trigger={['click']}>
//                   <Button type="text" icon={<BellOutlined />} style={{ fontSize: '18px' }} />
//                 </Dropdown>
//                 <Dropdown overlay={userMenu} trigger={['click']}>
//                   <div className="user-profile">
//                     <Avatar icon={<UserOutlined />} />
//                     {!collapsed && <span className="username">Admin User</span>}
//                   </div>
//                 </Dropdown>
//               </div>
//             </div>
//           </Header>
//           
//           <Content className="site-layout-content">
//             <Routes>
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/inventory/server" element={<ServerEntry />} />
//               <Route path="/inventory/switch" element={<SwitchEntry />} />
//               <Route path="/reports/laptop" element={<LaptopReport />} />
//               <Route path="/reports/desktop" element={<DesktopReport />} />
//               <Route path="/reports/tally" element={<TallyReport />} />
//               <Route path="/scrapped" element={<ScrappedAssetReport />} />
//               <Route path="/issues" element={<IssueManagement />} />
//               <Route path="/backup" element={<UserDataBackup />} />
//               <Route path="/member" element={<Member />} />
//               <Route path="/master" element={<Master />} />
//               <Route path="/" element={<Navigate to="/dashboard" replace />} />
//             </Routes>
//           </Content>
//           
//           <Footer style={{ textAlign: 'center' }}>
//             Inventory Management System ©{new Date().getFullYear()} Created by Your Company
//           </Footer>
//         </Layout>
//       </Layout>
//     </Router>
//   );
// };

export default App;
