import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  const url = "http://localhost:8080/kurir/alamat/hapus-alamat";

  const payload = JSON.stringify({
    identitas_kurir: {
      id_kurir: 1,
      token_kurir: "contoh_token_valid",
    },
    id_alamat_kurir: 2, // ganti sesuai ID alamat yang mau dihapus
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.del(url, payload, params);

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
