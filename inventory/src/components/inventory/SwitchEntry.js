import React from 'react';
import { Form, Input, Button, Select, Card, Row, Col, Typography, Space } from 'antd';
import { ApiOutlined, SaveOutlined, ClearOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const SwitchEntry = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values:', values);
    alert('Switch entry saved successfully!');
    form.resetFields();
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Card className="inventory-card">
      <Title level={3}><ApiOutlined /> Switch Entry Form</Title>
      
      <Form
        form={form}
        name="switchEntryForm"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="switchName"
              label="Switch Name"
              rules={[{ required: true, message: 'Please enter switch name' }]}
            >
              <Input placeholder="Enter switch name" />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="brand"
              label="Brand"
              rules={[{ required: true, message: 'Please enter brand' }]}
            >
              <Input placeholder="Enter brand" />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="model"
              label="Model"
              rules={[{ required: true, message: 'Please enter model' }]}
            >
              <Input placeholder="Enter model" />
            </Form.Item>
          </Col>
        </Row>
        
        <Row gutter={16}>
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
              name="macAddress"
              label="MAC Address"
              rules={[{ required: true, message: 'Please enter MAC address' }]}
            >
              <Input placeholder="Enter MAC address" />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="ports"
              label="Number of Ports"
              rules={[{ required: true, message: 'Please enter number of ports' }]}
            >
              <Input placeholder="Enter number of ports" type="number" />
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

export default SwitchEntry;