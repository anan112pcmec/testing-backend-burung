// k6 run credential/preubah_pass.js
import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 1,               // jumlah virtual user
  iterations: 1,       // durasi test
};

// PreubahPasswordPengguna:
// Skema benar:	Password Baru Harus memiliki 1 angka dan underscore
// 		Password Sebelum harus memiliki 1 angka dan underscore
// 		Faktor Kedua harus diantara "OTP" atau "PIN" 
// 		Harus Menyertakan Identitas

// Skema Salah: 	Password Baru tidak memiliki 1 angka atau underscore 
// 		Password Sebelum tidak memiliki 1 angka atau underscore 
// 		Faktor kedua selain "OTP" atau "PIN"
// 		Tidak Menyertakan Identitas
 
// skemabenar: *, skemasalah: *,


export default function () {
  const url = "http://localhost:8080/user/credential/update-password";

  const payloadBenar = JSON.stringify({
     identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlolanjay11",
      email_pengguna: "anan29837@gmail.com",
    },
    password_sebelum_user: "MakannAtap12_",     // ⚠️ HARUS sesuai password di DB
    password_baru_user: "MakannAtap13_",
    faktor_kedua_ganti_password_user: "PIN",    // misalnya OTP, PIN, dll
  });

  const payloadSalah = JSON.stringify({
     identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlolanjay",
      email_pengguna: "anan29837@mail.com",
    },
    password_sebelum_user: "Bismillah13",     // ⚠️ HARUS sesuai password di DB
    password_baru_user: "MakannAtap",
    faktor_kedua_ganti_password_user: "IC",    // misalnya OTP, PIN, dl
  })

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
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

  //   INFO[0006] Skema Benar:  {
  //   "status": 200,
  //   "service": "PreUbahPasswordPengguna",
  //   "pesan": "Berhasil, silakan masukkan kredensial berikutnya: OTP.",
  //   "response_payload": null
  // }  source=console
  // INFO[0006] Skema Salah:  {
  //   "status": 401,
  //   "service": "PreUbahPasswordPengguna",
  //   "pesan": "Gagal, password baru tidak sesuai ketentuan",
  //   "response_payload": null
  // }  source=console

  sleep(1);
}
