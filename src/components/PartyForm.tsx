import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Typography,
  Checkbox,
  Button,
} from "antd";
import { statedata } from "./StateData";

const { Title } = Typography;
const { Option } = Select;

// const states = [
//   "Andhra Pradesh",
//   "Delhi",
//   "Karnataka",
//   "Maharashtra",
//   "West Bengal",
// ];
import {
  PlusOutlined,
  DeleteOutlined,
  MailOutlined,
  MobileOutlined,
} from "@ant-design/icons";

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
    const panNo = value.slice(2, 12);
    console.log(panNo);
    const stateCode = value.slice(0, 2);
    console.log(stateCode);
    const result = statedata.find(({ id }) => id === parseInt(stateCode));
    form.setFieldValue("state", result?.name);
    form.setFieldValue("pan", panNo);
  };
  const partyName = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const pname = event.target.value;
    console.log(pname);
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
        {/*---------------------------------- Party Details-------------------------------- */}
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Party Name"
              name="partyName"
              rules={[
                { required: true, message: "Party Name is required" },
                {
                  pattern: /^[a-zA-Z0-9 _()&\-.,]*$/,
                  message:
                    "Only alphanumeric with space and some special characters i.e. '_', '(', ')', '&', '-', '.' and ',' are allowed.",
                },
                {
                  validator: (_, value) => {
                    if (!value || value.length === 0) return Promise.resolve();

                    if (value.length < 3 || value.length > 80) {
                      return Promise.reject(
                        "Length must be Minimum 3 or Maximum 80 characters long"
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input onBlur={partyName} placeholder="Party name" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Alias/Short Name"
              name="alias"
              rules={[
                {
                  pattern: /^[a-zA-Z0-9 _()&\-.,]*$/,
                  message:
                    "Only alphanumeric with space and some special characters i.e. '_', '(', ')', '&', '-', '.' and ',' are allowed.",
                },
                {
                  validator: (_, value) => {
                    if (!value || value.length === 0) return Promise.resolve();

                    if (value.length < 3 || value.length > 80) {
                      return Promise.reject(
                        "Length must be Minimum 3 or Maximum 80 characters long"
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
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

        {/*------------------------------------------------- Business Details---------------------------------------- */}
        {selectedOption === "TradePs" && (
          <>
            <Title level={4}>Business Details</Title>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label="GST Type"
                  name="gstType"
                  rules={[
                    {
                      required: true,
                      message: "GST Type is required",
                    },
                  ]}
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
                  <Form.Item
                    label="GSTIN"
                    name="gstin"
                    rules={[
                      { required: true, message: "GST number is required" },
                      {
                        pattern:
                          /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/,
                        message: "Enter valid 15 alphanumeric GST number",
                      },
                    ]}
                  >
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
                  <Form.Item
                    label="PAN Card"
                    name="pan"
                    rules={[
                      {
                        pattern: /[A-Z]{5}[0-9]{4}[A-Z]{1}/,
                        message: "Enter valid 10 alphanumeric PAN number",
                      },
                      {
                        validator: (_, value) => {
                          if (!value) return Promise.resolve();

                          if (value.length !== 10) {
                            return Promise.reject(
                              new Error("PAN No. must be 10 characters long")
                            );
                          }

                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input placeholder="AABCC1234D" maxLength={10} />
                  </Form.Item>
                </Col>
              )}
              {(selectGst === "Regular" ||
                selectGst === "Composition" ||
                selectGst === "SEZ" ||
                selectGst === "DeemedExportImport") && (
                <Col span={6}>
                  <Form.Item label="PAN Card" name="pan">
                    <Input placeholder="AABCC1234D" disabled />
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
                      {statedata.map((s) => (
                        <Option key={s.id} value={s.name}>
                          {s.name}
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
                      {/* {statedata.map((s) => (
                        <Option key={s.id} value={s.name}>
                          {s.name}
                        </Option>
                      ))} */}
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
                <Form.Item
                  label="Website"
                  name="website"
                  rules={[
                    {
                      pattern:
                        /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                      message: "Please enter a valid URL",
                    },
                    {
                      validator: (_, value) => {
                        if (!value || value.length === 0)
                          return Promise.resolve();

                        if (value.length < 10 || value.length > 50) {
                          return Promise.reject(
                            "Please enter a valid URL having minimum 10 or maximum 50 length"
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input placeholder="https://www.example.com" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="IEC"
                  name="iec"
                  rules={[
                    {
                      pattern: /^[a-zA-Z0-9_]*$/,
                      message: "Enter valid 10 alphanumeric IEC number",
                    },
                    {
                      validator: (_, value) => {
                        if (!value || value.length === 0)
                          return Promise.resolve();
                        if (value.length < 10) {
                          return Promise.reject(
                            "Length must be 10 characters long"
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input placeholder="IEC Code" maxLength={10} />
                </Form.Item>
              </Col>
              {/* </Row> */}
              {/* <Row gutter={16}> */}
              <Col span={6}>
                <Form.Item
                  label="MSME Number"
                  name="msme"
                  rules={[
                    {
                      pattern: /^[A-Za-z]{2}-00-\d{7}$/,
                      message: "Enter valid 19 digit MSME No. including '-'",
                    },
                  ]}
                >
                  <Input
                    addonBefore="UDYAM-"
                    placeholder="XX-00-0123456"
                    maxLength={13}
                  />
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
            <Form.List name="contacts" initialValue={[{}]}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Row gutter={8} align="middle" key={field.key}>
                      <Col span={5}>
                        <Form.Item
                          {...field}
                          name={[field.name, "name"]}
                          rules={[
                            {
                              pattern: /^[A-Za-z ]+$/,
                              message: "Only Character with space are allowed",
                            },
                            {
                              validator: (_, value) => {
                                if (!value || value.length === 0)
                                  return Promise.resolve();

                                if (value.length < 3 || value.length > 30) {
                                  return Promise.reject(
                                    "Length must be Minimum 3 or Maximum 30 characters"
                                  );
                                }
                                return Promise.resolve();
                              },
                            },
                          ]}
                        >
                          <Input placeholder="Name" maxLength={30} />
                        </Form.Item>
                      </Col>
                      <Col span={5}>
                        <Form.Item
                          {...field}
                          name={[field.name, "designation"]}
                          rules={[
                            {
                              pattern: /^[a-zA-Z0-9 _()&\-.,]*$/,
                              message:
                                "Only alphanumeric with space and some special characters i.e. '_', '(', ')', '&', '-', '.' and ',' are allowed.",
                            },
                            {
                              validator: (_, value) => {
                                if (!value || value.length === 0)
                                  return Promise.resolve();

                                if (value.length < 3 || value.length > 80) {
                                  return Promise.reject(
                                    "Length must be Minimum 3 or Maximum 30 characters long"
                                  );
                                }
                                return Promise.resolve();
                              },
                            },
                          ]}
                        >
                          <Input placeholder="Designation" />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          {...field}
                          name={[field.name, "phone"]}
                          rules={[
                            {
                              pattern: /\d{10}/,
                              message: "Enter valid Phone No.",
                            },
                            {
                              validator: (_, value) => {
                                if (!value || value.length === 0)
                                  return Promise.resolve();

                                if (value.length < 10) {
                                  return Promise.reject(
                                    "Length must be 10 digits long"
                                  );
                                }
                                return Promise.resolve();
                              },
                            },
                          ]}
                        >
                          <Input
                            placeholder="9876543210"
                            suffix={<MobileOutlined />}
                            maxLength={10}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          {...field}
                          name={[field.name, "email"]}
                          rules={[
                            {
                              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                              message: "Enter valid email address",
                            },
                            {
                              validator: (_, value) => {
                                if (!value || value.length === 0)
                                  return Promise.resolve();

                                if (value.length < 10 || value.length > 80) {
                                  return Promise.reject(
                                    "Length must be Minimum 10 or Maximum 80 characters"
                                  );
                                }
                                return Promise.resolve();
                              },
                            },
                          ]}
                        >
                          <Input
                            placeholder="user@exam.com"
                            suffix={<MailOutlined />}
                            maxLength={80}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          {...field}
                          name={[field.name, "cc"]}
                          rules={[
                            {
                              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                              message: "Enter valid email address",
                            },
                            {
                              validator: (_, value) => {
                                if (!value || value.length === 0)
                                  return Promise.resolve();

                                if (value.length < 10 || value.length > 80) {
                                  return Promise.reject(
                                    "Length must be Minimum 10 or Maximum 80 characters"
                                  );
                                }
                                return Promise.resolve();
                              },
                            },
                          ]}
                        >
                          <Input
                            placeholder="cc@exam.com"
                            suffix={<MailOutlined />}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        {/* <Checkbox style={{ margin: "5px" }} /> */}
                        {/* </Col>
                      <Col span={2}> */}
                        <Button
                          danger
                          type="text"
                          icon={<DeleteOutlined />}
                          onClick={() => remove(field.name)}
                          style={{ marginBottom: "15px" }}
                        />
                      </Col>
                    </Row>
                  ))}
                  <Form.Item>
                    <Button
                      type="link"
                      icon={<PlusOutlined />}
                      onClick={() => add()}
                    >
                      Add Contact
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            {/* --------------------------------Address Details----------------------- */}
            <Title level={4}>Address Details</Title>
            <Form.List name="addresses" initialValue={[{}]}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <div
                      className="Address"
                      key={field.key}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 24,
                        borderBottom: "1px solid #f0f0f0",
                        paddingBottom: 16,
                      }}
                    >
                      <div className="add1" style={{ width: "450px" }}>
                        <Row gutter={16}>
                          <Col span={24}>
                            <Form.Item
                              {...field}
                              label="Addresses Type"
                              name={[field.name, "type"]}
                              style={{ marginBottom: "2px" }}
                            >
                              <Select placeholder="Type">
                                <Option value="Registered Address">
                                  Registered Address
                                </Option>
                                <Option value="Business Address">
                                  Business Address
                                </Option>
                                <Option value="Branch Address">
                                  Branch Address
                                </Option>
                                <Option value="Unit Address">
                                  Unit Address
                                </Option>
                                <Option value="Godown Address">
                                  Godown Address
                                </Option>
                              </Select>
                            </Form.Item>
                            <Form.Item
                              {...field}
                              label="Name"
                              name={[field.name, "name"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Address Name is required",
                                },
                                {
                                  pattern: /^[A-Za-z ()&]+$/,
                                  message:
                                    "Only alphabets with space and some special characters i.e. '(', ')' and '&' are allowed",
                                },
                                {
                                  validator: (_, value) => {
                                    if (!value || value.length === 0)
                                      return Promise.resolve();
                                    if (value.length < 2 || value.length > 20) {
                                      return Promise.reject(
                                        "Length must be Minimum 2 or Maximum 20 characters long"
                                      );
                                    }
                                    return Promise.resolve();
                                  },
                                },
                              ]}
                            >
                              <Input placeholder="Name" />
                            </Form.Item>
                          </Col>
                        </Row>
                      </div>

                      <div
                        className="add2"
                        style={{ width: "100%", marginLeft: "10px" }}
                      >
                        <Row>
                          {/* <Col span={20}> */}
                          <p style={{ margin: 0, padding: 0 }}>
                            Address Details
                          </p>
                          {/* </Col> */}
                          <Row style={{ marginTop: "6px" }}>
                            <Col span={8} style={{ marginBottom: 0 }}>
                              <Form.Item
                                {...field}
                                name={[field.name, "building"]}
                              >
                                <Input placeholder="Building" />
                              </Form.Item>
                            </Col>
                            <Col span={8}>
                              <Form.Item
                                {...field}
                                name={[field.name, "street"]}
                              >
                                <Input placeholder="Street" />
                              </Form.Item>
                            </Col>
                            <Col span={8}>
                              <Form.Item
                                {...field}
                                name={[field.name, "landmark"]}
                              >
                                <Input placeholder="Landmark" />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row style={{ marginTop: "-24px" }}>
                            <Col span={8}>
                              <Form.Item
                                {...field}
                                name={[field.name, "city"]}
                                rules={[
                                  {
                                    pattern: /^[A-Za-z ()&]+$/,
                                    message:
                                      "Only alphabets with space and some special characters i.e. '(', ')' and '&' are allowed",
                                  },
                                  {
                                    validator: (_, value) => {
                                      if (!value || value.length === 0)
                                        return Promise.resolve();
                                      if (
                                        value.length < 3 ||
                                        value.length > 30
                                      ) {
                                        return Promise.reject(
                                          "Length must be Minimum 3 or Maximum 30 characters long"
                                        );
                                      }
                                      return Promise.resolve();
                                    },
                                  },
                                ]}
                              >
                                <Input placeholder="City" />
                              </Form.Item>
                            </Col>
                            <Col span={8}>
                              <Form.Item
                                {...field}
                                name={[field.name, "district"]}
                                rules={[
                                  {
                                    pattern: /^[A-Za-z ()&]+$/,
                                    message:
                                      "Only alphabets with space and some special characters i.e. '(', ')' and '&' are allowed",
                                  },
                                  {
                                    validator: (_, value) => {
                                      if (!value || value.length === 0)
                                        return Promise.resolve();
                                      if (
                                        value.length < 3 ||
                                        value.length > 30
                                      ) {
                                        return Promise.reject(
                                          "Length must be Minimum 3 or Maximum 30 characters long"
                                        );
                                      }
                                      return Promise.resolve();
                                    },
                                  },
                                ]}
                              >
                                <Input placeholder="District" />
                              </Form.Item>
                            </Col>
                            <Col span={8}>
                              <Form.Item
                                {...field}
                                name={[field.name, "pincode"]}
                                rules={[
                                  {
                                    pattern: /\d{6}/,
                                    message: "Enter valid PIN No.",
                                  },
                                  {
                                    validator: (_, value) => {
                                      if (!value || value.length === 0)
                                        return Promise.resolve();

                                      if (value.length < 6) {
                                        return Promise.reject(
                                          "Length must be 6 digits long"
                                        );
                                      }
                                      return Promise.resolve();
                                    },
                                  },
                                ]}
                              >
                                <Input placeholder="Pincode" maxLength={6} />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row style={{ marginTop: "-24px", width: "100%" }}>
                            <Col span={8}>
                              <Form.Item
                                {...field}
                                name={[field.name, "State"]}
                              >
                                <Select placeholder="State">
                                  {statedata.map((s) => (
                                    <Option key={s.id} value={s.name}>
                                      {s.name}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col span={8}>
                              <Form.Item
                                {...field}
                                name={[field.name, "country"]}
                              >
                                <Select placeholder="Country">
                                  <Option>India</Option>
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col
                              span={2}
                              style={{ marginLeft: "40px", marginTop: "5px" }}
                            >
                              <Button
                                icon={<DeleteOutlined />}
                                onClick={() => remove(field.name)}
                                danger
                                type="text"
                              />
                            </Col>
                          </Row>
                        </Row>
                      </div>
                    </div>
                  ))}

                  <Form.Item>
                    <Button
                      type="link"
                      icon={<PlusOutlined />}
                      onClick={() => add()}
                    >
                      Add Address
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Button htmlType="submit">Submit</Button>
          </>
        )}
      </Form>
    </>
  );
};

export default Partyform;
