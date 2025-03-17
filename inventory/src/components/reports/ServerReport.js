import React, { useState, useEffect } from 'react';
import { Table, Card, Typography, Input, Button, Space, DatePicker, message, Upload, Modal, Form, Row, Col, Descriptions } from 'antd';
import { SearchOutlined, DownloadOutlined, PrinterOutlined, FilterOutlined, ReloadOutlined, UploadOutlined, PlusOutlined, DeleteOutlined, CloudServerOutlined } from '@ant-design/icons';
import { url } from '../../utils/constent';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const ServerReport = () => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [importLoading, setImportLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [viewRecord, setViewRecord] = useState(null);

  // Fetch data from API using fetch  
  const fetchServers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/api/servers/getAllServers`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jsonData = await response.json();
      // Transform the data to match the table structure if needed
      const formattedData = jsonData.data.map((item, index) => ({
        key: item._id || index.toString(),
        physical: item.physical || '',
        company: item.company || '',
        idNo: item.idNo || '',
        department: item.department || '',
        location: item.location || '',
        computerName: item.computerName || '',
        userName: item.userName || '',
        desktop: item.desktop || '',
        ip: item.ip || '',
        macAddress: item.macAddress || '',
        os: item.os || '',
        processor: item.processor || '',
        ram: item.ram || '',
        hardDisk: item.hardDisk || '',
        antivirus: item.antivirus || '',
        serialNo: item.serialNo || '',
        purchaseFrom: item.purchaseFrom || '',
        purchaseDate: item.purchaseDate || ''
      }));
      setData(formattedData);
    } catch (error) {
      console.error('Error fetching server data:', error);
      message.error('Failed to fetch server data');
    } finally {
      setLoading(false);
    }
  };

  // Load data when component mounts
  useEffect(() => {
    fetchServers();
  }, []);

  const columns = [
    {
      title: 'Physical',
      dataIndex: 'physical',
      key: 'physical',
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) => {
        return Object.keys(record).some(key =>
          String(record[key]).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'ID No.',
      dataIndex: 'idNo',
      key: 'idNo',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Computer Name',
      dataIndex: 'computerName',
      key: 'computerName',
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Desktop',
      dataIndex: 'desktop',
      key: 'desktop',
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip',
    },
    {
      title: 'MAC Address',
      dataIndex: 'macAddress',
      key: 'macAddress',
    },
    {
      title: 'OS',
      dataIndex: 'os',
      key: 'os',
    },
    {
      title: 'Processor',
      dataIndex: 'processor',
      key: 'processor',
    },
    {
      title: 'RAM',
      dataIndex: 'ram',
      key: 'ram',
    },
    {
      title: 'Hard Disk',
      dataIndex: 'hardDisk',
      key: 'hardDisk',
    },
    {
      title: 'Antivirus',
      dataIndex: 'antivirus',
      key: 'antivirus',
    },
    {
      title: 'Serial No.',
      dataIndex: 'serialNo',
      key: 'serialNo',
    },
    {
      title: 'Purchase From',
      dataIndex: 'purchaseFrom',
      key: 'purchaseFrom',
    },
    {
      title: 'Purchase Date',
      dataIndex: 'purchaseDate',
      key: 'purchaseDate',
    },
  ];

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleExport = async () => {
    try {
      setLoading(true);
      message.loading('Exporting data to Excel...', 0);

      // Try server-side export first
      try {
        const response = await fetch(`${url}/api/servers/export`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          // Server-side export successful
          const blob = await response.blob();
          const downloadUrl = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = 'server_report.xlsx';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(downloadUrl);

          message.destroy();
          message.success('Server report exported successfully');
          setLoading(false);
          return;
        }
      } catch (error) {
        console.log('Server export failed, falling back to client-side export');
      }

      // export to frontend
      // Fallback to client-side export if server export fails
      import('xlsx').then(XLSX => {
        // Convert data to worksheet
        const worksheet = XLSX.utils.json_to_sheet(data.map(item => {
          // Remove the key property as it's not needed in the export
          const { key, ...rest } = item;
          return rest;
        }));

        // Create workbook and add the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Servers');

        // Generate Excel file and trigger download
        XLSX.writeFile(workbook, 'server report.xlsx');

        message.destroy();
        message.success('Server report exported successfully');
      }).catch(err => {
        console.error('Failed to load xlsx library:', err);
        message.destroy();
        message.error('Failed to export: Could not load export library');
      });
      // end 

    } catch (error) {
      console.error('Error exporting server data:', error);
      message.destroy();
      message.error('Failed to export server data');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleRefresh = () => {
    fetchServers();
    message.success('Data refreshed');
  };

  // Handle file import
  const handleImport = async (file) => {
    if (!file) return;

    const fileType = file.type;
    if (fileType !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
      fileType !== 'application/vnd.ms-excel') {
      alert('Please upload Excel file only!');
      return;
    }

    setImportLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log('Uploading file:', file.name, file.type, file.size);

      const response = await fetch(`${url}/api/servers/import`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server response:', errorData);

        // Check for duplicate data error
        if (errorData.error && (
          errorData.error.includes('duplicate') ||
          errorData.error.includes('Duplicate') ||
          errorData.error.includes('E11000')
        )) {

          // Extract the duplicate ID from error message
          let duplicateId = "unknown";
          let computerName = "unknown";
          let isDuplicateComputerName = false;
          
          try {
            // Try to extract the ID from error message
            const idMatch = errorData.error.match(/idNo: "([^"]+)"/);
            const computerNameMatch = errorData.error.match(/duplicate key error collection: .*? index: .*? dup key: { : "([^"]+)" }/);
            
            if (idMatch && idMatch[1]) {
              duplicateId = idMatch[1];
            } else if (errorData.error.includes('duplicate key')) {
              // Try to extract the computer name from error message
              if (computerNameMatch && computerNameMatch[1]) {
                computerName = computerNameMatch[1];
                isDuplicateComputerName = true;
              }
            }
          } catch (e) {
            console.log("Could not extract duplicate information", e);
          }

          // Use browser's built-in alert with more specific information
          if (isDuplicateComputerName) {
            alert(`Duplicate Computer Name Found: ${computerName}\n\n` +
              'This Computer Name already exists in the database. Please remove this duplicate entry from your Excel file and try again.\n\n' +
              'Steps to resolve:\n' +
              '1. Download current data using Export button\n' +
              '2. Compare your Excel file with exported data\n' +
              '3. Remove or update the duplicate entry\n' +
              '4. Try importing again');
          } else {
            alert(`Duplicate ID Found: ${duplicateId}\n\n` +
              'This ID already exists in the database. Please remove this duplicate entry from your Excel file and try again.\n\n' +
              'Steps to resolve:\n' +
              '1. Download current data using Export button\n' +
              '2. Compare your Excel file with exported data\n' +
              '3. Remove or update the duplicate entry\n' +
              '4. Try importing again');
          }

          return;
        }

        throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      // Use browser's built-in alert for success
      alert('Data imported successfully!\n\n' +
        (result.totalRows && result.importedRows ?
          `Processed ${result.totalRows} rows, imported ${result.importedRows} records.` : ''));

      // If there were validation errors, show them
      if (result.errors && result.errors.length > 0) {
        console.warn('Import validation errors:', result.errors);
        
        // Show detailed validation errors to user
        const errorMessages = result.errors.join('\n');
        alert(`Import completed with ${result.errors.length} validation issues:\n\n${errorMessages}\n\nSome records were skipped due to validation issues.`);
      }

      // Refresh the data to show newly imported records
      fetchServers();
    } catch (error) {
      console.error('Error importing data:', error);
      alert('Failed to import data: ' + error.message);
    } finally {
      setImportLoading(false);
    }
  };

  // File upload component
  const uploadProps = {
    name: 'file',
    accept: '.xlsx, .xls',
    showUploadList: false,
    beforeUpload: (file) => {
      handleImport(file);
      return false; // Prevent default upload behavior
    },
  };

  // Create new server record
  const createServer = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/api/servers/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      alert('Server record created successfully!');
      fetchServers(); // Refresh the data
    } catch (error) {
      console.error('Error creating server record:', error);
      alert('Failed to create server record: ' + error.message);
    } finally {
      setLoading(false);
      setIsModalVisible(false);
    }
  };

  // Get server by ID
  const getServerById = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/api/servers/getServer/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setSelectedRecord(result.data);
      form.setFieldsValue(result.data);
      setIsModalVisible(true);
    } catch (error) {
      console.error('Error fetching server record:', error);
      alert('Failed to fetch server record: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Update server record
  const updateServer = async (id, values) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/api/servers/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      alert('Server record updated successfully!');
      fetchServers(); // Refresh the data
    } catch (error) {
      console.error('Error updating server record:', error);
      alert('Failed to update server record: ' + error.message);
    } finally {
      setLoading(false);
      setIsModalVisible(false);
    }
  };

  // Delete server record
  const deleteServer = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${url}/api/servers/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      alert('Server record deleted successfully!');
      fetchServers(); // Refresh the data
    } catch (error) {
      console.error('Error deleting server record:', error);
      alert('Failed to delete server record: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete all server records
  const deleteAllServers = async () => {
    if (!window.confirm('Are you sure you want to delete ALL server records? This action cannot be undone!')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${url}/api/servers/deleteAll`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      alert('All server records deleted successfully!');
      fetchServers(); // Refresh the data
    } catch (error) {
      console.error('Error deleting all server records:', error);
      alert('Failed to delete all server records: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleFormSubmit = (values) => {
    if (selectedRecord) {
      updateServer(selectedRecord._id, values);
    } else {
      createServer(values);
    }
  };

  // Show modal for creating/editing
  const showModal = (record = null) => {
    setSelectedRecord(record);
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  // View server details
  const viewServerDetails = (record) => {
    setViewRecord(record);
    setViewModalVisible(true);
  };

  // Add action column to the columns array
  const actionColumn = {
    title: 'Actions',
    key: 'action',
    fixed: 'right',
    render: (_, record) => (
      <Space size="small">
        <Button size="small" onClick={() => viewServerDetails(record)}>View</Button>
        <Button size="small" onClick={() => getServerById(record.key)}>Edit</Button>
        <Button size="small" onClick={() => deleteServer(record.key)}>Delete</Button>
      </Space>
    ),
  };

  // Add the action column to columns array
  const columnsWithActions = [...columns, actionColumn];

  return (
    <Card className="report-card">
      <Title level={3}><CloudServerOutlined /> Server Report</Title>

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
        <Button icon={<ReloadOutlined />} onClick={handleRefresh}>Refresh</Button>
        <Upload {...uploadProps}>
          <Button
            icon={<UploadOutlined />}
            loading={importLoading}
          >
            Import Excel
          </Button>
        </Upload>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>Add New</Button>
        <Button danger icon={<DeleteOutlined />} onClick={deleteAllServers}>Delete All</Button>
      </Space>

      <Table
        columns={columnsWithActions}
        dataSource={data}
        scroll={{ x: 'max-content' }}
        loading={loading}
        pagination={{
          showSizeChanger: true,
          showTotal: (total) => <div style={{ margin: '0 16px' }}><strong>Total Entries:</strong> {total}</div>,
        }}
      />

      {/* Modal for Create/Edit */}
      <Modal
        title={selectedRecord ? "Edit Server Record" : "Add New Server Record"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="physical" label="Physical" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="company" label="Company" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="idNo" label="ID No." rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="department" label="Department">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="location" label="Location">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="computerName" label="Computer Name">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="userName" label="User Name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="desktop" label="Desktop">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="ip" label="IP">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="macAddress" label="MAC Address">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="os" label="OS">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="processor" label="Processor">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="ram" label="RAM">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="hardDisk" label="Hard Disk">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="antivirus" label="Antivirus">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="serialNo" label="Serial No.">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="purchaseFrom" label="Purchase From">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="purchaseDate" label="Purchase Date">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                {selectedRecord ? 'Update' : 'Create'}
              </Button>
              <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal for View Details */}
      <Modal
        title="Server Details"
        visible={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalVisible(false)}>
            Close
          </Button>,
          <Button
            key="edit"
            type="primary"
            onClick={() => {
              setViewModalVisible(false);
              getServerById(viewRecord.key);
            }}
          >
            Edit
          </Button>
        ]}
        width={800}
      >
        {viewRecord && (
          <div className="server-details">
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Physical">{viewRecord.physical}</Descriptions.Item>
              <Descriptions.Item label="Company">{viewRecord.company}</Descriptions.Item>
              <Descriptions.Item label="ID No.">{viewRecord.idNo}</Descriptions.Item>
              <Descriptions.Item label="Department">{viewRecord.department}</Descriptions.Item>
              <Descriptions.Item label="Location">{viewRecord.location}</Descriptions.Item>
              <Descriptions.Item label="Computer Name">{viewRecord.computerName}</Descriptions.Item>
              <Descriptions.Item label="User Name">{viewRecord.userName}</Descriptions.Item>
              <Descriptions.Item label="Desktop">{viewRecord.desktop}</Descriptions.Item>
              <Descriptions.Item label="IP">{viewRecord.ip}</Descriptions.Item>
              <Descriptions.Item label="MAC Address">{viewRecord.macAddress}</Descriptions.Item>
              <Descriptions.Item label="OS">{viewRecord.os}</Descriptions.Item>
              <Descriptions.Item label="Processor">{viewRecord.processor}</Descriptions.Item>
              <Descriptions.Item label="RAM">{viewRecord.ram}</Descriptions.Item>
              <Descriptions.Item label="Hard Disk">{viewRecord.hardDisk}</Descriptions.Item>
              <Descriptions.Item label="Antivirus">{viewRecord.antivirus}</Descriptions.Item>
              <Descriptions.Item label="Serial No.">{viewRecord.serialNo}</Descriptions.Item>
              <Descriptions.Item label="Purchase From">{viewRecord.purchaseFrom}</Descriptions.Item>
              <Descriptions.Item label="Purchase Date">{viewRecord.purchaseDate}</Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default ServerReport;