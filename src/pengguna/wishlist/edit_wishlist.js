// k6 run wishlist/edit_wishlist.js
import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 1,              // jumlah virtual user
  iterations: 1,      // lama tes
};


// EditWishlist

// Skema Benar: 	Menyertakan Identitas Pengguna
// 		IdWishlist tak boleh lebih kecil atau sama dengan 0
// 		Nama Wishlist tidak boleh kosong 
// 		Visibility Diantara "Public" atau Private

// Skema Salah:	Tidak Menyertakan Identitas Pengguna 
// 		IdWishlist lebih kecil atau sama dengan 0
// 		Nama Wishlist kosong 
// 		Visibility Tidak Diantara "Public" atau "Private"


export default function () {
  let url = "http://localhost:8080/user/wishlist/edit-wishlist";

  let payloadBenar = JSON.stringify({
    identitas_pengguna: {
      id_pengguna: 2,
      username_pengguna: "ananlol_anjay11",
      email_pengguna: "ananlol156@gmail.com",
    },
    id_wishlist: 2,
    nama: "MANIAC",
    Deskripsi: "kosong",
    visibility: "Public",
  });

  let payloadSalah = JSON.stringify({
     identitas_pengguna: {
      id_pengguna: 1,
      username_pengguna: "ananlol156_cuy",
      email_pengguna: "ananlol156@gmail.com",
    },
    id_wishlist: 0,
    nama: "Makanan Enak",
    Deskripsi: "kosong",
    visibility: "Public",
  })

  let params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

   const resBenar = http.patch(url, payloadBenar, params);
    // const resSalah = http.patch(url, payloadSalah, params)
  
    try {
      console.log("Skema Benar: ", JSON.stringify(JSON.parse(resBenar.body), null, 2));
      console.log("Skema Salah: ", JSON.stringify(JSON.parse(resSalah.body), null, 2))
    } catch {
      console.log(resBenar.body);
      console.log(resSalah.body)
    }
}