// k6 run media/hapus_video_barang_induk.js

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
    id_media_barang_induk_video: 9, // ⬅️ SESUAI DATA DB
    key_video: "seller/barang_induk/video/barang_25/video_9.mp4", // ⬅️ KEY OBJECT MINIO
  });

  const res = http.del(
    "http://localhost:8080/seller/media/hapus-video-barang-induk",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  check(res, {
    "delete video status 200": (r) => r.status === 200,
  });

  console.log(res.body);

  sleep(1);
}
