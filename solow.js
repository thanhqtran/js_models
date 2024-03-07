// Solow model parameters
const s = 0.3; // savings rate
const n = 0.02; // population growth rate
const δ = 0.1; // depreciation rate
const α = 0.3; // output elasticity of capital
const g = 0.02; // technological progress rate

// Initial conditions
let K = 100; // initial capital stock
let L = 100; // initial labor force
let A = 1; // initial level of technology
let t = 0; // time

// Function to calculate output
function calculateOutput(K, L, A) {
    return A * Math.pow(K, α) * Math.pow(L, 1 - α);
}

// Function to update the capital stock
function updateCapital(K, L, A, s, δ, α, n, g) {
    let Y = calculateOutput(K, L, A);
    let Kdot = s * Y - δ * K - n * K;
    Kdot /= (1 + n);
    Kdot += g * K;
    return Kdot;
}

// Function to simulate the Solow model dynamics
function simulateSolow() {
    const dt = 0.01; // time step
    const T = 100; // total time steps

    let timeSeries = [];

    for (let i = 0; i < T; i++) {
        let Y = calculateOutput(K, L, A);
        let Kdot = updateCapital(K, L, A, s, δ, α, n, g);
        K += Kdot * dt;
        t += dt;
        timeSeries.push({ time: t, capital: K, output: Y });
    }

    return timeSeries;
}

// Simulate the Solow model dynamics
let solowData = simulateSolow();

// Print the results
solowData.forEach((data) => {
    console.log(`Time: ${data.time.toFixed(2)}, Capital: ${data.capital.toFixed(2)}, Output: ${data.output.toFixed(2)}`);
});
