import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TaskAPI from "../api/task.api";
import { Services } from "../Fake_Data";

function Item(props) {
  const navigate = useNavigate();
  const itemDetail = () => {
    navigate("/buyvoucher/detail-voucher/" + props.index, {
      state: { id: props.id },
    });
  };

  return (
    <Col key={props.index} lg="3">
      <div className="border border-dark rounded">
        <div className="mx-2 my-2">
          <h4>{props.name}</h4>
          <div className="linetext-2">{props.content}</div>
          <div className="my-2">
            Số lượng: {props.quantity !== -1 ? props.quantity : "Vô hạn"}
          </div>
          {props.limited !== undefined && (
            <h5 className="text-danger">
              Giảm: {props.discount}% tới{" "}
              {props.limited.toLocaleString("en").replace(",", ".")} đ
            </h5>
          )}
          <h5>
            Giá mua: {props.price.toLocaleString("en").replace(",", ".")} đ
          </h5>
          <Button onClick={itemDetail} className="w-100">
            Xem ngay
          </Button>
        </div>
      </div>
    </Col>
  );
}

function ItemList(props) {
  let row = [];
  let jsx = [];

  const items = props.list;
  items.forEach((item, index, array) => {
    item.index = index;
    row.push(Item(item));

    if (array[index + 1] === undefined) {
      jsx.push(
        <Row key={index} className="my-3">
          {row}
        </Row>
      );
      return;
    }
    if ((index + 1) % 5 !== 0) return;

    jsx.push(
      <Row key={index} className="my-3">
        {row}
      </Row>
    );
    row = [];
  });
  return <React.Fragment>{jsx}</React.Fragment>;
}

function BuyVoucher() {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const res = TaskAPI.getVouchersBuy(Services[0]);
    res.then((data) => setVouchers(data));
  }, []);

  const onSelectSearch = (e) => {
    const value = e.target.value;
    const res = TaskAPI.getVouchersBuy(value);
    res.then((data) => setVouchers(data));
  };

  return (
    <React.Fragment>
      <Container>
        <h3>Lựa chọn dịch vụ voucher muốn mua</h3>
        <Form.Select onChange={onSelectSearch}>
          {Services.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </Form.Select>
        <ItemList list={vouchers} />
      </Container>
    </React.Fragment>
  );
}

export default BuyVoucher;
