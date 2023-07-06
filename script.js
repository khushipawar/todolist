import React, { useState } from 'react';
import { Table, Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;

interface DataType {
  key: string;
  mapname: string;
  filename: string;
  status: string;
  version: number;
}

interface FileTableProps {
  data: DataType[];
}

const FileTable: React.FC<FileTableProps> = ({ data = [] }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const getColumnSearchProps = (dataIndex: keyof DataType, columnTitle: string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Search
          placeholder={`Search ${columnTitle}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={confirm}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            type="button"
            onClick={confirm}
            style={{ width: 'calc(50% - 8px)' }}
          >
            Search
          </button>
          <button
            type="button"
            onClick={clearFilters}
            style={{ width: 'calc(50% - 8px)' }}
          >
            Reset
          </button>
        </div>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value: string, record: DataType) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => searchInput?.select(), 100);
      }
    },
    render: (text: string) =>
      searchedColumn === dataIndex ? (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {text}
        </div>
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Map Name',
      dataIndex: 'mapname',
      key: 'mapname',
      ...getColumnSearchProps('mapname', 'Map Name'),
    },
    {
      title: 'File Name',
      dataIndex: 'filename',
      key: 'filename',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Building', value: 'building' },
        { text: 'Archived', value: 'archived' },
        { text: 'Inactive', value: 'inactive' },
      ],
      onFilter: (value: string, record: DataType) => record.status === value,
      render: (text: string) => (
        <Select defaultValue={text} style={{ width: 100 }}>
          <Option value="active">Active</Option>
          <Option value="building">Building</Option>
          <Option value="archived">Archived</Option>
          <Option value="inactive">Inactive</Option>
        </Select>
      ),
    },
    {
      title: 'Version
      dataIndex: 'version',
      key: 'version',
  },
];

interface FileTableProps {
  data: DataType[];
}

const FileTable: React.FC<FileTableProps> = ({ data = [] }) => {
  return (
    <Table columns={columns} dataSource={data} />
  );
};

export default FileTable;