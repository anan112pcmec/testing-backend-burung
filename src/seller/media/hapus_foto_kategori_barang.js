// k6 run media/hapus_foto_kategori_barang.js

import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_media_kategori_barang_foto: 21, // ⬅️ SESUAI DATA DB
    key_foto: "seller/kategori_barang/25/14/foto_21.jpg", // ⬅️ KEY OBJECT MINIO
  });

  const res = http.del(
    "http://localhost:8080/seller/media/hapus-foto-kategori-barang",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  check(res, {
    "delete kategori barang foto status 200": (r) => r.status === 200,
  });

  console.log(res.body);

  sleep(1);
}
