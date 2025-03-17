import React from 'react';
import { Form, Input, Button, DatePicker, Select, Card, Row, Col, Typography, Space, Switch } from 'antd';
import { CalculatorOutlined, SaveOutlined, ClearOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const TallyEntry = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values:', values);
    // Here you would typically save the data to your backend
    alert('Tally entry saved successfully!');
    form.resetFields();
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Card className="inventory-card">
      <Title level={3}><CalculatorOutlined /> Tally Entry Form</Title>
      
      <Form
        form={form}
        name="tallyEntryForm"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="tsn"
              label="TSN."
              rules={[{ required: true, message: 'Please enter TSN' }]}
            >
              <Input placeholder="Enter TSN" />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="edition"
              label="EDITION"
              rules={[{ required: true, message: 'Please enter edition' }]}
            >
              <Select placeholder="Select edition">
                <Option value="basic">Basic</Option>
                <Option value="standard">Standard</Option>
                <Option value="professional">Professional</Option>
                <Option value="enterprise">Enterprise</Option>
                <Option value="premium">Premium</Option>
              </Select>
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="userName"
              label="USER NAME"
              rules={[{ required: true, message: 'Please enter user name' }]}
            >
              <Input placeholder="Enter user name" />
            </Form.Item>
          </Col>
        </Row>
        
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="configEmail"
              label="CONFIG E-MAIL ID"
              rules={[
                { required: true, message: 'Please enter config email ID' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input placeholder="Enter config email ID" />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="companyName"
              label="COMPANY NAME"
              rules={[{ required: true, message: 'Please enter company name' }]}
            >
              <Input placeholder="Enter company name" />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="date"
              label="DATE"
              rules={[{ required: true, message: 'Please select date' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="newDate"
              label="NEW DATE"
              rules={[{ required: true, message: 'Please select new date' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="working"
              label="WORKING"
              rules={[{ required: true, message: 'Please enter name' }]}
            >
              <Input placeholder="Person Name" />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              name="version"
              label="Version"
              rules={[{ required: true, message: 'Please enter version' }]}
            >
              <Input placeholder="Enter version" />
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

export default TallyEntry;