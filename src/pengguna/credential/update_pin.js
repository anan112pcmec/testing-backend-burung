// k6 run credential/update_pin.js
import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 1,               // jumlah virtual user
  iterations: 1,      // durasi test
};

const BASE_URL = "http://localhost:8080"; // GANTI sesuai host API kamu

// UpdateSecretPinPengguna: 

// Skema benar: 	OTP lama harus bernilai angka semua 8 satuan
// 		OTP baru harus bernilai angka semua 8 satuan 
// 		Harus Menyertakan Identitas 

// Skema Salah: 	Otp lama memiliki karakter atau tidak pas 8 satuan
// 		Otp baru memiliki karakter atau tidak pas 8 satuan 
// 		Tidak menyertakan Identitas

// skemabenar: *, skemasalah: *

export default function () {
  
  const url = `${BASE_URL}/user/credential/update-pin`;

  const payloadBenar = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlolanjay11",
      email_pengguna: "anan29837@gmail.com",
    },
    pin_baru_update_pin: "120076",
    pin_lama_update_pin: "123456",
  });

  const payloadSalah = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlolanjay11",
      email_pengguna: "anan29837@gmail.com",
    },
    pin_baru_update_pin: "121212",
    pin_lama_update_pin: "12oo76" //salah disini
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
//   "status": 200,
//   "service": "UpdateSecretPinPengguna",
//   "pesan": "PIN berhasil diubah.",
//   "response_payload": null
// }  source=console
// INFO[0000] Skema Salah:  {
//   "status": 401,
//   "service": "UpdateSecretPinPengguna",
//   "pesan": "Gagal format pin lama tidak sesuai",
//   "response_payload": null
// }  source=console