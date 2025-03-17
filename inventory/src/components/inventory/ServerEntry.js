import React from 'react';
import { Form, Input, Button, Select, Card, Row, Col, Typography, Space } from 'antd';
import { ApiOutlined, SaveOutlined, ClearOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const ServerEntry = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values:', values);
    alert('Server entry saved successfully!');
    form.resetFields();
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Card className="inventory-card">
      <Title level={3}><ApiOutlined /> Server Entry Form</Title>
      
      <Form
        form={form}
        name="serverEntryForm"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="serverName"
              label="Server Name"
              rules={[{ required: true, message: 'Please enter server name' }]}
            >
              <Input placeholder="Enter server name" />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="ipAddress"
              label="IP Address"
              rules={[{ required: true, message: 'Please enter IP address' }]}
            >
              <Input placeholder="Enter IP address" />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="operatingSystem"
              label="Operating System"
              rules={[{ required: true, message: 'Please select OS' }]}
            >
              <Select placeholder="Select operating system">
                <Option value="windows">Windows Server</Option>
                <Option value="linux">Linux</Option>
                <Option value="unix">Unix</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="processor"
              label="Processor"
              rules={[{ required: true, message: 'Please enter processor details' }]}
            >
              <Input placeholder="Enter processor details" />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="ram"
              label="RAM"
              rules={[{ required: true, message: 'Please select RAM' }]}
            >
              <Select placeholder="Select RAM">
                <Option value="16gb">16 GB</Option>
                <Option value="32gb">32 GB</Option>
                <Option value="64gb">64 GB</Option>
                <Option value="128gb">128 GB</Option>
              </Select>
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="storage"
              label="Storage"
              rules={[{ required: true, message: 'Please enter storage details' }]}
            >
              <Input placeholder="Enter storage details" />
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

export default ServerEntry;