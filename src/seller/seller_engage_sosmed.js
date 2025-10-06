import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,       // jumlah virtual users
    duration: '1s', // cukup 1 detik karena hanya 1 request
};

export default function () {
    const url = 'http://localhost:8080/seller/social-media/social-media-engage';

    const payload = JSON.stringify({
      data_identitas_seller:{
        id_seller:1,
        username_seller:"adidas",
        email_seller:"anan29837@gmail.com"
      },
      data_social_media:{
        id_social_media:2,
        entity_id_social_media:1,
        whatsapp_social_media:"08138970",
        facebook_social_media:"coy adidas",
        tiktok_social_media:"manya",
        instagram_social_media:"adidasan",
      }

    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };


    const res = http.patch(url, payload, params);

     // cek status dan payload
    check(res, {
        'status is 200': (r) => r.status === 200,
        'response has payload': (r) => r.body.includes('payload') || r.body.length > 0,
    });

    // parse JSON dan log payload
    try {
        let data = JSON.parse(res.body);
        console.log(JSON.stringify(data, null, 2)); // pretty-print JSON
    } catch (e) {
        console.log('⚠️ Gagal parse JSON:', e);
        console.log('Raw body:', res.body);
    }

    sleep(1);
}
