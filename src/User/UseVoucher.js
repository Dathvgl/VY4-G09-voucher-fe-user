import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import TaskAPI from "../api/task.api";

function UseVoucher(props) {
  const [activate, setActivate] = useState({});

  useEffect(() => {
    if (Object.keys(activate).length === 0) return;
    TaskAPI.putVoucher(activate.id, activate.user);
  }, [activate]);

  const onFormSubmit = (e) => {
    e.preventDefault();

    const id = e.target.elements["id"].value;

    const res = TaskAPI.getVoucher(id);
    res.then((data) => {
      if (data === "") return;

      const price = e.target.elements["price"].value;
      const user = props.user;

      if (data.status !== "Đang kích hoạt" && data.status !== "Vô thời hạn")
        return;
      if (price > data.price) return;

      setActivate({ id: data.id, user: user });
    });
  };

  return (
    <React.Fragment>
      <Container>
        <h2>Sử dụng voucher</h2>
        <Form onSubmit={onFormSubmit}>
          <Row className="my-3">
            <Form.Group as={Col}>
              <Form.Label>Nhập mã</Form.Label>
              <Form.Control
                name="id"
                type="text"
                placeholder="Mã voucher"
                required
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Số tiền</Form.Label>
              <Form.Select name="price">
                <option value={50000}>50.000đ</option>
                <option value={100000}>100.000đ</option>
                <option value={150000}>150.000đ</option>
                <option value={200000}>200.000đ</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Button variant="primary" type="submit">
            Sử dụng voucher
          </Button>
        </Form>
      </Container>
    </React.Fragment>
  );
}

export default UseVoucher;
