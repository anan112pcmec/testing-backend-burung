// k6 run alamat/masukan_alamat.js
import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 10,              // jumlah virtual user
  duration: "30s",      // lama tes
};

export default function () {
  let url = "http://localhost:8080/user/alamat/membuat-alamat";

  let payload = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 4,
      username_pengguna: "andika putra madya",
      email_pengguna: "anan29837@gmail.com",
    },
    panggilan_alamat: "Rumah celek",
    nomor_telefon: "0812847928",
    nama_alamat: "Jalan Melati No. 7",
    provinsi: "jawa_timur",
    kota:     "bandung",
    kode_pos: "40123",
    kode_negara: "ID",
    deskripsi: "Rumah utama buat kirim barang",
    longitude: 108.6098,
    latitude: -7.9147,
  });

  let params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = http.post(url, payload, params);

  console.log(res.body)

  check(res, {
    "status adalah 200": (r) => r.status === 200,
    "response tidak kosong": (r) => r.body.length > 0,
  });


}
