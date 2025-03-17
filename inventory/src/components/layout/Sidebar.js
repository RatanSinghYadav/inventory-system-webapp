import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [expandedMenu, setExpandedMenu] = useState('');

  const toggleMenu = (menu) => {
    console.log('Toggle menu:', menu, 'Current expanded:', expandedMenu);
    if (expandedMenu === menu) {
      setExpandedMenu('');
    } else {
      setExpandedMenu(menu);
    }
  };

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src="/logo.png" alt="Coca-Cola SLMG Beverages" className="logo" />
      </div>
      
      <div className={`menu-item active`}>
        <div className="menu-icon">
          <i className="fa fa-th-large"></i>
        </div>
        <span>Dashboard</span>
      </div>
      
      <div className={`menu-item ${expandedMenu === 'inventory' ? 'expanded' : ''}`} onClick={() => toggleMenu('inventory')}>
        <div className="menu-content">
          <div className="menu-icon">
            <i className="fa fa-shopping-cart"></i>
          </div>
          <span>Add Inventory Item's</span>
          <div className="arrow">
            <i className={`fa fa-chevron-${expandedMenu === 'inventory' ? 'down' : 'right'}`}></i>
          </div>
        </div>
        
        {expandedMenu === 'inventory' && (
          <div className="submenu">
            <div className="submenu-item">
              <i className="fa fa-server"></i>
              <span>Server Entry</span>
            </div>
            <div className="submenu-item">
              <i className="fa fa-random"></i>
              <span>Switch Entry</span>
            </div>
            <div className="submenu-item">
              <i className="fa fa-desktop"></i>
              <span>Desktop Entry</span>
            </div>
            <div className="submenu-item">
              <i className="fa fa-laptop"></i>
              <span>Laptop Entry</span>
            </div>
            <div className="submenu-item">
              <i className="fa fa-print"></i>
              <span>Printer Entry</span>
            </div>
            <div className="submenu-item">
              <i className="fa fa-scanner"></i>
              <span>Scanner Entry</span>
            </div>
            <div className="submenu-item">
              <i className="fa fa-hdd-o"></i>
              <span>Harddisk Entry</span>
            </div>
            <div className="submenu-item">
              <i className="fa fa-calculator"></i>
              <span>Tally Entry</span>
            </div>
            <div className="submenu-item">
              <i className="fa fa-plug"></i>
              <span>UPS Entry</span>
            </div>
            <div className="submenu-item">
              <i className="fa fa-mouse-pointer"></i>
              <span>Mouse Entry</span>
            </div>
            <div className="submenu-item">
              <i className="fa fa-keyboard-o"></i>
              <span>Keyboard Entry</span>
            </div>
            <div className="submenu-item">
              <i className="fa fa-shield"></i>
              <span>Antivirus Entry</span>
            </div>
            <div className="submenu-item">
              <i className="fa fa-fire"></i>
              <span>Firewall</span>
            </div>
            <div className="submenu-item">
              <i className="fa fa-usb"></i>
              <span>Other Peripherals</span>
            </div>
          </div>
        )}
      </div>
      
      <div className={`menu-item ${expandedMenu === 'reports' ? 'expanded' : ''}`} onClick={() => toggleMenu('reports')}>
        <div className="menu-content">
          <div className="menu-icon">
            <i className="fa fa-bar-chart"></i>
          </div>
          <span>Report's</span>
          <div className="arrow">
            <i className={`fa fa-chevron-${expandedMenu === 'reports' ? 'down' : 'right'}`}></i>
          </div>
        </div>
        
        {expandedMenu === 'reports' && (
          <div className="submenu">
            <div className="submenu-item">
              <i className="fa fa-server"></i>
              <span>Server Report</span>
            </div>
            <div className="submenu-item">
              <i className="fa fa-random"></i>
              <span>Switch Report</span>
            </div>
            <div className="submenu-item">
              <i className="fa fa-desktop"></i>
              <span>Desktop Report</span>
            </div>
            <div className="submenu-item">
              <i className="fa fa-laptop"></i>
              <span>Laptop Report</span>
            </div>
            <div className="submenu-item">
              <i className="fa fa-print"></i>
              <span>Printer Report</span>
            </div>
            <div className="submenu-item">
              <i className="fa fa-scanner"></i>
              <span>Scanner Report</span>
            </div>
            <div className="submenu-item">
              <i className="fa fa-hdd-o"></i>
              <span>Harddisk Report</span>
            </div>
            <div className="submenu-item">
              <i className="fa fa-calculator"></i>
              <span>Tally Report</span>
            </div>
            <div className="submenu-item">
              <i className="fa fa-plug"></i>
              <span>UPS Report</span>
            </div>
            <div className="submenu-item">
              <i className="fa fa-mouse-pointer"></i>
              <span>Mouse Report</span>
            </div>
            <div className="submenu-item">
              <i className="fa fa-keyboard-o"></i>
              <span>Keyboard Report</span>
            </div>
            <div className="submenu-item">
              <i className="fa fa-shield"></i>
              <span>Antivirus Report</span>
            </div>
            <div className="submenu-item">
              <i className="fa fa-fire"></i>
              <span>Firewall Report</span>
            </div>
            <div className="submenu-item">
              <i className="fa fa-usb"></i>
              <span>Other Peripherals Report</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="menu-item">
        <div className="menu-icon">
          <i className="fa fa-trash"></i>
        </div>
        <span>Scrapped Asset Report's</span>
        <div className="arrow">
          <i className="fa fa-chevron-right"></i>
        </div>
      </div>
      
      <div className="menu-item">
        <div className="menu-icon">
          <i className="fa fa-exclamation-circle"></i>
        </div>
        <span>Issue Management</span>
        <div className="arrow">
          <i className="fa fa-chevron-right"></i>
        </div>
      </div>
      
      <div className="menu-item">
        <div className="menu-icon">
          <i className="fa fa-database"></i>
        </div>
        <span>User Data Back-UP</span>
        <div className="arrow">
          <i className="fa fa-chevron-right"></i>
        </div>
      </div>
      
      <div className="menu-item">
        <div className="menu-icon">
          <i className="fa fa-users"></i>
        </div>
        <span>Member</span>
        <div className="arrow">
          <i className="fa fa-chevron-right"></i>
        </div>
      </div>
      
      <div className="menu-item">
        <div className="menu-icon">
          <i className="fa fa-cog"></i>
        </div>
        <span>Master</span>
        <div className="arrow">
          <i className="fa fa-chevron-right"></i>
        </div>
      </div>
      
      <div className="menu-item">
        <div className="menu-icon">
          <i className="fa fa-power-off"></i>
        </div>
        <span>Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;