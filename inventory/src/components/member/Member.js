import React, { useState } from 'react';
import { Card, Typography, Button, Table, Space, Input, Modal, Form, Select, Avatar, Tag } from 'antd';
import { SearchOutlined, UserAddOutlined, EditOutlined, DeleteOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;
const { Password } = Input;

const Member = () => {
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingMember, setEditingMember] = useState(null);
  
  // Sample data - replace with actual data from your backend
  const [data, setData] = useState([
    {
      key: '1',
      userId: 'USR001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      department: 'IT',
      status: 'Active',
      lastLogin: '2023-10-15 09:30:45'
    },
    {
      key: '2',
      userId: 'USR002',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Manager',
      department: 'Finance',
      status: 'Active',
      lastLogin: '2023-10-14 14:22:10'
    },
    {
      key: '3',
      userId: 'USR003',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      role: 'User',
      department: 'HR',
      status: 'Inactive',
      lastLogin: '2023-09-28 11:15:33'
    },
  ]);
  
  const columns = [
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) => {
        return Object.keys(record).some(key => 
          String(record[key]).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <Space>
          <Avatar style={{ backgroundColor: '#1890ff' }}>{text.charAt(0)}</Avatar>
          {text}
        </Space>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        let color = 'blue';
        if (role === 'Admin') {
          color = 'red';
        } else if (role === 'Manager') {
          color = 'green';
        }
        return <Tag color={color}>{role}</Tag>;
      }
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = status === 'Active' ? 'green' : 'volcano';
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
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
            icon={<LockOutlined />} 
            onClick={() => handleResetPassword(record)}
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
    setEditingMember(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingMember(record);
    form.setFieldsValue({
      ...record,
      password: '', // Don't populate password field
      confirmPassword: ''
    });
    setIsModalVisible(true);
  };

  const handleResetPassword = (record) => {
    Modal.confirm({
      title: 'Reset Password',
      content: `Are you sure you want to reset the password for ${record.name}?`,
      onOk() {
        // Implement password reset logic here
        console.log('Password reset for:', record);
      },
    });
  };

  const handleDelete = (key) => {
    Modal.confirm({
      title: 'Delete User',
      content: 'Are you sure you want to delete this user?',
      onOk() {
        setData(data.filter(item => item.key !== key));
      },
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      const { confirmPassword, ...userData } = values;
      
      if (editingMember) {
        // Update existing member
        setData(data.map(item => 
          item.key === editingMember.key ? { ...item, ...userData } : item
        ));
      } else {
        // Add new member
        const newMember = {
          key: `USR${data.length + 1}`.padStart(6, '0'),
          userId: `USR${data.length + 1}`.padStart(6, '0'),
          ...userData,
          status: 'Active',
          lastLogin: 'Never'
        };
        setData([...data, newMember]);
      }
      setIsModalVisible(false);
    });
  };

  return (
    <Card className="member-card">
      <Title level={3}>Member Management</Title>
      
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search"
          onChange={handleSearch}
          prefix={<SearchOutlined />}
          style={{ width: 200 }}
        />
        <Button type="primary" icon={<UserAddOutlined />} onClick={showModal}>
          Add New Member
        </Button>
      </Space>
      
      <Table 
        columns={columns} 
        dataSource={data} 
        scroll={{ x: 'max-content' }}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingMember ? "Edit Member" : "Add New Member"}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input placeholder="Enter name" />
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
          
          {!editingMember && (
            <>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please enter password' }]}
              >
                <Input.Password placeholder="Enter password" />
              </Form.Item>
              
              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Please confirm password' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords do not match'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm password" />
              </Form.Item>
            </>
          )}
          
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select role' }]}
          >
            <Select placeholder="Select role">
              <Option value="Admin">Admin</Option>
              <Option value="Manager">Manager</Option>
              <Option value="User">User</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="department"
            label="Department"
            rules={[{ required: true, message: 'Please select department' }]}
          >
            <Select placeholder="Select department">
              <Option value="IT">IT</Option>
              <Option value="Finance">Finance</Option>
              <Option value="HR">HR</Option>
              <Option value="Operations">Operations</Option>
              <Option value="Sales">Sales</Option>
              <Option value="Marketing">Marketing</Option>
            </Select>
          </Form.Item>
          
          {editingMember && (
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
      </Modal>
    </Card>
  );
};

export default Member;