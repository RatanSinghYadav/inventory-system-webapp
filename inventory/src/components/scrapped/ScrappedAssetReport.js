import React, { useState } from 'react';
import { Table, Card, Typography, Input, Button, Space, DatePicker, Tag } from 'antd';
import { SearchOutlined, DownloadOutlined, PrinterOutlined, FilterOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const ScrappedAssetReport = () => {
  const [searchText, setSearchText] = useState('');
  
  // Sample data - replace with actual data from your backend
  const data = [
    {
      key: '1',
      assetId: 'AST001',
      assetType: 'Laptop',
      model: 'HP Pavilion 15',
      serialNumber: 'HP78945612',
      purchaseDate: '2018-05-10',
      scrappedDate: '2023-06-15',
      reason: 'Hardware failure',
      approvedBy: 'John Manager',
      department: 'IT'
    },
    {
      key: '2',
      assetId: 'AST002',
      assetType: 'Desktop',
      model: 'Dell OptiPlex 7050',
      serialNumber: 'DL45678923',
      purchaseDate: '2017-03-22',
      scrappedDate: '2023-05-05',
      reason: 'Outdated hardware',
      approvedBy: 'Jane Director',
      department: 'Finance'
    },
    {
      key: '3',
      assetId: 'AST003',
      assetType: 'Printer',
      model: 'HP LaserJet Pro',
      serialNumber: 'PR12345678',
      purchaseDate: '2019-01-15',
      scrappedDate: '2023-07-10',
      reason: 'Beyond repair',
      approvedBy: 'Mike Supervisor',
      department: 'Operations'
    },
  ];
  
  const columns = [
    {
      title: 'Asset ID',
      dataIndex: 'assetId',
      key: 'assetId',
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) => {
        return Object.keys(record).some(key => 
          String(record[key]).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: 'Asset Type',
      dataIndex: 'assetType',
      key: 'assetType',
    },
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Serial Number',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
    },
    {
      title: 'Purchase Date',
      dataIndex: 'purchaseDate',
      key: 'purchaseDate',
    },
    {
      title: 'Scrapped Date',
      dataIndex: 'scrappedDate',
      key: 'scrappedDate',
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: 'Approved By',
      dataIndex: 'approvedBy',
      key: 'approvedBy',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
  ];

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleExport = () => {
    alert('Exporting data to Excel...');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Card className="report-card">
      <Title level={3}>Scrapped Asset Report</Title>
      
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search"
          onChange={handleSearch}
          prefix={<SearchOutlined />}
          style={{ width: 200 }}
        />
        <RangePicker />
        <Button icon={<FilterOutlined />}>Filter</Button>
        <Button type="primary" icon={<DownloadOutlined />} onClick={handleExport}>Export</Button>
        <Button icon={<PrinterOutlined />} onClick={handlePrint}>Print</Button>
      </Space>
      
      <Table 
        columns={columns} 
        dataSource={data} 
        scroll={{ x: 'max-content' }}
        pagination={{ pageSize: 10 }}
      />
    </Card>
  );
};

export default ScrappedAssetReport;