import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  const url = "http://localhost:8080/kurir/alamat/masukan-alamat";

  const payload = JSON.stringify({
    identitas_kurir: {
      id_kurir: 1,
      token_kurir: "contoh_token_valid",
    },
    panggilan_alamat: "Rumah Utama",
    nomor_telephone: "08123456789",
    nama_alamat: "Alamat Rumah Depok",
    kota: "Depok",
    kode_negara: "ID",
    kode_pos: "16412",
    deskripsi: "Rumah pribadi dekat kampus UI",
    longtitude: 106.8325,
    latitude: -6.3655,
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url, payload, params);

  try {
    const json = JSON.parse(res.body);
    console.log("=== RESPONSE OBJEK ===");
    console.log(JSON.stringify(json, null, 2)); // tampil rapi
  } catch (e) {
    console.log("=== RESPONSE RAW ===");
    console.log(res.body);
  }

  sleep(1);
}
