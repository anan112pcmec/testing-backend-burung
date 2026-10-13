// k6 run pengiriman/kirim_eks.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,         // jumlah virtual user
  iterations: 1,  // deterministic
};

// KirimPengirimanEks:

// Skema Benar: