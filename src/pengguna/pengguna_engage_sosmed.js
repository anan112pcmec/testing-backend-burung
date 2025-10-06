import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,       // jumlah virtual users
    duration: '1s', // cukup 1 detik karena hanya 1 request
};

export default function () {
    const url = 'http://localhost:8080/user/social-media/engage-social-media';

    const payload = JSON.stringify({
      data_identitas_pengguna:{
        id_pengguna:1,
        username_pengguna:"user1",
        email_pengguna:"ananlol156@gmail.com"
      },
      data_social_media:{
        id_social_media:0,
        entity_id_social_media:1,
        whatsapp_social_media:"081389709265",
        facebook_social_media:"anan222",
        tiktok_social_media:"",
        instagram_social_media:"faizzanan",
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
