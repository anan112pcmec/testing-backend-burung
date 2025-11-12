import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 10, // jumlah virtual users
  duration: "30s", // durasi test
};

export default function () {
  const url = "http://localhost:8080/seller/edit_barang"; // ganti sesuai alamat server kamu

  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: 'ananapparel',
      email_seller: 'anan29837@gmail.com',
    },
    id_barang_induk: 1,
    nama_barang: "Kemeja Polos",
    jenis_barang: "Pakaian & Fashion",
    deskripsi: "untuk foto wisuda.",
  });

  const headers = {
    "Content-Type": "application/json",
  };

  const res = http.patch(url, payload, { headers });

  check(res, {
    "status 200": (r) => r.status === 200,
    "status 404": (r) => r.status === 404,
    "status 500": (r) => r.status === 500,
  });

  console.log(`Response: ${res.body}`);
}
