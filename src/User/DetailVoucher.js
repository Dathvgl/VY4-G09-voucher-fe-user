import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import TaskAPI from "../api/task.api";

function DetailVoucher(props) {
  const location = useLocation();
  const [radioBuy, setRadioBuy] = useState("");
  const [voucher, setVoucher] = useState();

  useEffect(() => {
    const res = TaskAPI.getVoucher(location.state.id);
    res.then((data) => {
      setVoucher(data);
    });
  }, [location]);

  const onFormSubmit = (e) => {
    e.preventDefault();

    const user = props.user;
    if (radioBuy === "giftcard") {
      const giftcard = e.target["giftcard"].value;
      TaskAPI.putGiftcard(giftcard, user)
      TaskAPI.putVoucherBuy(voucher.id, user)
    }
  };

  const onRadioBuy = (e) => {
    const value = e.target.value;
    setRadioBuy(value);
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
                <h5 className="text-danger">
                  Giảm:{" "}
                  {voucher.type === "stable" ? (
                    <React.Fragment>
                      {voucher.value.toLocaleString("en").replace(",", ".")} đ
                    </React.Fragment>
                  ) : (
                    <React.Fragment>{voucher.value} %</React.Fragment>
                  )}
                </h5>
                <h5>
                  Giá mua:{" "}
                  {voucher.price.toLocaleString("en").replace(",", ".")} đ
                </h5>
                <h5 className="text-primary">
                  Giá áp dụng:{" "}
                  {voucher.priceAct.toLocaleString("en").replace(",", ".")} đ
                </h5>
              </React.Fragment>
            )}
          </Col>
          <Col lg={6}>
            <Form onSubmit={onFormSubmit}>
              <Form.Group className="my-3">
                <h4>Chọn cách để mua voucher</h4>
                <div className="d-flex">
                  <Form.Check
                    onChange={onRadioBuy}
                    value={"giftcard"}
                    name="selectBuy"
                    type="radio"
                    label={"Thẻ quà tặng"}
                  ></Form.Check>
                  <Form.Check
                    onChange={onRadioBuy}
                    value={"stripe"}
                    name="selectBuy"
                    type="radio"
                    label={"Stripe"}
                    className="mx-3"
                  ></Form.Check>
                </div>
              </Form.Group>
              {radioBuy === "giftcard" && (
                <Form.Group className="my-3">
                  <Form.Label>Mã quà tặng</Form.Label>
                  <Form.Control name="giftcard" type="text" />
                </Form.Group>
              )}
              {radioBuy === "stripe" && (
                <React.Fragment>
                  <Form.Group className="my-3">
                    <Form.Label>Tên thẻ</Form.Label>
                    <Form.Control name="namecard" type="text" />
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
                </React.Fragment>
              )}
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
