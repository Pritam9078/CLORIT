// Admin API Test Helper
// Open browser console and run: testAdminLogin()

async function testAdminLogin() {
    console.log('🔍 Testing Admin Login Flow...\n');

    // Test 1: Check if backend is running
    try {
        const healthRes = await fetch('http://localhost:5001/health');
        const health = await healthRes.json();
        console.log('✅ Backend Health:', health);
    } catch (error) {
        console.error('❌ Backend not running:', error);
        return;
    }

    // Test 2: Emergency key login
    try {
        console.log('\n🔐 Testing emergency key login...');
        const loginRes = await fetch('http://localhost:5001/api/admin/auth/key-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ adminKey: 'ADMIN987' })
        });

        const loginData = await loginRes.json();

        if (loginData.success) {
            console.log('✅ Login successful!');
            console.log('Token:', loginData.token);
            console.log('Admin:', loginData.admin);

            // Save token to localStorage
            localStorage.setItem('adminToken', loginData.token);
            console.log('✅ Token saved to localStorage');

            return loginData.token;
        } else {
            console.error('❌ Login failed:', loginData.message);
        }
    } catch (error) {
        console.error('❌ Login error:', error);
    }
}

async function testProjectApproval(projectId = 'CLORIT-2008') {
    console.log(`\n🔍 Testing Project Approval for ${projectId}...\n`);

    // Check token
    const token = localStorage.getItem('adminToken');
    if (!token) {
        console.error('❌ No admin token found. Run testAdminLogin() first.');
        return;
    }

    console.log('✅ Token found:', token.substring(0, 20) + '...');

    // Check MetaMask
    if (!window.ethereum) {
        console.error('❌ MetaMask not installed');
        return;
    }

    try {
        // Get wallet
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const walletAddress = accounts[0];
        console.log('✅ Wallet connected:', walletAddress);

        // Create message
        const message = `Approve Project: ${projectId}\nTimestamp: ${Date.now()}\nAction: NCCR Approval`;
        console.log('📝 Message to sign:', message);

        // Request signature
        console.log('🔏 Requesting signature from MetaMask...');
        const signature = await window.ethereum.request({
            method: 'personal_sign',
            params: [message, walletAddress]
        });
        console.log('✅ Signature received:', signature.substring(0, 20) + '...');

        // Call API
        console.log('📡 Calling backend API...');
        const response = await fetch(`http://localhost:5001/api/admin/projects/${projectId}/approve`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                signature,
                message,
                notes: 'Test approval from console',
                finalCarbonCredits: 1250
            })
        });

        const data = await response.json();
        console.log('📥 Response:', data);

        if (data.success) {
            console.log('✅ Project approved successfully!');
        } else {
            console.error('❌ Approval failed:', data.message);
        }
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

async function checkAdminStatus() {
    console.log('🔍 Checking Admin Status...\n');

    const token = localStorage.getItem('adminToken');

    if (!token) {
        console.log('❌ Not logged in (no token found)');
        console.log('💡 Run: testAdminLogin()');
        return;
    }

    console.log('✅ Token found:', token.substring(0, 20) + '...');

    try {
        const response = await fetch('http://localhost:5001/api/admin/auth/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (data.success) {
            console.log('✅ Logged in as:', data.admin);
        } else {
            console.log('❌ Token invalid or expired');
            console.log('💡 Run: testAdminLogin()');
        }
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

// Export to window for console access
window.testAdminLogin = testAdminLogin;
window.testProjectApproval = testProjectApproval;
window.checkAdminStatus = checkAdminStatus;

console.log(`
🧪 Admin API Test Helper Loaded!

Available commands:
  - testAdminLogin()         → Login with ADMIN987 key
  - checkAdminStatus()       → Check if you're logged in
  - testProjectApproval()    → Test approving CLORIT-2008

Quick start:
  1. testAdminLogin()
  2. testProjectApproval()
`);
