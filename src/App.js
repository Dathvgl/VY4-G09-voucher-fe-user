import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomeUser from "./User/Home";
import UseVoucher from "./User/UseVoucher";
import ListVoucher from "./User/ListVoucher";
import BuyVoucher from "./User/BuyVoucher";
import DetailVoucher from "./User/DetailVoucher";
import DetailArticle from "./User/DetailArticle";

function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    setUser("Haku");
  }, []);

  return (
    <React.Fragment>
      <HomeUser user={user} />
      <Routes>
        <Route path="usevoucher" element={<UseVoucher user={user} />} />
        <Route path="listvoucher" element={<ListVoucher />} />
        <Route path="detail-article/*" element={<DetailArticle />} />
        <Route path="buyvoucher" element={<BuyVoucher />} />
        <Route path="buyvoucher/detail-voucher/*" element={<DetailVoucher user={user} />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
