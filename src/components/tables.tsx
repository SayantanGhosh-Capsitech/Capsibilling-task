import React from 'react';
import { Space, Table, Tag } from 'antd';
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'S.No.',
    dataIndex: 'sno',
    key: 'sno',
  },
    {
    title: "Party's Name",
    dataIndex: 'pname',
    key: 'pname',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Party Group',
    dataIndex: 'pgroup',
    key: 'pgroup',
  },
  {
    title: 'Party Type',
    dataIndex: 'ptype',
    key: 'ptype',
  },
   {
    title: 'Party Type',
    dataIndex: 'ptype',
    key: 'ptype',
  },
   {
    title: 'Contact No',
    dataIndex: 'cno',
    key: 'cno',
  },
   {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <EditOutlined />
        <DeleteOutlined style={{ color: 'red' }} />
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  }
];

const Tables: React.FC = () => <Table<DataType> columns={columns} dataSource={data} />;

export default Tables;