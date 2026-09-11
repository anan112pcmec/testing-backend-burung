// k6 run credential/validate_ubah_pass_otp.js
import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
  vus: 1,          // jumlah virtual user
  iterations: 1,  // durasi test
};

const BASE_URL = "http://localhost:8080"; // ganti dengan URL API kamu


// ValidateUbahPasswordPenggunaViaOtp:

// Skema benar: 	Otp Harus Bernilai Angka semua 8 satuan

// Skema Salah: 	Otp memiliki karakter atau tidak pas 8 satuan

// skemabenar: *, skemasalah: *,

export default function () {
  const url = `${BASE_URL}/user/credential/validate-password-otp`;
  const payloadBenar = JSON.stringify({
    id_pengguna: 1,                // UBAH
    otp_key_ubah_password: "01529333"  // UBAH
  });

  const payloadSalah = JSON.stringify({
    id_pengguna: 1,
    otp_key_ubah_password: "9283929"
  })

  const params = {
    "Content-Type": "application/json",
  };

    const resBenar = http.patch(url, payloadBenar, params);
    const resSalah = http.patch(url, payloadSalah, params)
    
      try {
        console.log("Skema Benar: ", JSON.stringify(JSON.parse(resBenar.body), null, 2));
        console.log("Skema Salah: ", JSON.stringify(JSON.parse(resSalah.body), null, 2));
      } catch {
        console.log(resBenar.body);
        console.log(resSalah.body);
      }

  

  sleep(1);
}

// INFO[0000] Skema Benar:  {
//   "status": 401,
//   "service": "ValidateUbahPasswordPenggunaViaOtp",
//   "pesan": "OTP tidak valid atau sudah kadaluarsa.",
//   "response_payload": null
// }  source=console
// INFO[0000] Skema Salah:  {
//   "status": 401,
//   "service": "ValidateUbahPasswordPenggunaViaOtp",
//   "pesan": "Gagal Format Otp Tidak Valid", ----------------> Teruji memang validasi tidak valid
//   "response_payload": null
// }  source=console