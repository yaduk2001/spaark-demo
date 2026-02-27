const fetch = require('node-fetch');

const testLogin = async () => {
    try {
        console.log('🔍 Testing admin login...\n');

        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                identifier: 'admin@spark.com',
                password: 'admin@spark'
            })
        });

        console.log('📊 Response Status:', response.status);
        console.log('📊 Response Status Text:', response.statusText);

        const data = await response.json();
        console.log('\n📦 Response Data:');
        console.log(JSON.stringify(data, null, 2));

        if (response.ok) {
            console.log('\n✅ Login successful!');
            console.log('🎫 Token:', data.token ? 'Present' : 'Missing');
            console.log('👤 User:', data.user ? data.user.username : 'Missing');
        } else {
            console.log('\n❌ Login failed!');
            console.log('Error:', data.error);
        }
    } catch (error) {
        console.error('\n💥 Request failed with error:');
        console.error(error.message);
        console.error('\nFull error:', error);
    }
};

testLogin();
