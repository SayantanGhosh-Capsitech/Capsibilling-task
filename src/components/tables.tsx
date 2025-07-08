import React, { useState } from "react";
import { Space, Table, Button, Flex, Drawer } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  DownloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import type { TableProps } from "antd";
import "../App.css";
import Partyform from "./PartyForm";

interface DataType {
  key: string;
  sno: number;
  pname: string;
  pgroup: string;
  ptype: string;
  cno: number;
  email: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "S.No.",
    dataIndex: "sno",
    key: "sno",
  },
  {
    title: "Party's Name",
    dataIndex: "pname",
    key: "pname",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Party Group",
    dataIndex: "pgroup",
    key: "pgroup",
  },
  {
    title: "Party Type",
    dataIndex: "ptype",
    key: "ptype",
  },
  {
    title: "Contact No",
    dataIndex: "cno",
    key: "cno",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <EditOutlined />
        <Button color="danger" variant="outlined" className="dltbttn">
          <DeleteOutlined style={{ color: "red" }} />
        </Button>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    sno: 1,
    pname: "Sayantan",
    pgroup: "Trade Receivables - Sundry Debtors",
    ptype: "Consumer",
    cno: 123456789,
    email: "sayantan.ghosh@capsitech.com",
  },
];

const Tables: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* <-------------------------------Drawer---------------------------> */}
      <Drawer
        title="Add Party"
        width={920}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button  shape="round" size={"middle"} style={{background:"#004b8b", color:"#ffff", fontWeight:"bold"}}>
              Business Entity
            </Button>
          </Space>
        }
      >
        <Partyform />
      </Drawer>
      <Flex gap="small" wrap>
        <Button color="primary" variant="solid" onClick={showDrawer}>
          <PlusOutlined />
          Party
        </Button>
        <Button color="default" variant="outlined">
          <DownloadOutlined />
          Export
        </Button>
        <Button color="default" variant="outlined">
          <UploadOutlined />
          Import parties
        </Button>
      </Flex>
      <Table<DataType> columns={columns} dataSource={data} />;
    </>
  );
};

export default Tables;
