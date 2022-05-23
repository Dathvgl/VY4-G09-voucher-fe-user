import axios from "axios";

const BaseURL = "http://139.59.234.205:8080/api";

export default class TaskAPI {
  // Voucher
  static async getVouchers(service) {
    const promise = axios.get(
      `${BaseURL}/vouchers/find/?service=${service}`
    );
    const dataPromise = promise.then((res) => res.data);
    return dataPromise;
  }

  static async getVouchersUse(userId) {
    const promise = axios.get(
      `${BaseURL}/vouchers/find/use?id=${userId}`
    );
    const dataPromise = promise.then((res) => res.data);
    return dataPromise;
  }

  static async getVouchersFree(service) {
    const promise = axios.get(
      `${BaseURL}/vouchers/find/?service=${service}`
    );
    const dataPromise = promise.then((res) => res.data);
    return dataPromise;
  }

  static async getVouchersBuy(service) {
    const promise = axios.get(
      `${BaseURL}/vouchers/find/buy?service=${service}`
    );
    const dataPromise = promise.then((res) => res.data);
    return dataPromise;
  }

  static async getVoucher(id) {
    const promise = axios.get(
      `${BaseURL}/vouchers/find/voucher?id=${id}`
    );
    const dataPromise = promise.then((res) => res.data);
    return dataPromise;
  }

  static async putVoucher(id, user) {
    axios.put(
      `${BaseURL}/vouchers/activate/voucher?id=${id}&user=${user}`
    );
  }

  static async putVoucherBuy(id, user) {
    axios.put(
      `${BaseURL}/vouchers/owned/voucher?id=${id}&user=${user}`
    );
  }

  // Article
  static async getArticleAll() {
    const promise = axios.get(`${BaseURL}/articles`);
    const dataPromise = promise.then((res) => res.data);
    return dataPromise;
  }

  static async getArticleVoucher(id) {
    const promise = axios.get(
      `${BaseURL}/articles/find/article-voucher?id=${id}`
    );
    const dataPromise = promise.then((res) => res.data);
    return dataPromise;
  }

  // Giftcard
  static async putGiftcard(id, user) {
    axios.put(
      `${BaseURL}/giftcards/activate/giftcard?id=${id}&user=${user}`
    );
  }
}
