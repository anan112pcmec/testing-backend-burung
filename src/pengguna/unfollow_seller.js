import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,
  duration: '1s',
};

const urlCheckout = 'http://localhost:8080/user/social-media/unfollow-seller';

const payloadCheckout = {
  data_identitas_pengguna:{
        id_pengguna:1,
        username_pengguna:"user1",
        email_pengguna:"ananlol156@gmail.com"
      },
      id_seller_follow:1
    }

const params = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function () {
  const res = http.del(urlCheckout, JSON.stringify(payloadCheckout), params);

  // Parse body JSON -> jadi objek
  let bodyObj;
  try {
    bodyObj = JSON.parse(res.body);
  } catch (e) {
    bodyObj = { error: "Response bukan JSON valid", raw: res.body };
  }

  // Validasi response
  check(res, {
    'status is 200': (r) => r.status === 200,
    'body has success message': (r) =>
      bodyObj.message && bodyObj.message.includes('Berhasil'),
  });

  // Console log objek jelas
  console.log('Response body object:', JSON.stringify(bodyObj, null, 2));

  sleep(1);
}
