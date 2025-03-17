import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Typography } from 'antd';
import { 
  DesktopOutlined, 
  LaptopOutlined, 
  PrinterOutlined, 
  HddOutlined,
  DatabaseOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
  ScanOutlined,
  AccountBookOutlined,
  ThunderboltOutlined,
  AimOutlined,
  KeyOutlined,
  SafetyOutlined,
  FireOutlined,
  AppstoreOutlined,
  ControlOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { url } from '../../utils/constent';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const { Title } = Typography;

const Dashboard = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    desktops: 0,
    laptops: 0,
    servers: 0,
    printers: 0,
    scanners: 0,
    tallies: 0,
    hardDisks: 0,
    switches: 0,
    ups: 0,
    mouse: 0,
    keyboard: 0,
    antivirus: 0,
    firewall: 0,
    peripherals: 0,
    users: 0,
    issues: 0,
    scrapped: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      try {
        // Fetch all data and count the items
        const fetchData = async (endpoint) => {
          try {
            const response = await fetch(`${url}/${endpoint}`);
            if (!response.ok) {
              console.error(`Error fetching ${endpoint}: ${response.status}`);
              return 0;
            }
            const data = await response.json();
            return data.data ? data.data.length : 0;
          } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
            return 0;
          }
        };

        // Fetch counts from all endpoints
        const desktopCount = await fetchData('api/desktops/getAllDesktops');
        const laptopCount = await fetchData('api/laptops/getAllLaptops');
        const serverCount = await fetchData('api/servers/getAllServers');
        const printerCount = await fetchData('api/printers/getAllPrinters');
        const scannerCount = await fetchData('api/scanners/getAllScanners');
        const tallyCount = await fetchData('api/tallies/getAllTallies');
        const hardDiskCount = await fetchData('api/harddisks/getAllHardDisks');
        const switchCount = await fetchData('api/switches/getAllSwitches');
        const upsCount = await fetchData('api/ups/getAllUps');
        const mouseCount = await fetchData('api/mouse/getAllMouse');
        const keyboardCount = await fetchData('api/keyboards/getAllKeyboards');
        const antivirusCount = await fetchData('api/antivirus/getAllAntivirus');
        const firewallCount = await fetchData('api/firewalls/getAllFirewalls');
        const peripheralsCount = await fetchData('api/peripherals/getAllPeripherals');
        
        // Update state with all counts
        setCounts({
          desktops: desktopCount,
          laptops: laptopCount,
          servers: serverCount,
          printers: printerCount,
          scanners: scannerCount,
          tallies: tallyCount,
          hardDisks: hardDiskCount,
          switches: switchCount,
          ups: upsCount,
          mouse: mouseCount,
          keyboard: keyboardCount,
          antivirus: antivirusCount,
          firewall: firewallCount,
          peripherals: peripheralsCount,
          users: 0, // Placeholder - replace with actual API if available
          issues: 0, // Placeholder - replace with actual API if available
          scrapped: 0 // Placeholder - replace with actual API if available
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  // Function to navigate to specific report page
  const navigateToReport = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard">
      <Title level={2}>Dashboard</Title>
      <Row gutter={16}>
        <Col span={6}>
          <Card 
            className="dashboard-card"
            hoverable
            onClick={() => navigateToReport('/reports/desktop')}
          >
            <Statistic
              title="Total Desktops"
              value={counts.desktops}
              prefix={<DesktopOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card 
            className="dashboard-card"
            hoverable
            onClick={() => navigateToReport('/reports/laptop')}
          >
            <Statistic
              title="Total Laptops"
              value={counts.laptops}
              prefix={<LaptopOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card 
            className="dashboard-card"
            hoverable
            onClick={() => navigateToReport('/reports/server')}
          >
            <Statistic
              title="Total Servers"
              value={counts.servers}
              prefix={<DatabaseOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card 
            className="dashboard-card"
            hoverable
            onClick={() => navigateToReport('/reports/printer')}
          >
            <Statistic
              title="Total Printers"
              value={counts.printers}
              prefix={<PrinterOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: '16px' }}>
        <Col span={6}>
          <Card 
            className="dashboard-card"
            hoverable
            onClick={() => navigateToReport('/reports/scanner')}
          >
            <Statistic
              title="Total Scanners"
              value={counts.scanners}
              prefix={<ScanOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card 
            className="dashboard-card"
            hoverable
            onClick={() => navigateToReport('/reports/harddisk')}
          >
            <Statistic
              title="Hard Disks"
              value={counts.hardDisks}
              prefix={<HddOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card 
            className="dashboard-card"
            hoverable
            onClick={() => navigateToReport('/reports/switch')}
          >
            <Statistic
              title="Total Switches"
              value={counts.switches}
              prefix={<ControlOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card 
            className="dashboard-card"
            hoverable
            onClick={() => navigateToReport('/reports/tally')}
          >
            <Statistic
              title="Total Tallies"
              value={counts.tallies}
              prefix={<AccountBookOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: '16px' }}>
        <Col span={6}>
          <Card 
            className="dashboard-card"
            hoverable
            onClick={() => navigateToReport('/reports/ups')}
          >
            <Statistic
              title="Total UPS"
              value={counts.ups}
              prefix={<ThunderboltOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card 
            className="dashboard-card"
            hoverable
            onClick={() => navigateToReport('/reports/mouse')}
          >
            <Statistic
              title="Total Mouse"
              value={counts.mouse}
              prefix={<AimOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card 
            className="dashboard-card"
            hoverable
            onClick={() => navigateToReport('/reports/keyboard')}
          >
            <Statistic
              title="Total Keyboards"
              value={counts.keyboard}
              prefix={<KeyOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card 
            className="dashboard-card"
            hoverable
            onClick={() => navigateToReport('/reports/antivirus')}
          >
            <Statistic
              title="Antivirus"
              value={counts.antivirus}
              prefix={<SafetyOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: '16px' }}>
        <Col span={6}>
          <Card 
            className="dashboard-card"
            hoverable
            onClick={() => navigateToReport('/reports/firewall')}
          >
            <Statistic
              title="Firewalls"
              value={counts.firewall}
              prefix={<FireOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card 
            className="dashboard-card"
            hoverable
            onClick={() => navigateToReport('/reports/peripherals')}
          >
            <Statistic
              title="Other Peripherals"
              value={counts.peripherals}
              prefix={<AppstoreOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card 
            className="dashboard-card"
            hoverable
            onClick={() => navigateToReport('/issues')}
          >
            <Statistic
              title="Issues Pending"
              value={counts.issues}
              prefix={<ExclamationCircleOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card 
            className="dashboard-card"
            hoverable
            onClick={() => navigateToReport('/scrapped')}
          >
            <Statistic
              title="Scrapped Assets"
              value={counts.scrapped}
              prefix={<DeleteOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;