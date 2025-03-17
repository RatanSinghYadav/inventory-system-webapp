import React, { useState, useEffect } from 'react';
import { Table, Card, Typography, Input, Button, Space, DatePicker, message, Upload, Modal, Form, Row, Col, Descriptions } from 'antd';
import { SearchOutlined, DownloadOutlined, ScanOutlined, FilterOutlined, ReloadOutlined, UploadOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { url } from '../../utils/constent';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const ScannerReport = () => {
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
  const fetchScanners = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/api/scanners/getAllScanners`, {
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
        idNo: item.idNo || '',
        location: item.location || '',
        department: item.department || '',
        userName: item.userName || '',
        make: item.make || '',
        modelNo: item.modelNo || '',
        category: item.category || '',
        serialNo: item.serialNo || '',
        purchaseFrom: item.purchaseFrom || '',
        purchaseDate: item.purchaseDate || '',
        remark: item.remark || ''
      }));
      setData(formattedData);
    } catch (error) {
      console.error('Error fetching scanner data:', error);
      message.error('Failed to fetch scanner data');
    } finally {
      setLoading(false);
    }
  };

  // Load data when component mounts
  useEffect(() => {
    fetchScanners();
  }, []);

  const columns = [
    {
      title: 'ID No.',
      dataIndex: 'idNo',
      key: 'idNo',
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) => {
        return Object.keys(record).some(key =>
          String(record[key]).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Make',
      dataIndex: 'make',
      key: 'make',
    },
    {
      title: 'Model No.',
      dataIndex: 'modelNo',
      key: 'modelNo',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
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
    {
      title: 'Remark',
      dataIndex: 'remark',
      key: 'remark',
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
        const response = await fetch(`${url}/api/scanners/export`, {
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
          link.download = 'scanner_report.xlsx';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(downloadUrl);

          message.destroy();
          message.success('Scanner report exported successfully');
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
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Scanners');

        // Generate Excel file and trigger download
        XLSX.writeFile(workbook, 'scanner report.xlsx');

        message.destroy();
        message.success('Scanner report exported successfully');
      }).catch(err => {
        console.error('Failed to load xlsx library:', err);
        message.destroy();
        message.error('Failed to export: Could not load export library');
      });
      // end 

    } catch (error) {
      console.error('Error exporting scanner data:', error);
      message.destroy();
      message.error('Failed to export scanner data');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleRefresh = () => {
    fetchScanners();
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
    // Add a parameter to indicate we want to keep rows with at least one field
    formData.append('keepPartialRows', 'true');

    try {
      console.log('Uploading file:', file.name, file.type, file.size);

      const response = await fetch(`${url}/api/scanners/import`, {
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
          let scannerName = "unknown";
          let isDuplicateScannerName = false;

          try {
            // Try to extract the ID from error message
            const idMatch = errorData.error.match(/idNo: "([^"]+)"/);
            const scannerNameMatch = errorData.error.match(/duplicate key error collection: .*? index: .*? dup key: { : "([^"]+)" }/);

            if (idMatch && idMatch[1]) {
              duplicateId = idMatch[1];
            } else if (errorData.error.includes('duplicate key')) {
              // Try to extract the scanner name from error message
              if (scannerNameMatch && scannerNameMatch[1]) {
                scannerName = scannerNameMatch[1];
                isDuplicateScannerName = true;
              }
            }
          } catch (e) {
            console.log("Could not extract duplicate information", e);
          }

          // Use browser's built-in alert with more specific information
          if (isDuplicateScannerName) {
            alert(`Duplicate Scanner Name Found: ${scannerName}\n\n` +
              'This Scanner Name already exists in the database. Please remove this duplicate entry from your Excel file and try again.\n\n' +
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
      fetchScanners();
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

  // Create new scanner record
  const createScanner = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/api/scanners/create`, {
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
      alert('Scanner record created successfully!');
      fetchScanners(); // Refresh the data
    } catch (error) {
      console.error('Error creating scanner record:', error);
      alert('Failed to create scanner record: ' + error.message);
    } finally {
      setLoading(false);
      setIsModalVisible(false);
    }
  };

  // Get scanner by ID
  const getScannerById = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/api/scanners/getScanner/${id}`, {
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
      console.error('Error fetching scanner record:', error);
      alert('Failed to fetch scanner record: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Update scanner record
  const updateScanner = async (id, values) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/api/scanners/update/${id}`, {
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
      alert('Scanner record updated successfully!');
      fetchScanners(); // Refresh the data
    } catch (error) {
      console.error('Error updating scanner record:', error);
      alert('Failed to update scanner record: ' + error.message);
    } finally {
      setLoading(false);
      setIsModalVisible(false);
    }
  };

  // Delete scanner record
  const deleteScanner = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${url}/api/scanners/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      alert('Scanner record deleted successfully!');
      fetchScanners(); // Refresh the data
    } catch (error) {
      console.error('Error deleting scanner record:', error);
      alert('Failed to delete scanner record: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete all scanner records
  const deleteAllScanners = async () => {
    if (!window.confirm('Are you sure you want to delete ALL scanner records? This action cannot be undone!')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${url}/api/scanners/deleteAll`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      alert('All scanner records deleted successfully!');
      fetchScanners(); // Refresh the data
    } catch (error) {
      console.error('Error deleting all scanner records:', error);
      alert('Failed to delete all scanner records: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleFormSubmit = (values) => {
    if (selectedRecord) {
      updateScanner(selectedRecord._id, values);
    } else {
      createScanner(values);
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

  // View scanner details
  const viewScannerDetails = (record) => {
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
        <Button size="small" onClick={() => viewScannerDetails(record)}>View</Button>
        <Button size="small" onClick={() => getScannerById(record.key)}>Edit</Button>
        <Button size="small" onClick={() => deleteScanner(record.key)}>Delete</Button>
      </Space>
    ),
  };

  // Add the action column to columns array
  const columnsWithActions = [...columns, actionColumn];

  return (
    <Card className="report-card">
      <Title level={3}><ScanOutlined /> Scanner Report</Title>

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
        <Button icon={<ScanOutlined />} onClick={handlePrint}>Print</Button>
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
        <Button danger icon={<DeleteOutlined />} onClick={deleteAllScanners}>Delete All</Button>
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
        title={selectedRecord ? "Edit Scanner Record" : "Add New Scanner Record"}
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
              <Form.Item name="idNo" label="ID No." rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="location" label="Location">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="department" label="Department">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="userName" label="User Name">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="make" label="Make">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="modelNo" label="Model No.">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="category" label="Category">
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
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="remark" label="Remark">
                <Input.TextArea rows={4} />
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
        title="Scanner Details"
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
              getScannerById(viewRecord.key);
            }}
          >
            Edit
          </Button>
        ]}
        width={800}
      >
        {viewRecord && (
          <div className="scanner-details">
            <Descriptions bordered column={2}>
              <Descriptions.Item label="ID No.">{viewRecord.idNo}</Descriptions.Item>
              <Descriptions.Item label="Location">{viewRecord.location}</Descriptions.Item>
              <Descriptions.Item label="Department">{viewRecord.department}</Descriptions.Item>
              <Descriptions.Item label="User Name">{viewRecord.userName}</Descriptions.Item>
              <Descriptions.Item label="Make">{viewRecord.make}</Descriptions.Item>
              <Descriptions.Item label="Model No.">{viewRecord.modelNo}</Descriptions.Item>
              <Descriptions.Item label="Category">{viewRecord.category}</Descriptions.Item>
              <Descriptions.Item label="Serial No.">{viewRecord.serialNo}</Descriptions.Item>
              <Descriptions.Item label="Purchase From">{viewRecord.purchaseFrom}</Descriptions.Item>
              <Descriptions.Item label="Purchase Date">{viewRecord.purchaseDate}</Descriptions.Item>
              <Descriptions.Item label="Remark" span={2}>{viewRecord.remark}</Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default ScannerReport;