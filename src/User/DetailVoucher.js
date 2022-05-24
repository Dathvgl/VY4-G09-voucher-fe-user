import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import TaskAPI from "../api/task.api";

function DetailVoucher(props) {
  const location = useLocation();
  const [voucher, setVoucher] = useState();
  const [error, setError] = useState({});

  useEffect(() => {
    const res = TaskAPI.getVoucher(location.state.id);
    res.then((data) => {
      setVoucher(data);
    });
  }, [location]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    setError({});

    const user = props.user;
    TaskAPI.putVoucherBuy(voucher.id, user)
      .then((res) => alert("Mua thành công"))
      .catch((error) => {
        const message = error.response.data.message;
        setError(message);
      });
  };

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col lg={6}>
            {voucher !== undefined && (
              <React.Fragment>
                <h4>{voucher.name}</h4>
                <div>{voucher.content}</div>
                <div className="my-2">
                  Số lượng:{" "}
                  {voucher.quantity !== -1 ? voucher.quantity : "Vô hạn"}
                </div>
                {voucher.limited !== undefined && (
                  <h5 className="text-danger">
                    Giảm: {voucher.discount}% tới{" "}
                    {voucher.limited.toLocaleString("en").replace(",", ".")} đ
                  </h5>
                )}
                {voucher.price !== undefined && (
                  <h5>
                    Giá mua:{" "}
                    {voucher.price.toLocaleString("en").replace(",", ".")} đ
                  </h5>
                )}
                {voucher.priceAct !== undefined && (
                  <h5 className="text-primary">
                    Giá áp dụng:{" "}
                    {voucher.priceAct.toLocaleString("en").replace(",", ".")} đ
                  </h5>
                )}
                {error.id !== undefined && (
                  <div className="text-danger">{error.id}</div>
                )}
                {error.quantity !== undefined && (
                  <div className="text-danger">{error.quantity}</div>
                )}
              </React.Fragment>
            )}
          </Col>
          <Col lg={6}>
            <Form onSubmit={onFormSubmit}>
              <Form.Group className="my-3">
                <Form.Control
                  name="namecard"
                  type="text"
                  value={props.user}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label>Mã thẻ</Form.Label>
                <Form.Control name="creditnumber" type="text" />
              </Form.Group>
              <Row className="my-3">
                <Form.Group as={Col}>
                  <Form.Label>CVC</Form.Label>
                  <Form.Control name="cvc" type="text" />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Tháng hết hạn</Form.Label>
                  <Form.Control name="monthexp" type="text" />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Năm hết hạn</Form.Label>
                  <Form.Control name="yearexp" type="text" />
                </Form.Group>
              </Row>
              <Button className="my-2" variant="primary" type="submit">
                Mua voucher
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default DetailVoucher;
