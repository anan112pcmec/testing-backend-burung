// k6 run profiling/personal_profiling.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,          // jumlah virtual user
  iterations: 1,  // lama test
};

// UbahPersonalProfilingPengguna:

// Skema Benar: 	Username update berisikan setidaknya 1 angka dan underscore
// 		Email update setidaknya memiliki @gmail.com
// 		menyertakan Identitas pengguna

// Skema Salah: 	Username update tidak berisikan setidaknya 1 angka atau underscore 
// 		email update tidak mengandung @gmail.com
// 		tidak menyertakan Identitas Pengguna

// skemabenar: *, skemasalah: *,

export default function () {
  const url = "http://localhost:8080/user/profiling/personal-update"; // ganti sesuai server

  const payloadBenar = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol156_cuy",
      email_pengguna: "ananlol156@gmail.com",
    },
    update_username_user: "BLANK",
    update_nama_user: "Faiz Hanan Hakim",
    update_email_user: "anan29837@gmail.com"
  });

  const payloadSalah = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlolanjay11",
      email_pengguna: "anan29837@gmail.com",
    },
    update_username_user: "ananlolcuy",
    update_nama_user: "Nama Baru Anan",
    update_email_user: "ananlol156@gail.com"
  })

  const params = {
    headers: {
      "Content-Type": "application/json",
      // "Authorization": "Bearer TOKEN_JIKA_PAKAI_AUTH"
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
          
  sleep(1);
}

// INFO[0000] Skema Benar:  {
//   "status": 200,
//   "service": "UbahPersonalProfilingPengguna",
//   "pesan": "Berhasil Memperbarui",
//   "response_payload": {
//     "response_update_username_user": {
//       "pesan_ubah_username_pengguna": "",
//       "saran_username_pengguna": null,
//       "status_diubah": false
//     },
//     "response_update_nama_user": {
//       "pesan_ubah_nama_pengguna": "Nama berhasil diubah.",
//       "status_diubah": true
//     },
//     "response_update_gmail_user": {
//       "pesan_ubah_email_pengguna": "Email berhasil diubah.",
//       "status_diubah": true
//     }
//   }
// }  source=console
// INFO[0000] Skema Salah:  {
//   "status": 401,
//   "service": "UbahPersonalProfilingPengguna",
//   "pesan": "Gagal format input tidak valid",
//   "response_payload": null
// }  source=console
