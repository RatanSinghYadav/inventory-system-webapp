import React, { useState } from 'react';
import { Card, Typography, Tabs, Form, Input, Button, Select, Table, Space, Modal, Divider } from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  SaveOutlined, 
  BankOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  AppstoreOutlined
} from '@ant-design/icons';

const { Title } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const Master = () => {
  // Department state
  const [departments, setDepartments] = useState([
    { key: '1', name: 'IT', description: 'Information Technology', status: 'Active' },
    { key: '2', name: 'Finance', description: 'Finance and Accounting', status: 'Active' },
    { key: '3', name: 'HR', description: 'Human Resources', status: 'Active' },
    { key: '4', name: 'Operations', description: 'Operations', status: 'Active' },
    { key: '5', name: 'Sales', description: 'Sales', status: 'Active' },
    { key: '6', name: 'Marketing', description: 'Marketing', status: 'Active' },
  ]);
  
  // Location state
  const [locations, setLocations] = useState([
    { key: '1', name: 'Headquarters', address: '123 Main St, City', status: 'Active' },
    { key: '2', name: 'Branch Office 1', address: '456 Oak Ave, Town', status: 'Active' },
    { key: '3', name: 'Branch Office 2', address: '789 Pine Rd, Village', status: 'Active' },
  ]);
  
  // Company state
  const [companies, setCompanies] = useState([
    { key: '1', name: 'ABC Corp', address: '123 Main St, City', contactPerson: 'John Doe', phone: '123-456-7890', email: 'info@abccorp.com', status: 'Active' },
    { key: '2', name: 'XYZ Ltd', address: '456 Oak Ave, Town', contactPerson: 'Jane Smith', phone: '987-654-3210', email: 'info@xyzltd.com', status: 'Active' },
  ]);
  
  // Asset Types state
  const [assetTypes, setAssetTypes] = useState([
    { key: '1', name: 'Laptop', description: 'Portable computers', status: 'Active' },
    { key: '2', name: 'Desktop', description: 'Desktop computers', status: 'Active' },
    { key: '3', name: 'Server', description: 'Server machines', status: 'Active' },
    { key: '4', name: 'Printer', description: 'Printing devices', status: 'Active' },
    { key: '5', name: 'Scanner', description: 'Scanning devices', status: 'Active' },
    { key: '6', name: 'Switch', description: 'Network switches', status: 'Active' },
  ]);
  
  // Modal state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();
  
  // Department columns
  const departmentColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => handleEdit('department', record)}
            size="small"
          />
          <Button 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete('department', record.key)}
            danger
            size="small"
          />
        </Space>
      ),
    },
  ];
  
  // Location columns
  const locationColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => handleEdit('location', record)}
            size="small"
          />
          <Button 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete('location', record.key)}
            danger
            size="small"
          />
        </Space>
      ),
    },
  ];
  
  // Company columns
  const companyColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Contact Person',
      dataIndex: 'contactPerson',
      key: 'contactPerson',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => handleEdit('company', record)}
            size="small"
          />
          <Button 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete('company', record.key)}
            danger
            size="small"
          />
        </Space>
      ),
    },
  ];
  
  // Asset Type columns
  const assetTypeColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => handleEdit('assetType', record)}
            size="small"
          />
          <Button 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete('assetType', record.key)}
            danger
            size="small"
          />
        </Space>
      ),
    },
  ];
  
  // Handle add new item
  const handleAdd = (type) => {
    setModalType(type);
    setEditingItem(null);
    form.resetFields();
    setIsModalVisible(true);
  };
  
  // Handle edit item
  const handleEdit = (type, record) => {
    setModalType(type);
    setEditingItem(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };
  
  // Handle delete item
  const handleDelete = (type, key) => {
    Modal.confirm({
      title: 'Delete Item',
      content: 'Are you sure you want to delete this item?',
      onOk() {
        switch (type) {
          case 'department':
            setDepartments(departments.filter(item => item.key !== key));
            break;
          case 'location':
            setLocations(locations.filter(item => item.key !== key));
            break;
          case 'company':
            setCompanies(companies.filter(item => item.key !== key));
            break;
          case 'assetType':
            setAssetTypes(assetTypes.filter(item => item.key !== key));
            break;
          default:
            break;
        }
      },
    });
  };
  
  // Handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  
  // Handle form submit
  const handleSubmit = () => {
    form.validateFields().then(values => {
      if (editingItem) {
        // Update existing item
        switch (modalType) {
          case 'department':
            setDepartments(departments.map(item => 
              item.key === editingItem.key ? { ...item, ...values } : item
            ));
            break;
          case 'location':
            setLocations(locations.map(item => 
              item.key === editingItem.key ? { ...item, ...values } : item
            ));
            break;
          case 'company':
            setCompanies(companies.map(item => 
              item.key === editingItem.key ? { ...item, ...values } : item
            ));
            break;
          case 'assetType':
            setAssetTypes(assetTypes.map(item => 
              item.key === editingItem.key ? { ...item, ...values } : item
            ));
            break;
          default:
            break;
        }
      } else {
        // Add new item
        const newItem = {
          ...values,
          status: 'Active'
        };
        
        switch (modalType) {
          case 'department':
            newItem.key = `${departments.length + 1}`;
            setDepartments([...departments, newItem]);
            break;
          case 'location':
            newItem.key = `${locations.length + 1}`;
            setLocations([...locations, newItem]);
            break;
          case 'company':
            newItem.key = `${companies.length + 1}`;
            setCompanies([...companies, newItem]);
            break;
          case 'assetType':
            newItem.key = `${assetTypes.length + 1}`;
            setAssetTypes([...assetTypes, newItem]);
            break;
          default:
            break;
        }
      }
      
      setIsModalVisible(false);
    });
  };
  
  // Render modal content based on type
  const renderModalContent = () => {
    switch (modalType) {
      case 'department':
        return (
          <Form
            form={form}
            layout="vertical"
          >
            <Form.Item
              name="name"
              label="Department Name"
              rules={[{ required: true, message: 'Please enter department name' }]}
            >
              <Input placeholder="Enter department name" />
            </Form.Item>
            
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please enter description' }]}
            >
              <Input.TextArea rows={4} placeholder="Enter description" />
            </Form.Item>
            
            {editingItem && (
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Please select status' }]}
              >
                <Select placeholder="Select status">
                  <Option value="Active">Active</Option>
                  <Option value="Inactive">Inactive</Option>
                </Select>
              </Form.Item>
            )}
          </Form>
        );
      case 'location':
        return (
          <Form
            form={form}
            layout="vertical"
          >
            <Form.Item
              name="name"
              label="Location Name"
              rules={[{ required: true, message: 'Please enter location name' }]}
            >
              <Input placeholder="Enter location name" />
            </Form.Item>
            
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: 'Please enter address' }]}
            >
              <Input.TextArea rows={4} placeholder="Enter address" />
            </Form.Item>
            
            {editingItem && (
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Please select status' }]}
              >
                <Select placeholder="Select status">
                  <Option value="Active">Active</Option>
                  <Option value="Inactive">Inactive</Option>
                </Select>
              </Form.Item>
            )}
          </Form>
        );
      case 'company':
        return (
          <Form
            form={form}
            layout="vertical"
          >
            <Form.Item
              name="name"
              label="Company Name"
              rules={[{ required: true, message: 'Please enter company name' }]}
            >
              <Input placeholder="Enter company name" />
            </Form.Item>
            
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: 'Please enter address' }]}
            >
              <Input.TextArea rows={4} placeholder="Enter address" />
            </Form.Item>
            
            <Form.Item
              name="contactPerson"
              label="Contact Person"
              rules={[{ required: true, message: 'Please enter contact person' }]}
            >
              <Input placeholder="Enter contact person" />
            </Form.Item>
            
            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true, message: 'Please enter phone number' }]}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>
            
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>
            
            {editingItem && (
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Please select status' }]}
              >
                <Select placeholder="Select status">
                  <Option value="Active">Active</Option>
                  <Option value="Inactive">Inactive</Option>
                </Select>
              </Form.Item>
            )}
          </Form>
        );
      case 'assetType':
        return (
          <Form
            form={form}
            layout="vertical"
          >
            <Form.Item
              name="name"
              label="Asset Type Name"
              rules={[{ required: true, message: 'Please enter asset type name' }]}
            >
              <Input placeholder="Enter asset type name" />
            </Form.Item>
            
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please enter description' }]}
            >
              <Input.TextArea rows={4} placeholder="Enter description" />
            </Form.Item>
            
            {editingItem && (
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Please select status' }]}
              >
                <Select placeholder="Select status">
                  <Option value="Active">Active</Option>
                  <Option value="Inactive">Inactive</Option>
                </Select>
              </Form.Item>
            )}
          </Form>
        );
      default:
        return null;
    }
  };
  
  return (
    <Card className="master-card">
      <Title level={3}>Master Settings</Title>
      
      <Tabs defaultActiveKey="department">
        <TabPane 
          tab={<span><TeamOutlined /> Departments</span>} 
          key="department"
        >
          <div style={{ marginBottom: 16 }}>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={() => handleAdd('department')}
            >
              Add Department
            </Button>
          </div>
          <Table 
            columns={departmentColumns} 
            dataSource={departments} 
            pagination={{ pageSize: 10 }}
          />
        </TabPane>
        
        <TabPane 
          tab={<span><EnvironmentOutlined /> Locations</span>} 
          key="location"
        >
          <div style={{ marginBottom: 16 }}>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={() => handleAdd('location')}
            >
              Add Location
            </Button>
          </div>
          <Table 
            columns={locationColumns} 
            dataSource={locations} 
            pagination={{ pageSize: 10 }}
          />
        </TabPane>
        
        <TabPane 
          tab={<span><BankOutlined /> Companies</span>} 
          key="company"
        >
          <div style={{ marginBottom: 16 }}>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={() => handleAdd('company')}
            >
              Add Company
            </Button>
          </div>
          <Table 
            columns={companyColumns} 
            dataSource={companies} 
            pagination={{ pageSize: 10 }}
          />
        </TabPane>
        
        <TabPane 
          tab={<span><AppstoreOutlined /> Asset Types</span>} 
          key="assetType"
        >
          <div style={{ marginBottom: 16 }}>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={() => handleAdd('assetType')}
            >
              Add Asset Type
            </Button>
          </div>
          <Table 
            columns={assetTypeColumns} 
            dataSource={assetTypes} 
            pagination={{ pageSize: 10 }}
          />
        </TabPane>
      </Tabs>
      
      <Modal
        title={editingItem ? `Edit ${modalType.charAt(0).toUpperCase() + modalType.slice(1)}` : `Add ${modalType.charAt(0).toUpperCase() + modalType.slice(1)}`}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
        width={600}
      >
        {renderModalContent()}
      </Modal>
    </Card>
  );
};

export default Master;