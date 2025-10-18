import http from 'k6/http';
import encoding from 'k6/encoding';
import { check } from 'k6';

export const options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  const queueName = 'notification_user_5_nadia'; // ganti sesuai nama queue kamu
  const url = `http://localhost:15672/api/queues/%2F/${queueName}/bindings`;

  // Basic Auth encoding (manual karena k6 bukan browser)
  const credentials = encoding.b64encode('burung:burungapp');

  const params = {
    headers: {
      Authorization: `Basic ${credentials}`,
    },
  };

  const res = http.get(url, params);

  check(res, {
    'status 200': (r) => r.status === 200,
  });

  console.log('Response body:');
  console.log(res.body);
}
