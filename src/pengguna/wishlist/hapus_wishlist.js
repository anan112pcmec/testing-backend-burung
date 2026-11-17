// k6 run wishlist/hapus_wishlist.js
import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 1,              // jumlah virtual user
  iterations: 1,      // lama tes
};

// TambahWishlist

// Skema Benar: 	Menyertakan Identitas Pengguna
// 		Nama Wishlist tidak boleh kosong 
// 		Visibility Diantara "Public" atau Private

// Skema Salah:	Tidak Menyertakan Identitas Pengguna 
// 		Nama Wishlist kosong 
// 		Visibility Tidak Diantara "Public" atau "Private"
// 


export default function () {
  let url = "http://localhost:8080/user/wishlist/hapus-wishlist";

  let payloadBenar = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 2,
      username_pengguna: "ananlol_anjay11",
      email_pengguna: "ananlol156@gmail.com",
    },
   id_wishlist: 3,
  });

  let payloadSalah = JSON.stringify({
     identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol156_cuy",
      email_pengguna: "ananlol156@gmail.com",
    },
    id_wishlist: -2,
  })

  let params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

   const resBenar = http.del(url, payloadBenar, params);
    const resSalah = http.del(url, payloadSalah, params)
  
    try {
      console.log("Skema Benar: ", JSON.stringify(JSON.parse(resBenar.body), null, 2));
      console.log("Skema Salah: ", JSON.stringify(JSON.parse(resSalah.body), null, 2))
    } catch {
      console.log(resBenar.body);
      console.log(resSalah.body)
    }
}
