import { Button, Card, Descriptions, Typography } from "antd";
import { Link, useParams } from "react-router-dom";
import { edit } from "../../components/icon/icon";
import { useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDeviceById } from "../../store/reducer/deviceReducer";

const DeviceInfo = () => {
  const { Title } = Typography;
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const data = useSelector((state: any) => state.device.devices[0]);

  useEffect(() => {
    if (id) {
      dispatch(getDeviceById(id)).finally(() => setLoading(false));
    }
  }, [dispatch, id]);

  return (
    <>
      <div className="layout-content">
        <div className="layout-table">
          <Title level={2} className="text-orange">
            Quản lý thiết bị
          </Title>
          <Button className="popup-button">
            <Link to={`/thiet-bi/danh-sach-thiet-bi/chi-tiet/cap-nhat/${id}`}>
              <div>{edit}</div>
              <div>Cập nhật thiết bị</div>
            </Link>
          </Button>
          <Card className="fullheight-card">
            <Title level={3} className="text-orange">
              Thông tin thiết bị
            </Title>
            {loading ? (
              <div>Đang tải...</div>
            ) : (
              <>
                <Descriptions column={2}>
                  <Descriptions.Item label="Mã thiết bị">
                    {data.deviceCode}
                  </Descriptions.Item>
                  <Descriptions.Item label="Loại thiết bị">
                    {data.model}
                  </Descriptions.Item>
                  <Descriptions.Item label="Tên thiết bị">
                    {data.deviceName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Tên đăng nhập">
                    {data.username}
                  </Descriptions.Item>
                  <Descriptions.Item label="Địa chỉ IP">
                    {data.ipAddress}
                  </Descriptions.Item>
                  <Descriptions.Item label="Mật khẩu">
                    {data.password}
                  </Descriptions.Item>
                </Descriptions>
                <Descriptions layout="vertical">
                  <Descriptions.Item label="Dịch vụ sử dụng">
                    {data.usedService.join(", ")}
                  </Descriptions.Item>
                </Descriptions>
              </>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default DeviceInfo;
