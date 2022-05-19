import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Container, Figure, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import TaskAPI from "../api/task.api";
import { useNavigate } from "react-router-dom";
import { Services } from "../Fake_Data";

function Checkbox(props) {
  return (
    <div className="input-group bg-white">
      <div className="input-group-prepend">
        <div className="mx-3 my-2">
          <input type="checkbox" />
        </div>
      </div>
      <span className="align-self-center">{props.text}</span>
    </div>
  );
}

function Item(props) {
  const navigate = useNavigate();
  const itemDetail = () => {
    navigate("/User/detail-article/" + props.id, { state: { id: props.id } });
  };

  return (
    <Col key={props.index} lg="6">
      <div className="border border-dark rounded">
        <Figure className="my-0">
          <Figure.Image
            className="as-square center-crop w-100"
            src={props.thumnail}
            alt={"Error"}
          ></Figure.Image>
        </Figure>
        <div className="mx-2 my-2">
          <div className="linetext-2">{props.name}</div>
          <div></div>
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
      jsx.push(<Row key={index} className="my-3">{row}</Row>);
      return;
    }
    if ((index + 1) % 2 !== 0) return;

    jsx.push(<Row key={index} className="my-3">{row}</Row>);
    row = [];
  });
  return <React.Fragment>{jsx}</React.Fragment>;
}

function ListVoucher() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (articles.length !== 0) return;
    const res = TaskAPI.getArticleAll();
    res.then((data) => setArticles(data));
  }, [articles]);

  return (
    <Container>
      <Row>
        <h2>Cập nhật tất cả khuyến mãi hiện tại</h2>
      </Row>
      <Row>
        <Col lg="3">
          <div className="my-3 border border-dark rounded bg-primary">
            <div className="mx-2 my-2">
              <h5 className="text-white text-center">Lựa chọn khuyến mãi</h5>
            </div>
            <React.Fragment>
              {Services.map((item, index) => (
                <Checkbox key={index} text={item} />
              ))}
            </React.Fragment>
          </div>
        </Col>
        <Col lg="9">
          <ItemList list={articles} />
        </Col>
      </Row>
    </Container>
  );
}

export default ListVoucher;
