const sql = require('mssql');
const config = require('./dbconfig');

async function testConnection() {
    try {
        await sql.connect(config);
        console.log('✅ Connected to SQL Server');
    } catch (err) {
        console.error('❌ Connection Error:', err.message);
    }
}

testConnection();
