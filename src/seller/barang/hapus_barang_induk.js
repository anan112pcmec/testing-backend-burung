import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 20,          // jumlah virtual users simultan
  duration: "30s",  // durasi pengujian
};

export default function () {
  const url = "http://localhost:8080/seller/hapus_barang"; // ganti sesuai URL server kamu

  const payload = JSON.stringify({
   identitas_seller: {
      id_seller: 1,
      username_seller: 'ananapparel',
      email_seller: 'anan29837@gmail.com',
    },
    id_barang_induk: 1,               // ID barang yang mau dihapus
  });

  const headers = {
    "Content-Type": "application/json",
  };

  const res = http.del(url, payload, { headers });

  check(res, {
    "status 200 (OK)": (r) => r.status === 200,
    "status 404 (Not Found)": (r) => r.status === 404,
    "status 500 (Server Error)": (r) => r.status === 500,
  });

  
}
