// k6 run /auth/login.js


import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 1,           // jumlah virtual user
  iterations: 1,  // lama test
};

// ValidateUserRegistration: 
// Skema Benar: 	Otp harus memiliki 8 satuan angka, tidak berisikan huruf

// Skema Salah: 	Otp tidak pas 8 satuan angka, berisikan setidaknya 1 huruf

// skemabenar:* , skemasalah:* 
// },

// {UserLogin: 

// Skema Benar: 	Email Harus memiliki @gmail.com

// Skema Salah	Email Tidak memiliki @gmail.com

// skemabenar:*, skemasalah:*,

export default function () {
  const url = 'http://localhost:8080/auth/user/login';

  const payloadBenar = JSON.stringify({
    email: 'anan29837@gmail.com',
    password_hash: 'Bismillah_13',
  });

  const payloadSalah = JSON.stringify({
    email: 'anan29837@gml.com',
    password_hash: 'rahasiadeh123',
  })

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
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

  sleep(1)

  // INFO[0000] Skema Benar:  {
  //   "status": 200,
  //   "service": "PenggunaLogin",
  //   "pesan": "",
  //   "response_payload": {
  //     "status_login_user": "Berhasil",
  //     "pesan_login_user": "Kamu Berhasil Login Selamat datang",
  //     "id": 1,
  //     "nama": "Faiz Hannan Hakim",
  //     "username": "ananlolanjay11"
  //   }
  // }  source=console
  // INFO[0000] Skema Salah:  {
  //   "status": 401,
  //   "service": "PenggunaLogin",
  //   "pesan": "Gagal, format tidak valid",
  //   "response_payload": null
  // }  source=console
}
