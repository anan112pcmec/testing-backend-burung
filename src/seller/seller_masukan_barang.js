import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,
    duration: '10s',
};

export default function () {
    const url = 'http://localhost:8080/seller/masukan_barang';

   const payloads = [
    JSON.stringify({
      id_seller: 1,
      barang_induk_dimasukan: {
        id_seller_barang_induk: 0,
        nama_barang_induk: "Bola Voli Mikasa EREN",
        jenis_barang_induk: "Semua Barang",
        deskripsi_barang_induk: "Bola voli resmi dengan kualitas turnamen",
        tanggal_rilis_barang_induk: "2025-09-11",
        original_kategori: "Kuning",
        harga_kategori_barang: 350000
      },
      kategori_barang_induk: [
        {
          nama_kategori_barang: "Kuning",
          deskripsi_kategori_barang: "Bola voli outdoor dan indoor EREN",
          warna_kategori_barang: "Kuning",
          stok_kategori_barang: 30,
          harga_kategori_barang: 350000,
          berat_gram_kategori_barang: 450,
          dimensi_panjang_cm_kategori_barang: 22,
          dimensi_tinggi_cm_kategori_barang: 22,
          sku_kategori: "BV-001"
        }
      ]
    }),

    JSON.stringify({
      id_seller: 1,
      barang_induk_dimasukan: {
        id_seller_barang_induk: 0,
        nama_barang_induk: "Sepatu Futsal Adidas Predator",
        jenis_barang_induk: "Semua Barang",
        deskripsi_barang_induk: "Sepatu futsal dengan grip maksimal dan desain modern",
        tanggal_rilis_barang_induk: "2025-08-21",
        original_kategori: "Hitam Merah",
        harga_kategori_barang: 850000
      },
      kategori_barang_induk: [
        {
          nama_kategori_barang: "Hitam Merah",
          deskripsi_kategori_barang: "Model terbaru dengan outsole anti-slip",
          warna_kategori_barang: "Hitam Merah",
          stok_kategori_barang: 50,
          harga_kategori_barang: 850000,
          berat_gram_kategori_barang: 700,
          dimensi_panjang_cm_kategori_barang: 30,
          dimensi_tinggi_cm_kategori_barang: 12,
          sku_kategori: "SF-002"
        }
      ]
    }),

    JSON.stringify({
      id_seller: 1,
      barang_induk_dimasukan: {
        id_seller_barang_induk: 0,
        nama_barang_induk: "Raket Badminton Yonex Astrox 88D",
        jenis_barang_induk: "Semua Barang",
        deskripsi_barang_induk: "Raket badminton high-end untuk kontrol dan power",
        tanggal_rilis_barang_induk: "2025-06-10",
        original_kategori: "Merah",
        harga_kategori_barang: 2100000
      },
      kategori_barang_induk: [
        {
          nama_kategori_barang: "Merah",
          deskripsi_kategori_barang: "Dilengkapi dengan teknologi Rotational Generator System",
          warna_kategori_barang: "Merah",
          stok_kategori_barang: 25,
          harga_kategori_barang: 2100000,
          berat_gram_kategori_barang: 85,
          dimensi_panjang_cm_kategori_barang: 67,
          dimensi_tinggi_cm_kategori_barang: 2.5,
          sku_kategori: "RB-003"
        }
      ]
    }),

    JSON.stringify({
      id_seller: 1,
      barang_induk_dimasukan: {
        id_seller_barang_induk: 0,
        nama_barang_induk: "Jersey Bola Manchester United 2025",
        jenis_barang_induk: "Semua Barang",
        deskripsi_barang_induk: "Jersey resmi edisi home musim 2025/2026",
        tanggal_rilis_barang_induk: "2025-07-15",
        original_kategori: "Merah",
        harga_kategori_barang: 450000
      },
      kategori_barang_induk: [
        {
          nama_kategori_barang: "Merah",
          deskripsi_kategori_barang: "Terbuat dari bahan AEROREADY yang menyerap keringat",
          warna_kategori_barang: "Merah",
          stok_kategori_barang: 100,
          harga_kategori_barang: 450000,
          berat_gram_kategori_barang: 250,
          dimensi_panjang_cm_kategori_barang: 35,
          dimensi_tinggi_cm_kategori_barang: 2,
          sku_kategori: "JB-004"
        }
      ]
    }),

    JSON.stringify({
      id_seller: 1,
      barang_induk_dimasukan: {
        id_seller_barang_induk: 0,
        nama_barang_induk: "Topi Baseball New Era Yankees",
        jenis_barang_induk: "Semua Barang",
        deskripsi_barang_induk: "Topi baseball premium dengan logo tim ikonik Yankees",
        tanggal_rilis_barang_induk: "2025-09-30",
        original_kategori: "Hitam",
        harga_kategori_barang: 320000
      },
      kategori_barang_induk: [
        {
          nama_kategori_barang: "Hitam",
          deskripsi_kategori_barang: "Topi snapback dengan bahan katun berkualitas tinggi",
          warna_kategori_barang: "Hitam",
          stok_kategori_barang: 40,
          harga_kategori_barang: 320000,
          berat_gram_kategori_barang: 180,
          dimensi_panjang_cm_kategori_barang: 18,
          dimensi_tinggi_cm_kategori_barang: 10,
          sku_kategori: "TP-005"
        }
      ]
    })
  ];

  payloads.push(
  JSON.stringify({
    id_seller: 1,
    barang_induk_dimasukan: {
      id_seller_barang_induk: 0,
      nama_barang_induk: "Speaker Bluetooth JBL Flip 6",
      jenis_barang_induk: "Semua Barang",
      deskripsi_barang_induk: "Speaker portabel tahan air dengan suara bass kuat",
      tanggal_rilis_barang_induk: "2025-09-15",
      original_kategori: "Hitam",
      harga_kategori_barang: 1300000
    },
    kategori_barang_induk: [
      {
        nama_kategori_barang: "Hitam",
        deskripsi_kategori_barang: "Speaker portable, waterproof, 12 jam battery life",
        warna_kategori_barang: "Hitam",
        stok_kategori_barang: 50,
        harga_kategori_barang: 1300000,
        berat_gram_kategori_barang: 550,
        dimensi_panjang_cm_kategori_barang: 18,
        dimensi_tinggi_cm_kategori_barang: 7,
        sku_kategori: "SP-011"
      }
    ]
  }),
  JSON.stringify({
    id_seller: 1,
    barang_induk_dimasukan: {
      id_seller_barang_induk: 0,
      nama_barang_induk: "Kamera Digital Canon EOS 250D",
      jenis_barang_induk: "Semua Barang",
      deskripsi_barang_induk: "Kamera DSLR ringan untuk pemula dengan layar LCD vari-angle",
      tanggal_rilis_barang_induk: "2025-08-01",
      original_kategori: "Hitam",
      harga_kategori_barang: 6500000
    },
    kategori_barang_induk: [
      {
        nama_kategori_barang: "Hitam",
        deskripsi_kategori_barang: "DSLR 24.1MP, DIGIC 8 processor, 4K video",
        warna_kategori_barang: "Hitam",
        stok_kategori_barang: 25,
        harga_kategori_barang: 6500000,
        berat_gram_kategori_barang: 450,
        dimensi_panjang_cm_kategori_barang: 12,
        dimensi_tinggi_cm_kategori_barang: 9,
        sku_kategori: "CM-012"
      }
    ]
  }),
  JSON.stringify({
    id_seller: 1,
    barang_induk_dimasukan: {
      id_seller_barang_induk: 0,
      nama_barang_induk: "Keyboard Mechanical Razer BlackWidow",
      jenis_barang_induk: "Semua Barang",
      deskripsi_barang_induk: "Keyboard gaming dengan switch hijau, backlit RGB",
      tanggal_rilis_barang_induk: "2025-07-20",
      original_kategori: "Hitam",
      harga_kategori_barang: 2100000
    },
    kategori_barang_induk: [
      {
        nama_kategori_barang: "Hitam",
        deskripsi_kategori_barang: "Mechanical keyboard, anti-ghosting, RGB lighting",
        warna_kategori_barang: "Hitam",
        stok_kategori_barang: 80,
        harga_kategori_barang: 2100000,
        berat_gram_kategori_barang: 1200,
        dimensi_panjang_cm_kategori_barang: 44,
        dimensi_tinggi_cm_kategori_barang: 15,
        sku_kategori: "KB-013"
      }
    ]
  }),
  JSON.stringify({
    id_seller: 1,
    barang_induk_dimasukan: {
      id_seller_barang_induk: 0,
      nama_barang_induk: "Mouse Gaming Logitech G502",
      jenis_barang_induk: "Semua Barang",
      deskripsi_barang_induk: "Mouse gaming presisi tinggi dengan berat dapat disesuaikan",
      tanggal_rilis_barang_induk: "2025-06-18",
      original_kategori: "Hitam",
      harga_kategori_barang: 750000
    },
    kategori_barang_induk: [
      {
        nama_kategori_barang: "Hitam",
        deskripsi_kategori_barang: "Gaming mouse, adjustable weight, 16000 DPI sensor",
        warna_kategori_barang: "Hitam",
        stok_kategori_barang: 100,
        harga_kategori_barang: 750000,
        berat_gram_kategori_barang: 121,
        dimensi_panjang_cm_kategori_barang: 13,
        dimensi_tinggi_cm_kategori_barang: 6,
        sku_kategori: "MS-014"
      }
    ]
  }),
  JSON.stringify({
    id_seller: 1,
    barang_induk_dimasukan: {
      id_seller_barang_induk: 0,
      nama_barang_induk: "Power Bank Anker 20000mAh",
      jenis_barang_induk: "Semua Barang",
      deskripsi_barang_induk: "Power bank kapasitas besar dengan fast charging",
      tanggal_rilis_barang_induk: "2025-08-10",
      original_kategori: "Hitam",
      harga_kategori_barang: 450000
    },
    kategori_barang_induk: [
      {
        nama_kategori_barang: "Hitam",
        deskripsi_kategori_barang: "20000mAh, fast charging, dual port output",
        warna_kategori_barang: "Hitam",
        stok_kategori_barang: 150,
        harga_kategori_barang: 450000,
        berat_gram_kategori_barang: 350,
        dimensi_panjang_cm_kategori_barang: 16,
        dimensi_tinggi_cm_kategori_barang: 7,
        sku_kategori: "PB-015"
      }
    ]
  }),
  JSON.stringify({
    id_seller: 1,
    barang_induk_dimasukan: {
      id_seller_barang_induk: 0,
      nama_barang_induk: "Laptop ASUS VivoBook 15",
      jenis_barang_induk: "Semua Barang",
      deskripsi_barang_induk: "Laptop tipis dengan performa baik untuk kerja dan belajar",
      tanggal_rilis_barang_induk: "2025-09-05",
      original_kategori: "Silver",
      harga_kategori_barang: 7500000
    },
    kategori_barang_induk: [
      {
        nama_kategori_barang: "Silver",
        deskripsi_kategori_barang: "Intel i5, 8GB RAM, 512GB SSD, 15.6 inch",
        warna_kategori_barang: "Silver",
        stok_kategori_barang: 40,
        harga_kategori_barang: 7500000,
        berat_gram_kategori_barang: 1800,
        dimensi_panjang_cm_kategori_barang: 35,
        dimensi_tinggi_cm_kategori_barang: 23,
        sku_kategori: "LP-016"
      }
    ]
  }),
  JSON.stringify({
    id_seller: 1,
    barang_induk_dimasukan: {
      id_seller_barang_induk: 0,
      nama_barang_induk: "Kursi Gaming Secretlab Titan",
      jenis_barang_induk: "Semua Barang",
      deskripsi_barang_induk: "Kursi gaming ergonomis, adjustable, bahan kulit premium",
      tanggal_rilis_barang_induk: "2025-07-30",
      original_kategori: "Hitam",
      harga_kategori_barang: 9500000
    },
    kategori_barang_induk: [
      {
        nama_kategori_barang: "Hitam",
        deskripsi_kategori_barang: "Kursi gaming, ergonomic, adjustable armrest, lumbar support",
        warna_kategori_barang: "Hitam",
        stok_kategori_barang: 20,
        harga_kategori_barang: 9500000,
        berat_gram_kategori_barang: 25000,
        dimensi_panjang_cm_kategori_barang: 70,
        dimensi_tinggi_cm_kategori_barang: 130,
        sku_kategori: "KG-017"
      }
    ]
  }),
  JSON.stringify({
    id_seller: 1,
    barang_induk_dimasukan: {
      id_seller_barang_induk: 0,
      nama_barang_induk: "Drone DJI Mini 3 Pro",
      jenis_barang_induk: "Semua Barang",
      deskripsi_barang_induk: "Drone ringan dengan kamera 4K dan obstacle sensing",
      tanggal_rilis_barang_induk: "2025-06-25",
      original_kategori: "Putih",
      harga_kategori_barang: 8500000
    },
    kategori_barang_induk: [
      {
        nama_kategori_barang: "Putih",
        deskripsi_kategori_barang: "Drone 249g, 4K camera, GPS, obstacle avoidance",
        warna_kategori_barang: "Putih",
        stok_kategori_barang: 30,
        harga_kategori_barang: 8500000,
        berat_gram_kategori_barang: 249,
        dimensi_panjang_cm_kategori_barang: 15,
        dimensi_tinggi_cm_kategori_barang: 8,
        sku_kategori: "DR-018"
      }
    ]
  }),
  JSON.stringify({
    id_seller: 1,
    barang_induk_dimasukan: {
      id_seller_barang_induk: 0,
      nama_barang_induk: "Printer Canon Pixma G3010",
      jenis_barang_induk: "Semua Barang",
      deskripsi_barang_induk: "Printer all-in-one dengan refill ink tank",
      tanggal_rilis_barang_induk: "2025-08-12",
      original_kategori: "Putih",
      harga_kategori_barang: 2000000
    },
    kategori_barang_induk: [
      {
        nama_kategori_barang: "Putih",
        deskripsi_kategori_barang: "Printer A4, print/scan/copy, refill ink tank",
        warna_kategori_barang: "Putih",
        stok_kategori_barang: 60,
        harga_kategori_barang: 2000000,
        berat_gram_kategori_barang: 5000,
        dimensi_panjang_cm_kategori_barang: 43,
        dimensi_tinggi_cm_kategori_barang: 31,
        sku_kategori: "PR-019"
      }
    ]
  }),
  JSON.stringify({
    id_seller: 1,
    barang_induk_dimasukan: {
      id_seller_barang_induk: 0,
      nama_barang_induk: "Tas Selempang Anti Maling",
      jenis_barang_induk: "Semua Barang",
      deskripsi_barang_induk: "Tas selempang aman dengan material anti cut",
      tanggal_rilis_barang_induk: "2025-10-01",
      original_kategori: "Abu-Abu",
      harga_kategori_barang: 300000
    },
    kategori_barang_induk: [
      {
        nama_kategori_barang: "Abu-Abu",
        deskripsi_kategori_barang: "Tas anti-maling, water resistant, RFID safe pocket",
        warna_kategori_barang: "Abu-Abu",
        stok_kategori_barang: 110,
        harga_kategori_barang: 300000,
        berat_gram_kategori_barang: 450,
        dimensi_panjang_cm_kategori_barang: 30,
        dimensi_tinggi_cm_kategori_barang: 15,
        sku_kategori: "TS-020"
      }
    ]
  })
);




    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    for (let i = 0; i < payloads.length; i++) {
        const res = http.post(url, payloads[i], params);

        check(res, {
            'status is 200': (r) => r.status === 200,
        });

        console.log(`Barang ${i + 1} → Status: ${res.status}`);
        console.log(`Barang ${i + 1} → Body: ${res.body}`);

    }

}