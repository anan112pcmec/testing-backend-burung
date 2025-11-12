import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  const url = "http://localhost:8080/kurir/alamat/edit-alamat";

  const payload = JSON.stringify({
    identitas_kurir: {
      id_kurir: 1,
      token_kurir: "contoh_token_valid",
    },
    id_alamat_kurir: 2, // ganti sesuai ID alamat yang mau diedit
    panggilan_alamat: "Rumah Utama - Update",
    nomor_telephone: "081298765432",
    nama_alamat: "Alamat Rumah Depok Baru",
    kota: "Depok",
    kode_negara: "ID",
    kode_pos: "16412",
    deskripsi: "Rumah pribadi dekat UI (edit test)",
    longtitude: 106.8326,
    latitude: -6.3656,
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.patch(url, payload, params);

  try {
    const json = JSON.parse(res.body);
    console.log("=== RESPONSE OBJEK ===");
    console.log(JSON.stringify(json, null, 2));
  } catch (e) {
    console.log("=== RESPONSE RAW ===");
    console.log(res.body);
  }

  sleep(1);
}
