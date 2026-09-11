// k6 run credential/membuat_pin.js

import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 1,               // jumlah virtual user (bisa ubah sesuai kebutuhan)
  iterations: 1,      // durasi test
};

const BASE_URL = "http://localhost:8080"; // GANTI sesuai domain API kamu

// MembuatPinPengguna:

// Skema Benar: 	PIN harus berisikan angka seluruhnya dan berisikan 6 satuan
// 		Password harus memiliki 1 angka dan underscore
// 		Harus Menyertakan Identitas 

// Skema Salah: 	PIN tidak berisikan angka seluruhnya, dan tidak berisikan pas 6 Password 
// 		Password tidak memiliki setidaknya 1 angka atau underscore
// 		Tidak menyertakan Identitas

// skemabenar: *, skemasalah: *,

export default function () {
  const url =  `${BASE_URL}/user/credential/membuat-pin`
  
  const payloadBenar = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlolanjay11",
      email_pengguna: "anan29837@gmail.com",
    },
    password_user_membuat_pin: "MakannAtap12_",
    pin_user_membuat_pin: "120076"
  });

  const payloadSalah = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlolanjay11",
      email_pengguna: "anan29837@gmail.com",
    },
    password_user_membuat_pin: "MakannAtap11_",
    pin_user_membuat_pin: "1200a6" //salah disini
  })

  const params = {
    "Content-Type": "application/json",
  };

   const resBenar = http.post(url, payloadBenar, params);
      const resSalah = http.post(url, payloadSalah, params)
      
        try {
          console.log("Skema Benar: ", JSON.stringify(JSON.parse(resBenar.body), null, 2));
          console.log("Skema Salah: ", JSON.stringify(JSON.parse(resSalah.body), null, 2));
        } catch {
          console.log(resBenar.body);
          console.log(resSalah.body);
        }

  // INFO[0000] Skema Benar:  {
  //   "status": 200,
  //   "service": "MembuatSecretPinPengguna",
  //   "pesan": "PIN berhasil dibuat.",
  //   "response_payload": null
  // }  source=console
  // INFO[0000] Skema Salah:  {
  //   "status": 401,
  //   "service": "MembuatSecretPinPengguna",
  //   "pesan": "Gagal data pin tidak sesuai format ketentuan",
  //   "response_payload": null
  // }  source=console

  sleep(1);
}
