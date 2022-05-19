import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TaskAPI from "../api/task.api";
import Parser from "html-react-parser";
import {
  Button,
  Col,
  Container,
  Figure,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";

function Item(props) {
  const voucherClipBoard = (id) => {
    navigator.clipboard.writeText(id);
    alert("Đã copy");
  };

  return (
    <Col key={props.index} lg="3">
      <div className="border border-dark rounded">
        <div className="mx-2 my-2 text-center">
          <h4>Mã giảm {props.service}</h4>
          <InputGroup className="my-3">
            <FormControl className="bg-white" value={props.id} readOnly />
            <Button onClick={(e) => voucherClipBoard(props.id)}>Copy</Button>
          </InputGroup>
          <div className="linetext-2">{props.content}</div>
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
        <Row key={index} className="my-3 justify-content-center">
          {row}
        </Row>
      );
      return;
    }
    if ((index + 1) % 3 !== 0) return;

    jsx.push(
      <Row key={index} className="my-3 justify-content-center">
        {row}
      </Row>
    );
    row = [];
  });
  return <React.Fragment>{jsx}</React.Fragment>;
}

function DetailArticle() {
  const location = useLocation();
  const [article, setArticle] = useState({});
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const res = TaskAPI.getArticleVoucher(location.state.id);
    res.then((data) => {
      setArticle(data);
      data.vouchers.forEach((item) => {
        setVouchers((array) => [...array, item]);
      });
    });
  }, [location]);

  return (
    <React.Fragment>
      <Figure>
        {article.thumnail !== undefined && (
          <Figure.Image
            src={article.thumnail}
            alt={"Error"}
          ></Figure.Image>
        )}
      </Figure>
      <Container>
        {article.content !== undefined && Parser(article.content)}
        <ItemList list={vouchers} />
      </Container>
    </React.Fragment>
  );
}

export default DetailArticle;
