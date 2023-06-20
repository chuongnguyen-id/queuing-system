import { Button, Card, Descriptions, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { back } from "../../components/icon/icon";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { getOrdinalNumberById } from "../../store/reducer/ordinalNumberReducer";
import moment from "moment";

const OrdinalNumberInfo = () => {
  const { Title } = Typography;
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const data = useSelector(
    (state: any) => state.ordinalNumber.ordinalNumbers[0]
  );

  useEffect(() => {
    if (id) {
      dispatch(getOrdinalNumberById(id)).finally(() => setLoading(false));
    }
  }, [dispatch, id]);

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
            {loading ? (
              <div>Đang tải...</div>
            ) : (
              <Descriptions column={2}>
                <Descriptions.Item label="Họ tên">
                  {data.fullname}
                </Descriptions.Item>
                <Descriptions.Item label="Nguồn cấp">
                  {data.source}
                </Descriptions.Item>
                <Descriptions.Item label="Tên dịch vụ">
                  {data.service}
                </Descriptions.Item>
                <Descriptions.Item label="Trạng thái">
                  {data.dateStatus}
                </Descriptions.Item>
                <Descriptions.Item label="Số điện thoại">
                  {data.phoneNumber}
                </Descriptions.Item>
                <Descriptions.Item label="Thời gian cấp:">
                  {moment(data.issueDate).format("HH:mm - DD/MM/YYYY")}
                </Descriptions.Item>
                <Descriptions.Item label="Địa chỉ Email:">
                  {data.email}
                </Descriptions.Item>
                <Descriptions.Item label="Hạn sử dụng">
                  {moment(data.expirationDate).format("HH:mm - DD/MM/YYYY")}
                </Descriptions.Item>
              </Descriptions>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default OrdinalNumberInfo;
