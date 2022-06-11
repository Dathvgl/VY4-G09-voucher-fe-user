import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import TaskAPI from "../api/task.api";

function UseVoucher(props) {
  const [amount, setAmount] = useState(0);
  const [reduce, setReduce] = useState(0);
  const [isList, setIsList] = useState(false);
  const [voucher, setVoucher] = useState({});
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const res = TaskAPI.getVouchersUse(props.user);
    res.then((data) => setVouchers(data));
  }, [props.user]);

  const reduct = (discount, limited) => {
    if (discount === undefined || limited === undefined) return;
    const final = (reduce * discount) / 100;
    if (final > limited) return limited;
    return final;
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    const user = props.user;

    const id = e.target.elements["id"].value;
    const price = Number.parseInt(e.target.elements["price"].value);

    TaskAPI.putVoucher(id, user, price)
      .then((data) => {
        TaskAPI.getVoucher(id).then((res) => {
          const final = price - reduct(res.discount, res.limited);
          setAmount(final);
          alert("Sử dụng voucher");
        });
      })
      .catch((error) => {
        const res = error.response.data.message;
        const call = res[Object.keys(res)[Object.keys(res).length - 1]];
        alert(call);
      });
  };

  return (
    <React.Fragment>
      <Container>
        <h2>Sử dụng voucher</h2>
        <Row className="my-3">
          <Col lg={3}>
            <Form.Group>
              <Form.Label>Người sử dụng</Form.Label>
              <Form.Control readOnly value={props.user} />
            </Form.Group>
          </Col>
        </Row>
        <Form onSubmit={onFormSubmit}>
          <Row className="my-3">
            <Col lg={3}>
              <Form.Group>
                <Form.Label>Số tiền</Form.Label>
                <Form.Control
                  name="price"
                  type="text"
                  placeholder="Số tiền"
                  required
                  onChange={(e) => setReduce(Number.parseInt(e.target.value))}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="my-3">
            <Col lg={3}>
              <Form.Group className="position-relative">
                <Form.Label>Nhập mã</Form.Label>
                <Form.Control
                  name="id"
                  type="text"
                  placeholder="Mã voucher"
                  required
                  // defaultValue={voucher.id}
                  value={voucher.id !== undefined ? voucher.id : ""}
                  autoComplete="off"
                  onClick={() => setIsList(true)}
                />
                {vouchers.length !== 0 && (
                  <div
                    className={
                      "bg-white border position-absolute w-100 p-2 " +
                      (isList ? "d-block" : "d-none")
                    }
                  >
                    {vouchers.map((item, index) => (
                      <div
                        onClick={() => {
                          setVoucher(item);
                          setIsList(false);
                        }}
                        key={index}
                      >
                        <div>{item.id}</div>
                        <div className="d-flex justify-content-between">
                          {item.discount !== undefined && (
                            <div>
                              Giảm:{" "}
                              {reduct(item.discount, item.limited)
                                .toLocaleString("en")
                                .replace(",", ".") + " đ"}
                            </div>
                          )}
                          <div>
                            {item.status === 1
                              ? "Đã dùng"
                              : item.status === 0
                              ? "Chưa dùng"
                              : "Hết hạn"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit">
            Sử dụng voucher
          </Button>
        </Form>
        <Row className="my-3">
          <Col lg={3}>
            <Form.Group>
              <Form.Label>Số tiền sau khi sử dụng</Form.Label>
              <Form.Control
                readOnly
                value={amount.toLocaleString("en").replace(",", ".") + " đ"}
              />
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default UseVoucher;
