// k6 run jenis/hapus_data_brand.js
import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 1,
  duration: "10s",
};

export default function () {
  const url = "http://localhost:8080/seller/jenis/hapus-data-brand";

  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_data_brand: 1, // ganti sesuai ID data brand yang ingin dihapus
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.del(url, payload, params);

  console.log("Status:", res.status);
  console.log("Response body:", res.body);

}
