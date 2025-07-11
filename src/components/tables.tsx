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
const gstTypeMap: { [key: number]: string } = {
  1: "Unregistered",
  2: "Regular",
  3: "Composition",
  4: "Import/Export",
  5: "SEZ",
  6: "Deemed Export/Import"
};

const Tables: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [tableData, setTableData] = useState<DataType[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formInitialValues, setFormInitialValues] =
    useState<PartyFormValues | null>(null);

  const fetchData = () => {
  const localData: PartyFormValues[] = JSON.parse(
    localStorage.getItem("partyFormData") || "[]"
  );

  const tableData: DataType[] = localData.map((item, index) => ({
    key: `${index}`,
    sno: index + 1,
    pname: item.partyName,
    pgroup: item.partyGroup,
    ptype:
      item.gstType !== undefined && gstTypeMap[Number(item.gstType)]
        ? gstTypeMap[Number(item.gstType)]
        : "-",
    cno: item.contacts?.[0]?.phone || "-",
    email: item.contacts?.[0]?.email || "-"
  }));

  setTableData(tableData);
};

  useEffect(() => {
    fetchData();
  }, [open]);

  // const updateValue=()=>{
  //  setOpen(true);
  // }

  const handleDelete = (recordKey: string) => {
    const storedData: PartyFormValues[] = JSON.parse(
      localStorage.getItem("partyFormData") || "[]"
    );
    const index = parseInt(recordKey);
    storedData.splice(index, 1);
    localStorage.setItem("partyFormData", JSON.stringify(storedData));
    fetchData();
  };
  const handleEdit = (recordKey: string) => {
    const index = parseInt(recordKey);
    const storedData: PartyFormValues[] = JSON.parse(
      localStorage.getItem("partyFormData") || "[]"
    );
    setEditingIndex(index);
    setFormInitialValues(storedData[index]);
    setOpen(true);
  };
  const handleSave = (values: PartyFormValues) => {
    const storedData: PartyFormValues[] = JSON.parse(
      localStorage.getItem("partyFormData") || "[]"
    );
    if (editingIndex !== null) {
      storedData[editingIndex] = values;
    } else {
      storedData.push(values);
    }

    localStorage.setItem("partyFormData", JSON.stringify(storedData));
    setOpen(false);
    setEditingIndex(null);
    setFormInitialValues(null);
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
          <EditOutlined onClick={() => handleEdit(record.key)} />
          <Button
            danger
            type="text"
            className="dltbttn"
            onClick={() => handleDelete(record.key)}
          >
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Flex gap="small" wrap>
        <Button
          onClick={() =>{setOpen(true); setFormInitialValues(null); }}
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
          setOpen={() => {
            setOpen(false);
            // setFormInitialValues(null);
          }}
          initialValues={formInitialValues}
          onSave={handleSave}
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
