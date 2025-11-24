// k6 run alamat/masukan_alamat.js
import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 1,              // jumlah virtual user
  duration: "15s",      // lama tes
};

export default function () {
  let url = "http://localhost:8080/user/alamat/membuat-alamat";

  let payload = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol",
      email_pengguna: "ananlol156@gmail.com",
    },
    panggilan_alamat: "Rumah Faiz",
    nomor_telefon: "08123456789",
    nama_alamat: "Jalan Melati No. 7",
    provinsi: "jawa_timur",
    kota:     "bandung",
    kode_pos: "40123",
    kode_negara: "ID",
    deskripsi: "Rumah utama buat kirim barang",
    longitude: 107.6098,
    latitude: -6.9147,
  });

  let params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = http.post(url, payload, params);

  check(res, {
    "status adalah 200": (r) => r.status === 200,
    "response tidak kosong": (r) => r.body.length > 0,
  });

}
