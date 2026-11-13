// k6 run /informasi/hapus_informasi_kurir.js
import http from "k6/http"
import {sleep, check} from "k6"

export let options = {
    vus: 1,
    iterations: 1,
}

export default function(){
    const url = 'http://localhost:8080/kurir/informasi/hapus-informasi-kurir';
      const params = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
    
      /* ===============================
         1️⃣ SKEMA BENAR
         =============================== */
      const payloadBenar = JSON.stringify({
        identitas_kurir: {
          id_kurir: 1,
          username_kurir: "Abangkuabang1_",
          email_kurir: "anan29837@gmail.com",
        },
        id_informasi_kurir: 2,       // > 0
      });
    
      const resBenar = http.del(url, payloadBenar, params);
    
      check(resBenar, {
        "skema benar status 200": (r) => r.status === 200,
      });
    
      /* ===============================
         2️⃣ SKEMA SALAH (DITOLAK)
         =============================== */
      const payloadSalah = JSON.stringify({
        identitas_kurir: {
          id_kurir: 1,
          username_kurir: "Abangkuabang1_",
          email_kurir: "anan29837@gmail.com",
        },
        id_informasi_kurir: 0,       // <= 0
      
      });
    
      const resSalah = http.del(url, payloadSalah, params);
    
      check(resSalah, {
        "skema salah ditolak (bukan 200)": (r) => r.status !== 200,
      });
    
      try {
        console.log("Skema Benar: ", JSON.stringify(JSON.parse(resBenar.body), null, 2));
        console.log("Skema Salah: ", JSON.stringify(JSON.parse(resSalah.body), null, 2));
      } catch {
        console.log("Respon Benar: ", resBenar.body);
        console.log("Respon Salah: ", resSalah.body);
      }
    
      sleep(1);
}