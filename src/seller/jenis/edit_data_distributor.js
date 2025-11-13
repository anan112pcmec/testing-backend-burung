// k6 run jenis/edit_data_distributor.js
import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 1,
  duration: "10s",
};

export default function () {
  const url = "http://localhost:8080/seller/jenis/edit-data-distributor";

  const payload = JSON.stringify({
    identitas_seller: {
      id_seller: 1,
      username_seller: "ananapparel",
      email_seller: "anan29837@gmail.com",
    },
    id_data_distributor: 2, // ganti sesuai ID data distributor yang ingin diedit
    nama_perusahaan: "PT Burung Nusantara Updated",
    kode_nib: "1234567890123",
    kode_npwp: "12.345.678.9-012.345",
    dokumen_izi_distributor_url: "https://example.com/dokumen_updated.pdf",
    alasan: "Memperbarui data distributor sesuai perubahan terbaru.",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.patch(url, payload, params);

  console.log("Status:", res.status);
  console.log("Response body:", res.body);

}
