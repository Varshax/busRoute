import { SmileOutlined, CompassOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Form,
  Input,
  Alert,
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
          tooltip="Please Provide value between -90 and  90"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Please Provide value between -90 and  90" />
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
          <Input placeholder="Please Provide value between -90 and  90" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
const BusRouteForm = ({
  setIsModalOpen,
  editRouteForm,
  setEditRouteForm,
  routeDetail,
  getRoutes,
}) => {
  const [open, setOpen] = useState(false);
  const [stopList, setStopList] = useState([]);
  const formRef = React.useRef(null);

  console.log(editRouteForm, "Edit Form", routeDetail, "Route Details");
  useEffect(() => {
    if (editRouteForm) {
      formRef.current?.setFieldsValue({
        routeName: routeDetail[0].routeName,
        direction: routeDetail[0].routeDirection,
        status: routeDetail[0].routeStatus,
      });
      setStopList(routeDetail[0].routeStops);
    }
  }, [routeDetail]);

  const createRoute = async (values) => {
    await axios({
      method: "post",
      url: "https://bus-route-varshax.vercel.app/api/v1/",
      data: {
        routeName: values.routeName,
        routeDirection: values.direction,
        routeStatus: values.status,
        routeStops: stopList,
      },
    })
      .then((resp) => {
        if (resp.status === 200) {
          setIsModalOpen(false);
          setEditRouteForm(false);
          getRoutes();
          <Alert
            message="Successfully Created Route"
            type="success"
            showIcon
            closable
          />;
        }
      })
      .catch((error) => {
        return (
          <Alert
            message="Warning"
            description={error.message}
            type="warning"
            showIcon
            closable
          />
        );
      });
  };

  const updateRoute = async (values) => {
    console.log(values);
    await axios({
      method: "put",
      url: "https://bus-route-varshax.vercel.app/api/v1/" + routeDetail[0]._id,
      data: {
        routeName: values.routeName,
        routeDirection: values.direction,
        routeStatus: values.status,
        routeStops: stopList,
      },
    })
      .then((resp) => {
        if (resp.status === 200) {
          setIsModalOpen(false);
          setEditRouteForm(false);
          getRoutes();
          <Alert
            message="Successfully Updated Route"
            type="success"
            showIcon
            closable
          />;
        }
      })
      .catch((error) => {
        return (
          <Alert
            message="Warning"
            description={error.message}
            type="warning"
            showIcon
            closable
          />
        );
      });
  };
  const showStopModal = () => {
    setOpen(true);
  };
  const hideStopModal = () => {
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
        <Form.Item
          name="routeName"
          label="Route Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="direction"
          label="Direction"
          rules={[
            {
              required: true,
            },
          ]}
        >
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
          {stopList ? (
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
      <ModalForm open={open} onCancel={hideStopModal} />
    </Form.Provider>
  );
};
export default BusRouteForm;
