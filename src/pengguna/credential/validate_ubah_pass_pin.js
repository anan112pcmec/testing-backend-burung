// k6 run credential/validate_ubah_pass_pin.js
import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 1,               // jumlah virtual user
  duration: "1s",      // durasi test
};

// {
// ValidateUbahPasswordPenggunaViaPin: 
 
// Skema benar:	PIN harus bernilai angka semua 6 satuan

// Skema salah: 	PIN memiliki karakter atau tidak pas 6 satuan

// skemabenar: *, skemasalah: *,
// }


const BASE_URL = "http://localhost:8080"; // GANTI jika perlu

export default function () {

  const url = `${BASE_URL}/user/credential/validate-password-pin`;

  const payloadBenar = JSON.stringify({
    id_pengguna: 1,                   // Ubah sesuai test
    pin_key_ubah_password: "123456"   // PIN yang sedang diuji
  });

  const payloadSalah = JSON.stringify({
    id_pengguna: 1,                   // Ubah sesuai test
    pin_key_ubah_password: "123A56"   // PIN yang sedang diuji
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
//   "service": "ValidateUbahPasswordPenggunaViaPin",
//   "pesan": "Password berhasil diubah.",
//   "response_payload": null
// }  source=console
// INFO[0000] Skema Salah:  {
//   "status": 401,
//   "service": "ValidateUbahPasswordPenggunaViaPin",
//   "pesan": "PIN yang dimasukkan salah.",
//   "response_payload": null
// }  source=console