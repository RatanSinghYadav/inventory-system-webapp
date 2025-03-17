import React from 'react';
import { Form, Input, Button, Select, Card, Row, Col, Typography, Space } from 'antd';
import { DesktopOutlined, SaveOutlined, ClearOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const DesktopEntry = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values:', values);
    // Here you would typically save the data to your backend
    alert('Desktop entry saved successfully!');
    form.resetFields();
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Card className="inventory-card">
      <Title level={3}><DesktopOutlined /> Desktop Entry Form</Title>
      
      <Form
        form={form}
        name="desktopEntryForm"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="physical"
              label="Physical"
              rules={[{ required: true, message: 'Please enter physical details' }]}
            >
              <Input placeholder="Enter physical details" />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="company"
              label="Company"
              rules={[{ required: true, message: 'Please enter company name' }]}
            >
              <Input placeholder="Enter company name" />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="idNo"
              label="Id. No."
              rules={[{ required: true, message: 'Please enter ID number' }]}
            >
              <Input placeholder="Enter ID number" />
            </Form.Item>
          </Col>
        </Row>
        
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="department"
              label="Department"
              rules={[{ required: true, message: 'Please select department' }]}
            >
              <Select placeholder="Select department">
                <Option value="it">IT</Option>
                <Option value="hr">HR</Option>
                <Option value="finance">Finance</Option>
                <Option value="operations">Operations</Option>
                <Option value="sales">Sales</Option>
                <Option value="marketing">Marketing</Option>
              </Select>
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="location"
              label="Location"
              rules={[{ required: true, message: 'Please enter location' }]}
            >
              <Input placeholder="Enter location" />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="computerName"
              label="Computer Name"
              rules={[{ required: true, message: 'Please enter computer name' }]}
            >
              <Input placeholder="Enter computer name" />
            </Form.Item>
          </Col>
        </Row>
        
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="userName"
              label="User Name"
              rules={[{ required: true, message: 'Please enter user name' }]}
            >
              <Input placeholder="Enter user name" />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="desktop"
              label="Desktop"
              rules={[{ required: true, message: 'Please enter desktop details' }]}
            >
              <Input placeholder="Enter desktop details" />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="ip"
              label="IP"
              rules={[{ required: true, message: 'Please enter IP address' }]}
            >
              <Input placeholder="Enter IP address" />
            </Form.Item>
          </Col>
        </Row>
        
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="macAddress"
              label="MAC Address"
              rules={[{ required: true, message: 'Please enter MAC address' }]}
            >
              <Input placeholder="Enter MAC address" />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="os"
              label="OS"
              rules={[{ required: true, message: 'Please enter operating system' }]}
            >
              <Select placeholder="Select operating system">
                <Option value="windows10">Windows 10</Option>
                <Option value="windows11">Windows 11</Option>
                <Option value="macos">macOS</Option>
                <Option value="linux">Linux</Option>
              </Select>
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="processor"
              label="Processor"
              rules={[{ required: true, message: 'Please enter processor details' }]}
            >
              <Input placeholder="Enter processor details" />
            </Form.Item>
          </Col>
        </Row>
        
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="ram"
              label="RAM"
              rules={[{ required: true, message: 'Please enter RAM details' }]}
            >
              <Select placeholder="Select RAM size">
                <Option value="4gb">4 GB</Option>
                <Option value="8gb">8 GB</Option>
                <Option value="16gb">16 GB</Option>
                <Option value="32gb">32 GB</Option>
                <Option value="64gb">64 GB</Option>
              </Select>
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="hardDisk"
              label="Hard Disk"
              rules={[{ required: true, message: 'Please enter hard disk details' }]}
            >
              <Select placeholder="Select hard disk size">
                <Option value="256gb">256 GB SSD</Option>
                <Option value="512gb">512 GB SSD</Option>
                <Option value="1tb">1 TB HDD</Option>
                <Option value="2tb">2 TB HDD</Option>
              </Select>
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="antivirus"
              label="Antivirus"
              rules={[{ required: true, message: 'Please enter antivirus details' }]}
            >
              <Select placeholder="Select antivirus">
                <Option value="norton">Norton</Option>
                <Option value="mcafee">McAfee</Option>
                <Option value="kaspersky">Kaspersky</Option>
                <Option value="avast">Avast</Option>
                <Option value="windowsDefender">Windows Defender</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              Save
            </Button>
            <Button htmlType="button" onClick={onReset} icon={<ClearOutlined />}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default DesktopEntry;