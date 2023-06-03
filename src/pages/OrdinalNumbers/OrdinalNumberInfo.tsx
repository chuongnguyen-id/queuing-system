import { Button, Card, Descriptions, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { back } from "../../components/icon/icon";

const DeviceInfo = () => {
  const { Title } = Typography;
  const navigate = useNavigate();

  const onCancel = (event: any) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <>
      <div className="layout-content">
        <div className="layout-table">
          <Title level={2} className="text-orange">
            Quản lý cấp số
          </Title>
          <Button className="popup-button" onClick={onCancel}>
            <div>{back}</div>
            <div>Quay lại</div>
          </Button>
          <Card className="fullheight-card">
            <Title level={3} className="text-orange">
              Thông tin cấp số
            </Title>
            <Descriptions column={2}>
              <Descriptions.Item label="Họ tên">
                Nguyễn Thị Dung
              </Descriptions.Item>
              <Descriptions.Item label="Nguồn cấp">Kiosk</Descriptions.Item>
              <Descriptions.Item label="Tên dịch vụ">
                Khám tim mạch
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">Đang chờ</Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                0948523623
              </Descriptions.Item>
              <Descriptions.Item label="Thời gian cấp:">
                14:35 - 07/11/2021
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ Email:">
                nguyendung@gmail.com
              </Descriptions.Item>
              <Descriptions.Item label="Hạn sử dụng">
                18:00 - 07/11/2021
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>
      </div>
    </>
  );
};

export default DeviceInfo;
