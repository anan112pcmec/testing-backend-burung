import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,        // jumlah virtual user
    duration: '1s' // durasi tes
};

export default function () {
    const url = 'http://localhost:8080/user/komentar-barang/edit';

    // payload harus sesuai dengan struct PayloadKomentarBarang
    const payload = JSON.stringify({
        edit_payload_komentar: {
            id_komentar: 21,
            id_barang_induk: 40,
            id_entity: 1,
            jenis_entity: "admin",
            isi_komentar: "cidvwcuywdcswjxvsxqvwquvcxjwvcyuwc wjcvjwvcjwschjvshhsdvcjwbcjhdvcvdwjcbwjhdvchjdbcjvsducvdjwvcuedbckjwdnckjnwcneiuvbreivkjebvienkencdiwnxklnxuiwsbkxjskjxbwsbxkjnxisbxkjwsxkjbsjkxswjxiuefiervedbchdcdbcwkjdbcwbcjwbcjkwb",
        }
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.patch(url, payload, params);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'body contains success': (r) => r.body.includes('status:200'),
    });

    console.log('Response status: ' + res.status);
    console.log('Response body: ' + res.body);
    sleep(1)
}
