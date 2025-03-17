import React, { useState } from 'react';
import { Table, Card, Typography, Input, Button, Space, DatePicker, Tag, Modal, Form, Select } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;

const IssueManagement = () => {
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingIssue, setEditingIssue] = useState(null);
  
  // Sample data - replace with actual data from your backend
  const [data, setData] = useState([
    {
      key: '1',
      issueId: 'ISS001',
      assetId: 'AST001',
      assetType: 'Laptop',
      reportedBy: 'John Doe',
      reportedDate: '2023-10-15',
      issueDescription: 'System crashes frequently',
      status: 'Open',
      priority: 'High',
      assignedTo: 'Tech Support',
      resolution: '',
      resolutionDate: ''
    },
    {
      key: '2',
      issueId: 'ISS002',
      assetId: 'AST005',
      assetType: 'Printer',
      reportedBy: 'Jane Smith',
      reportedDate: '2023-10-10',
      issueDescription: 'Paper jam issues',
      status: 'In Progress',
      priority: 'Medium',
      assignedTo: 'Printer Support',
      resolution: 'Scheduled for maintenance',
      resolutionDate: ''
    },
    {
      key: '3',
      issueId: 'ISS003',
      assetId: 'AST010',
      assetType: 'Desktop',
      reportedBy: 'Mike Johnson',
      reportedDate: '2023-09-28',
      issueDescription: 'Blue screen error',
      status: 'Resolved',
      priority: 'High',
      assignedTo: 'IT Support',
      resolution: 'Reinstalled OS and updated drivers',
      resolutionDate: '2023-10-05'
    },
  ]);
  
  const columns = [
    {
      title: 'Issue ID',
      dataIndex: 'issueId',
      key: 'issueId',
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) => {
        return Object.keys(record).some(key => 
          String(record[key]).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: 'Asset ID',
      dataIndex: 'assetId',
      key: 'assetId',
    },
    {
      title: 'Asset Type',
      dataIndex: 'assetType',
      key: 'assetType',
    },
    {
      title: 'Reported By',
      dataIndex: 'reportedBy',
      key: 'reportedBy',
    },
    {
      title: 'Reported Date',
      dataIndex: 'reportedDate',
      key: 'reportedDate',
    },
    {
      title: 'Issue Description',
      dataIndex: 'issueDescription',
      key: 'issueDescription',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'green';
        if (status === 'Open') {
          color = 'red';
        } else if (status === 'In Progress') {
          color = 'orange';
        }
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => {
        let color = 'green';
        if (priority === 'High') {
          color = 'red';
        } else if (priority === 'Medium') {
          color = 'orange';
        }
        return <Tag color={color}>{priority}</Tag>;
      }
    },
    {
      title: 'Assigned To',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
    },
    {
      title: 'Resolution',
      dataIndex: 'resolution',
      key: 'resolution',
    },
    {
      title: 'Resolution Date',
      dataIndex: 'resolutionDate',
      key: 'resolutionDate',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
            size="small"
          />
          <Button 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.key)}
            danger
            size="small"
          />
        </Space>
      ),
    },
  ];

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const showModal = () => {
    form.resetFields();
    setEditingIssue(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingIssue(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (key) => {
    setData(data.filter(item => item.key !== key));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      if (editingIssue) {
        // Update existing issue
        setData(data.map(item => 
          item.key === editingIssue.key ? { ...item, ...values } : item
        ));
      } else {
        // Add new issue
        const newIssue = {
          key: `ISS${data.length + 1}`.padStart(6, '0'),
          issueId: `ISS${data.length + 1}`.padStart(6, '0'),
          ...values,
        };
        setData([...data, newIssue]);
      }
      setIsModalVisible(false);
    });
  };

  return (
    <Card className="issue-card">
      <Title level={3}>Issue Management</Title>
      
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search"
          onChange={handleSearch}
          prefix={<SearchOutlined />}
          style={{ width: 200 }}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Add New Issue
        </Button>
      </Space>
      
      <Table 
        columns={columns} 
        dataSource={data} 
        scroll={{ x: 'max-content' }}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingIssue ? "Edit Issue" : "Add New Issue"}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="assetId"
            label="Asset ID"
            rules={[{ required: true, message: 'Please enter asset ID' }]}
          >
            <Input placeholder="Enter asset ID" />
          </Form.Item>
          
          <Form.Item
            name="assetType"
            label="Asset Type"
            rules={[{ required: true, message: 'Please select asset type' }]}
          >
            <Select placeholder="Select asset type">
              <Option value="Laptop">Laptop</Option>
              <Option value="Desktop">Desktop</Option>
              <Option value="Printer">Printer</Option>
              <Option value="Server">Server</Option>
              <Option value="Switch">Switch</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="reportedBy"
            label="Reported By"
            rules={[{ required: true, message: 'Please enter reporter name' }]}
          >
            <Input placeholder="Enter reporter name" />
          </Form.Item>
          
          <Form.Item
            name="reportedDate"
            label="Reported Date"
            rules={[{ required: true, message: 'Please select reported date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item
            name="issueDescription"
            label="Issue Description"
            rules={[{ required: true, message: 'Please enter issue description' }]}
          >
            <TextArea rows={4} placeholder="Enter issue description" />
          </Form.Item>
          
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select placeholder="Select status">
              <Option value="Open">Open</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Resolved">Resolved</Option>
              <Option value="Closed">Closed</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true, message: 'Please select priority' }]}
          >
            <Select placeholder="Select priority">
              <Option value="Low">Low</Option>
              <Option value="Medium">Medium</Option>
              <Option value="High">High</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="assignedTo"
            label="Assigned To"
            rules={[{ required: true, message: 'Please enter assignee' }]}
          >
            <Input placeholder="Enter assignee" />
          </Form.Item>
          
          <Form.Item
            name="resolution"
            label="Resolution"
          >
            <TextArea rows={4} placeholder="Enter resolution details" />
          </Form.Item>
          
          <Form.Item
            name="resolutionDate"
            label="Resolution Date"
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default IssueManagement;