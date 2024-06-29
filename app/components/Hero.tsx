"use client";
import React, { useEffect, useState } from "react";
import { List, Card, Table, Tooltip, Spin, Typography } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const { Text } = Typography;

export const Hero: React.FC = () => {
  const vehicles = useSelector(
    (state: RootState) => state.vehicles.vehicleData
  );
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const columns = [
    { title: "Name", dataIndex: "Name", key: "Name" },
    { title: "Model", dataIndex: "Model", key: "Model" },
    { title: "Type", dataIndex: "Type", key: "Type" },
    { title: "Manufacturer", dataIndex: "Manufacturer", key: "Manufacturer" },
    {
      title: "Manufacturing Date",
      dataIndex: "Manufacturing Date",
      key: "Manufacturing Date",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    { title: "Seating", dataIndex: "Seating", key: "Seating" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (vehicles.length > 0) {
      setLoading(false);
    }
  }, [vehicles]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
        className="flex justify-center items-center h-[100vh]"
      >
        <Spin size="large" tip="Loading vehicles..." />
      </div>
    );
  }

  return (
    <div style={{ marginLeft: 10, marginRight: 10 }}>
      {isMobile ? (
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={vehicles}
          pagination={{ pageSize: 5 }}
          renderItem={(item) => (
            <List.Item key={item.Name}>
              <Card title={item.Name} className="w-full">
                <Tooltip title="Model">
                  <Text>
                    <Text strong>Model:</Text> {item.Model}
                  </Text>
                </Tooltip>
                <br />
                <Tooltip title="Type">
                  <Text>
                    <Text strong>Type:</Text> {item.Type}
                  </Text>
                </Tooltip>
                <br />
                <Tooltip title="Manufacturer">
                  <Text>
                    <Text strong>Manufacturer:</Text> {item.Manufacturer}
                  </Text>
                </Tooltip>
                <br />
                <Tooltip title="Manufacturing Date">
                  <Text>
                    <Text strong>Manufacturing Date:</Text>{" "}
                    {new Date(item["Manufacturing Date"]).toLocaleDateString()}
                  </Text>
                </Tooltip>
                <br />
                <Tooltip title="Seating">
                  <Text>
                    <Text strong>Seating:</Text> {item.Seating}
                  </Text>
                </Tooltip>
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <Table
          dataSource={vehicles}
          columns={columns}
          pagination={{
            pageSize: 10,
            style: { display: "flex", justifyContent: "center" },
          }}
          rowKey={(record) => record.Name}
        />
      )}
    </div>
  );
};






























