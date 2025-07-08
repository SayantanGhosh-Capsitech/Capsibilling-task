import React, { useState } from "react";
import { Form, Input, Select, Row, Col, Typography, Checkbox } from "antd";
import {statedata} from "./StateData"

const { Title } = Typography;
const { Option } = Select;

const states = [
  "Andhra Pradesh",
  "Delhi",
  "Karnataka",
  "Maharashtra",
  "West Bengal",
];

const Partyform: React.FC = () => {
  const [form] = Form.useForm();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectGst, setSelectGst] = useState<string>("Unregistered");

  const onFinish = (values: any) => {
    console.log(values);
  };

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleGstNum = (value: string) => {
    setSelectGst(value);
  };
  const gstFunction = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    
    const value = event.target.value;
    console.log(value);
    const panNo = value.slice(2, 12)
    console.log(panNo);
    const stateCode = value.slice(0,2)
    console.log(stateCode);
    const result = statedata.find(({ id }) => id === parseInt(stateCode));
    form.setFieldValue('state', result?.name);
    form.setFieldValue('pan', panNo)
    if (value.length != 15) {
      alert("Invalid GST Number");
    }
  };
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        style={{ maxWidth: 1000, margin: "auto" }}
      >
        {/* Party Details */}
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Party Name"
              name="partyName"
              rules={[{ required: true }]}
            >
              <Input placeholder="Party name" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Alias/Short Name" name="alias">
              <Input placeholder="Alias/Short Name" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Party Group"
              name="partyGroup"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Please select Group"
                onChange={handleSelectChange}
              >
                <Option value="TradePs">
                  Trade Payables - Sundry Creditors
                </Option>
                <Option value="Trade Receivables - Sundry Debtors">
                  Trade Receivables - Sundry Debtors
                </Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Business Details */}
        {selectedOption === "TradePs" && (
          <>
            <Title level={4}>Business Details</Title>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label="GST Type"
                  name="gstType"
                  rules={[{ required: true }]}
                >
                  <Select defaultValue="Unregistered" onChange={handleGstNum}>
                    <Option value="Unregistered">Unregistered</Option>
                    <Option value="Regular">Regular</Option>
                    <Option value="Composition">Composition</Option>
                    <Option value="ImportExport">Import/Export</Option>
                    <Option value="SEZ">SEZ</Option>
                    <Option value="DeemedExportImport">
                      Deemed Export/Import
                    </Option>
                  </Select>
                </Form.Item>
              </Col>

              {selectGst === "Unregistered" && (
                <Col span={6}>
                  <Form.Item label="GSTIN" name="gstin">
                    <Input placeholder="00AABCC1234D1ZZ" disabled />
                  </Form.Item>
                </Col>
              )}
              {(selectGst === "Regular" ||
                selectGst === "Composition" ||
                selectGst === "SEZ" ||
                selectGst === "DeemedExportImport") && (
                <Col span={6}>
                  <Form.Item label="GSTIN" name="gstin">
                    <Input
                      placeholder="00AABCC1234D1ZZ"
                      onBlur={(e) => gstFunction(e)}
                      id="gstNum"
                      maxLength={15}
                    />
                  </Form.Item>
                </Col>
              )}

              {(selectGst === "Unregistered" ||
                selectGst === "ImportExport") && (
                <Col span={6}>
                  <Form.Item label="PAN Card" name="pan">
                    <Input placeholder="AABCC1234D" />
                  </Form.Item>
                </Col>
              )}
              {(selectGst === "Regular" ||
                selectGst === "Composition" ||
                selectGst === "SEZ" ||
                selectGst === "DeemedExportImport") && (
                <Col span={6}>
                  <Form.Item label="PAN Card" name="pan">
                    <Input
                      placeholder="AABCC1234D"
                      disabled
                    />
                  </Form.Item>
                </Col>
              )}
              {selectGst === "Unregistered" && (
                <Col span={6}>
                  <Form.Item
                    label="State"
                    name="state"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="State">
                      {states.map((s) => (
                        <Option key={s} value={s}>
                          {s}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              )}
              {(selectGst === "Regular" ||
                selectGst === "Composition" ||
                selectGst === "SEZ" ||
                selectGst === "DeemedExportImport") && (
                <Col span={6}>
                  <Form.Item
                    label="State"
                    name="state"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="State" disabled>
                      {states.map((s) => (
                        <Option key={s} value={s}>
                          {s}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              )}
              {/* </Col> */}
              {/* </Row>
            <Row gutter={16}> */}
              <Col span={6}>
                <Form.Item label="Business Type" name="businessType">
                  <Select placeholder="Select type">
                    <Option value="Private Limited">Private Limited</Option>
                    <Option value="Public Limited">Public Limited</Option>
                    <Option value="Sole Proprietorship">
                      Sole Proprietorship
                    </Option>
                    <Option value="Partnership">Partnership</Option>
                    <Option value="LLP">LLP</Option>
                    <Option value="LLC">LLC</Option>
                    <Option value="HUF">Hindu Undivided Family</Option>
                    <Option value="NGO">NGO</Option>
                    <Option value="Govt Authority">
                      Govt. Authority (Local Authority)
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Business Nature" name="businessNature">
                  <Select mode="multiple" placeholder="Select nature">
                    <Option value="Unspecified">Unspecified</Option>
                    <Option value="Manufacturing">Manufacturing</Option>
                    <Option value="Service">Service Provider</Option>
                    <Option value="Trading">Trader</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Website" name="website">
                  <Input placeholder="https://www.example.com" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="IEC" name="iec">
                  <Input placeholder="IEC Code" />
                </Form.Item>
              </Col>
              {/* </Row> */}
              {/* <Row gutter={16}> */}
              <Col span={6}>
                <Form.Item label="MSME Number" name="msme">
                  <Input addonBefore="UDYAM-" placeholder="XX-00-0123456" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="isTransporter"
                  valuePropName="checked"
                  style={{ marginTop: 32 }}
                >
                  <Checkbox>Is Transporter</Checkbox>
                </Form.Item>
              </Col>
            </Row>
            {/* --------------------------------Contact Details----------------------- */}
            <Title level={4}>Contact Details</Title>
          </>
        )}
      </Form>
    </>
  );
};

export default Partyform;
