import { SmileOutlined, CompassOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Switch,
  Typography,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

// reset form fields when modal is form, closed
const useResetFormOnCloseModal = ({ form, open }) => {
  const prevOpenRef = useRef();
  useEffect(() => {
    prevOpenRef.current = open;
  }, [open]);
  const prevOpen = prevOpenRef.current;
  useEffect(() => {
    if (!open && prevOpen) {
      form.resetFields();
    }
  }, [form, prevOpen, open]);
};
const ModalForm = ({ open, onCancel }) => {
  const [form] = Form.useForm();
  useResetFormOnCloseModal({
    form,
    open,
  });
  const onOk = () => {
    form.submit();
  };

  return (
    <Modal title="Add a Stop" open={open} onOk={onOk} onCancel={onCancel}>
      <Form form={form} layout="vertical" name="stopForm">
        <Form.Item
          name="stopName"
          label="Stop Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="stopLatitude"
          label="Stop Latitude"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="stopLongitude"
          label="Stop Longitude"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
const BusRouteForm = ({
  setIsModalOpen,
  editRouteForm,
  setEditRouteForm,
  setRouteDetail,
  routeDetail,
}) => {
  const [open, setOpen] = useState(false);
  const [stopList, setStopList] = useState([]);
  const formRef = React.useRef(null);
  useEffect(() => {
    if (editRouteForm) {
      formRef.current?.setFieldsValue({
        routeName: routeDetail.routeName,
        direction: routeDetail.routeDirection,
        status: routeDetail.routeStatus,
      });
      setStopList(routeDetail.routeStops);
    }
  }, [routeDetail]);

  const createRoute = async (values) => {
    await axios({
      method: "post",
      url: "http://localhost:5001/routes",
      data: {
        routeName: values.routeName,
        routeDirection: values.direction,
        routeStatus: values.status,
        routeStops: stopList,
      },
    }).then((resp) => {
      if (resp.status === 200) {
        setIsModalOpen(false);
        setEditRouteForm(false);
        console.log("Successfully Created");
      }
    });
  };

  const updateRoute = async (values) => {
    await axios({
      method: "put",
      url: "http://localhost:5001/routes/routeDetail/" + routeDetail._id,
      data: {
        routeName: values.routeName,
        routeDirection: values.direction,
        routeStatus: values.status,
        routeStops: stopList,
      },
    }).then((resp) => {
      if (resp.status === 200) {
        setIsModalOpen(false);
        setEditRouteForm(false);
        console.log("Successfully Updates");
      }
    });
  };
  const showStopModal = () => {
    setOpen(true);
  };
  const hideUserModal = () => {
    setOpen(false);
  };
  const onFinish = async (values) => {
    if (editRouteForm) {
      updateRoute(values);
    } else {
      createRoute(values);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form.Provider
      onFormFinish={(name, { values, forms }) => {
        console.log(name, values, "lol");
        if (name === "stopForm") {
          const { routeForm } = forms;
          const stops = routeForm.getFieldValue("stops") || [];
          routeForm.setFieldsValue({
            stops: [...stops, values],
          });
          setStopList([...stops, values]);
          setOpen(false);
        }
      }}
    >
      <Form
        name="routeForm"
        ref={formRef}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{
          maxWidth: 800,
        }}
      >
        <Form.Item name="routeName" label="Route Name">
          <Input />
        </Form.Item>
        <Form.Item name="direction" label="Direction">
          <Select>
            <Select.Option value="up">Up</Select.Option>
            <Select.Option value="down">Down</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="status" label="Status" valuePropName="checked">
          <Switch />
        </Form.Item>
        <div>
          <span>Stops: </span>
          {stopList.length ? (
            <ul>
              {stopList.map((stop) => (
                <li key={stop.stopId} className="stop">
                  <Avatar
                    icon={<CompassOutlined />}
                    style={{ marginRight: "10px" }}
                  />
                  {stop.stopName}
                </li>
              ))}
            </ul>
          ) : (
            <Typography.Text className="ant-form-text" type="secondary">
              ( <SmileOutlined /> No Stops yet. )
            </Typography.Text>
          )}
        </div>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
          <Button htmlType="button" style={{}} onClick={showStopModal}>
            Add Stop
          </Button>
        </Form.Item>
      </Form>
      <ModalForm open={open} onCancel={hideUserModal} />
    </Form.Provider>
  );
};
export default BusRouteForm;
