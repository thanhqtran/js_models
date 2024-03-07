/// kimura and yasui (2007) career choice model
const { fsolve } = require('mathjs');

// Parameters
const alpha = 0.33;
const tau = 0.6;
const gamma = 0.6;
const z = 0.2;
const b = 0.1;
const A = 4.5;

// Functions
function theta() {
    const term1 = Math.pow((1 - tau), (1 / (alpha * (1 - gamma))) - 1) / (1 - gamma);
    const term2 = Math.pow(((1 - alpha) / b), (1 / alpha));
    return term1 * term2;
}

const thetaVal = theta();
const k_bar = 1 / thetaVal;


function k1(k) {
    if (k < k_bar) {
        const C1 = A * z * (1 - gamma) / gamma;
        const C2 = 1 / (1 - tau * thetaVal * k);
        const B1 = (1 - alpha) * Math.pow((1 - tau), (1 - alpha)) * Math.pow(thetaVal, (1 - alpha)) / Math.pow((1 - gamma), alpha);
        return C1 * C2 * (B1 * k + (1 - thetaVal * k) * b);
    } else {
        const C1 = A * z * (1 - gamma) / gamma;
        const C2 = (1 - alpha) / (Math.pow((1 - tau), alpha) * Math.pow((1 - gamma), alpha));
        return C1 * C2 * Math.pow(k, alpha);
    }
}

function phi(k) {
    const phi_crude = thetaVal * k;
    if (phi_crude < 1) {
        return phi_crude;
    } else {
        return 1;
    }
}

function m(k) {
    return (1 - tau * phi(k)) * gamma / z;
}

// Find the steady states by path finding
// first, take a guess for the steady state
// then, find k1(k), and compare it to k, if it's the same, then it's the steady state
// if not, then take k1 as the new k, and repeat the process

let k = k_bar * 1.2;
let k1_val = k1(k);
let k1_val_old = 0;

while (Math.abs(k1_val - k) > 0.000001) {
    k1_val_old = k1_val;
    k1_val = k1(k1_val);
    k = k1_val_old;
}

let k2 = k_bar * 0.8;
let k2_val = k1(k2);
let k2_val_old = 0;

while (Math.abs(k2_val - k2) > 0.000001) {
    k2_val_old = k2_val;
    k2_val = k1(k2_val);
    k2 = k2_val_old;
}

console.log(k1_val);
console.log(k2_val);
