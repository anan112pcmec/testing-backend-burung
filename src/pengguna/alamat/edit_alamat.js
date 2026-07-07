// k6 run alamat/edit_alamat.js
import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 1,            // jumlah virtual user andika putra madya
  duration: "10s",    // lama test
};

export default function () {
  const url = "http://localhost:8080/user/alamat/edit-alamat";

  const payload = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 4,
      username_pengguna: "andika putra madya",
      email_pengguna: "anan29837@gmail.com",
    },
    id_alamat_pengguna: 7,     // ⚠️ GANTI sesuai ID yang mau di-edit
    panggilan_alamat: "Kantor Faiz",
    nomor_telefon: "081299887755",
    nama_alamat: "Jalan Sakura No. 15",
    provinsi: "dki_jakarta",
    kota: "jakarta timur",
    kode_pos: "12560",
    kode_negara: "ID",
    deskripsi: "Ini alamat kantor baru",
    longitude: 106.8219,
    latitude: -6.2088,
  });

  const headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.patch(url, payload, headers);

  console.log(res.body);
  check(res, {
    "Status 200": (r) => r.status === 200,
    "Response OK": (r) => r.body.length > 0,
  });

}
