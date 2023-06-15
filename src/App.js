import type { FormInstance } from "antd";
import { Button, Form, Input, Space, Select, DatePicker, Radio } from "antd";
import type { DatePickerProps, RadioChangeEvent } from "antd";
import React, { useState } from "react";
import "./App.css";

const { Option } = Select;

const onChangeselect = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log("search:", value);
};

const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  console.log(date, dateString);
};

//คำนำหน้า
const prefix = [
  { label: "นาย", value: "นาย" },
  { label: "นาง", value: "นาง" },
  { label: "นางสาว", value: "นางสาว" },
];

//ปุ่ม ส่งข้อมูล
const SubmitButton = ({ form }: { form: FormInstance }) => {
  const [submittable, setSubmittable] = React.useState(false);

  // Watch all values
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      Submit
    </Button>
  );
};

const App = () => {
  const [form] = Form.useForm();
  const [value, setValue] = useState(1);

  const onChangeradio = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const prefixSelector = (
    <Form.Item name="prefixSelector" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="66">+66</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className="App">
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
      >
     
          <Form.Item
            name="prefix"
            label="คำนำหน้า"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="กรุณาเลือก"
              optionFilterProp="children"
              onChange={onChangeselect}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "นาย",
                  label: "นาย",
                },
                {
                  value: "นาง",
                  label: "นาง",
                },
                {
                  value: "นางสาว",
                  label: "นางสาว",
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="firstname"
            label="ชื่อจริง"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="lastname"
            label="นามสกุล"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>


        <br />

        <Form.Item name="birthday" label="วันเกิด" rules={[{ required: true }]}>
          <DatePicker placeholder="กรุณาเลือก" onChange={onChange} />
        </Form.Item>

        <Form.Item
          name="nationality"
          label="สัญชาติ"
          rules={[{ required: true }]}
        >
          <Select
            showSearch
            placeholder="กรุณาเลือก"
            optionFilterProp="children"
            onChange={onChangeselect}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: "ไทย",
                label: "ไทย",
              },
              {
                value: "ญี่ปุ่น",
                label: "ญี่ปุ่น",
              },
              {
                value: "เกาหลี",
                label: "เกาหลี",
              },
            ]}
          />
        </Form.Item>

        <Form.Item name="gender" label="เพศ" rules={[{ required: true }]}>
          <Radio.Group onChange={onChangeradio} value={value}>
            <Radio value={1}>เพศชาย</Radio>
            <Radio value={2}>เพศหญิง</Radio>
            <Radio value={3}>ไม่ระบุ</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="phone"
          label="หมายเลขโทรศัพท์"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="passport" label="หนังสือเดินทาง">
          <Input />
        </Form.Item>

        <Form.Item
          name="expectedsalary"
          label="เงินเดือนที่คาดหวัง"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button htmlType="reset">Reset</Button>
            <SubmitButton form={form} />
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
