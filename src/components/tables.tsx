import React, { useState, useEffect } from "react";
import { Space, Table, Button, Flex } from "antd";
import type { PartyFormValues } from "./PartyForm";
import Partyform from "./PartyForm";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  DownloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import type { TableProps } from "antd";
import "../App.css";

interface DataType {
  key: string;
  sno: number;
  pname: string;
  pgroup: string;
  ptype: string;
  cno: string;   
  email: string;
}

const Tables: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [tableData, setTableData] = useState<DataType[]>([]);
  const fetchData = () => {
    const localData: PartyFormValues[] = JSON.parse(
      localStorage.getItem("partyFormData") || "[]"
    );
    const tableData: DataType[] = localData.map((item, index) => ({
      key: `${index}`,
      sno: index + 1,
      pname: item.partyName,
      pgroup: item.partyGroup,
      ptype: item.gstType || "-",
      cno: item.contacts?.[0]?.phone || "-",
      email: item.contacts?.[0]?.email || "-",
    }));
    setTableData(tableData);
  };

  useEffect(() => {
    fetchData();
  }, [open]);

  const updateValue=()=>{
   setOpen(true);
  } 

  const handleDelete = (recordKey: string) => {
    const storedData: PartyFormValues[] = JSON.parse(
      localStorage.getItem("partyFormData") || "[]"
    );
    const index = parseInt(recordKey);
    storedData.splice(index, 1);
    localStorage.setItem("partyFormData", JSON.stringify(storedData));
    fetchData();
  };

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
          <EditOutlined onClick={()=>updateValue()}/>
          <Button
            color="danger"
            variant="outlined"
            className="dltbttn"
            onClick={() => handleDelete(record.key)}
          >
            <DeleteOutlined style={{ color: "red" }} />
          </Button>
        </Space>
      ),
    },
  ];
  return ( 
    <>
      <Flex gap="small" wrap>
        <Button
          onClick={()=>setOpen(true)}
          style={{ background: "#004b8b", color: "#ffff" }}
        >
          <PlusOutlined /> Party
        </Button>
        <Button>
          <DownloadOutlined /> Export
        </Button>
        <Button>
          <UploadOutlined /> Import parties
        </Button>
      </Flex>

      {open && (
        <Partyform
          open={open}
          setOpen={(e) => setOpen(e)}
        />
      )}
      <Table<DataType>
        columns={columns}
        dataSource={tableData}
        pagination={{ pageSize: 10 }}
        size="small"
        style={{ marginTop: "10px", marginLeft: "20px" }}
      />
    </>
  );
};
export default Tables;