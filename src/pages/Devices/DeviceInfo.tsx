import { Button, Card, Descriptions, Typography } from "antd";
import { Link } from "react-router-dom";
import { edit } from "../../components/icon/icon";

const DeviceInfo = () => {
  const { Title } = Typography;

  return (
    <>
      <div className="layout-content">
        <div className="layout-table">
          <Title level={2} className="text-orange">
            Quản lý thiết bị
          </Title>
          <Button className="popup-button">
            <Link to="/thiet-bi/danh-sach-thiet-bi/cap-nhat-thiet-bi">
              <div>{edit}</div>
              <div>Cập nhật thiết bị</div>
            </Link>
          </Button>
          <Card className="fullheight-card">
            <Title level={3} className="text-orange">
              Thông tin thiết bị
            </Title>
            <Descriptions column={2}>
              <Descriptions.Item label="Mã thiết bị">KIO_01</Descriptions.Item>
              <Descriptions.Item label="Loại thiết bị">Kiosk</Descriptions.Item>
              <Descriptions.Item label="Tên thiết bị">Kiosk</Descriptions.Item>
              <Descriptions.Item label="Tên đăng nhập">
                Linhkyo011
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ IP">
                128.172.308
              </Descriptions.Item>
              <Descriptions.Item label="Mật khẩu">CMS</Descriptions.Item>
            </Descriptions>
            <Descriptions layout="vertical">
              <Descriptions.Item label="Dịch vụ sử dụng">
                Khám tim mạch, Khám sản - Phụ khoa, Khám răng hàm mặt, Khám tai
                mũi họng, Khám hô hấp, Khám tổng quát.
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>
      </div>
    </>
  );
};

export default DeviceInfo;
