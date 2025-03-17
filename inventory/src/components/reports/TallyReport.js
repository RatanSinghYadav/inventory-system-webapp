import React, { useState, useEffect } from 'react';
import { Table, Card, Typography, Input, Button, Space, DatePicker, message, Upload, Modal, Form, Row, Col, Descriptions } from 'antd';
import { SearchOutlined, DownloadOutlined, PrinterOutlined, FilterOutlined, ReloadOutlined, UploadOutlined, PlusOutlined, DeleteOutlined, AccountBookOutlined } from '@ant-design/icons';
import { url } from '../../utils/constent';
import moment from 'moment';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const TallyReport = () => {
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
  const fetchTallies = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/api/tallies/getAllTallies`, {
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
        serialNo: item.serialNo || '',
        tsn: item.tsn || '',
        edition: item.edition || '',
        userName: item.userName || '',
        configEmailId: item.configEmailId || '',
        companyName: item.companyName || '',
        date: item.date || '',
        newDate: item.newDate || '',
        working: item.working || '',
        version: item.version || '',
        remark: item.remark || ''
      }));
      setData(formattedData);
    } catch (error) {
      console.error('Error fetching tally data:', error);
      message.error('Failed to fetch tally data');
    } finally {
      setLoading(false);
    }
  };

  // Load data when component mounts
  useEffect(() => {
    fetchTallies();
  }, []);

  const columns = [
    {
      title: 'Serial No.',
      dataIndex: 'serialNo',
      key: 'serialNo',
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) => {
        return Object.keys(record).some(key =>
          String(record[key]).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: 'TSN',
      dataIndex: 'tsn',
      key: 'tsn',
    },
    {
      title: 'Edition',
      dataIndex: 'edition',
      key: 'edition',
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Config Email ID',
      dataIndex: 'configEmailId',
      key: 'configEmailId',
    },
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => {
        if (!text) return '';
        try {
          const date = new Date(text);
          return date.toLocaleDateString();
        } catch (e) {
          return text;
        }
      }
    },
    {
      title: 'New Date',
      dataIndex: 'newDate',
      key: 'newDate',
      render: (text) => {
        if (!text) return '';
        try {
          const date = new Date(text);
          return date.toLocaleDateString();
        } catch (e) {
          return text;
        }
      }
    },
    {
      title: 'Working',
      dataIndex: 'working',
      key: 'working',
    },
    {
      title: 'Version',
      dataIndex: 'version',
      key: 'version',
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
        const response = await fetch(`${url}/api/tallies/export`, {
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
          link.download = 'tally_report.xlsx';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(downloadUrl);

          message.destroy();
          message.success('Tally report exported successfully');
          setLoading(false);
          return;
        }
      } catch (error) {
        console.log('Server export failed, falling back to client-side export');
      }

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
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Tallies');

        // Generate Excel file and trigger download
        XLSX.writeFile(workbook, 'tally report.xlsx');

        message.destroy();
        message.success('Tally report exported successfully');
      }).catch(err => {
        console.error('Failed to load xlsx library:', err);
        message.destroy();
        message.error('Failed to export: Could not load export library');
      });

    } catch (error) {
      console.error('Error exporting tally data:', error);
      message.destroy();
      message.error('Failed to export tally data');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleRefresh = () => {
    fetchTallies();
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

      const response = await fetch(`${url}/api/tallies/import`, {
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
          alert('Duplicate entry found. Please check your data and try again.');
          return;
        }

        throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      alert('Data imported successfully!');
      fetchTallies(); // Refresh the data
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

  // Create new tally record
  const createTally = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/api/tallies/create`, {
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
      alert('Tally record created successfully!');
      fetchTallies(); // Refresh the data
    } catch (error) {
      console.error('Error creating tally record:', error);
      alert('Failed to create tally record: ' + error.message);
    } finally {
      setLoading(false);
      setIsModalVisible(false);
    }
  };

  // Get tally by ID
  const getTallyById = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/api/tallies/getTally/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      
      // Format dates for form
      const formData = { ...result.data };
      if (formData.date) {
        formData.date = moment(formData.date);
      }
      if (formData.newDate) {
        formData.newDate = moment(formData.newDate);
      }
      
      setSelectedRecord(result.data);
      form.setFieldsValue(formData);
      setIsModalVisible(true);
    } catch (error) {
      console.error('Error fetching tally record:', error);
      alert('Failed to fetch tally record: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Update tally record
  const updateTally = async (id, values) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/api/tallies/update/${id}`, {
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
      alert('Tally record updated successfully!');
      fetchTallies(); // Refresh the data
    } catch (error) {
      console.error('Error updating tally record:', error);
      alert('Failed to update tally record: ' + error.message);
    } finally {
      setLoading(false);
      setIsModalVisible(false);
    }
  };

  // Delete tally record
  const deleteTally = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${url}/api/tallies/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      alert('Tally record deleted successfully!');
      fetchTallies(); // Refresh the data
    } catch (error) {
      console.error('Error deleting tally record:', error);
      alert('Failed to delete tally record: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete all tally records
  const deleteAllTallies = async () => {
    if (!window.confirm('Are you sure you want to delete ALL tally records? This action cannot be undone!')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${url}/api/tallies/deleteAll`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      alert('All tally records deleted successfully!');
      fetchTallies(); // Refresh the data
    } catch (error) {
      console.error('Error deleting all tally records:', error);
      alert('Failed to delete all tally records: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleFormSubmit = (values) => {
    // Convert DatePicker values to ISO string format for API
    const formattedValues = { ...values };
    if (values.date) {
      formattedValues.date = values.date.toISOString();
    }
    if (values.newDate) {
      formattedValues.newDate = values.newDate.toISOString();
    }
    
    if (selectedRecord) {
      updateTally(selectedRecord._id, formattedValues);
    } else {
      createTally(formattedValues);
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

  // View tally details
  const viewTallyDetails = (record) => {
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
        <Button size="small" onClick={() => viewTallyDetails(record)}>View</Button>
        <Button size="small" onClick={() => getTallyById(record.key)}>Edit</Button>
        <Button size="small" onClick={() => deleteTally(record.key)}>Delete</Button>
      </Space>
    ),
  };

  // Add the action column to columns array
  const columnsWithActions = [...columns, actionColumn];

  return (
    <Card className="report-card">
      <Title level={3}><AccountBookOutlined /> Tally Report</Title>

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
        <Button danger icon={<DeleteOutlined />} onClick={deleteAllTallies}>Delete All</Button>
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
        title={selectedRecord ? "Edit Tally Record" : "Add New Tally Record"}
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
              <Form.Item name="serialNo" label="Serial No." rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="tsn" label="TSN" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="edition" label="Edition" rules={[{ required: true }]}>
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
              <Form.Item name="configEmailId" label="Config Email ID">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="companyName" label="Company Name">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="date" label="Date">
                <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="newDate" label="New Date">
                <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="working" label="Working">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="version" label="Version">
                <Input />
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
        title="Tally Details"
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
              getTallyById(viewRecord.key);
            }}
          >
            Edit
          </Button>
        ]}
        width={800}
      >
        {viewRecord && (
          <div className="tally-details">
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Serial No.">{viewRecord.serialNo}</Descriptions.Item>
              <Descriptions.Item label="TSN">{viewRecord.tsn}</Descriptions.Item>
              <Descriptions.Item label="Edition">{viewRecord.edition}</Descriptions.Item>
              <Descriptions.Item label="User Name">{viewRecord.userName}</Descriptions.Item>
              <Descriptions.Item label="Config Email ID">{viewRecord.configEmailId}</Descriptions.Item>
              <Descriptions.Item label="Company Name">{viewRecord.companyName}</Descriptions.Item>
              <Descriptions.Item label="Date">{viewRecord.date}</Descriptions.Item>
              <Descriptions.Item label="New Date">{viewRecord.newDate}</Descriptions.Item>
              <Descriptions.Item label="Working">{viewRecord.working}</Descriptions.Item>
              <Descriptions.Item label="Version">{viewRecord.version}</Descriptions.Item>
              <Descriptions.Item label="Remark" span={2}>{viewRecord.remark}</Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>

    </Card>
  );
};

export default TallyReport;