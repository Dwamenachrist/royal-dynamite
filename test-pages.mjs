import { setTimeout } from 'timers/promises';

const BASE_URL = 'http://localhost:3000';

async function testPage(url, pageName) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Testing: ${pageName}`);
    console.log(`URL: ${url}`);
    console.log('='.repeat(60));
    
    const startTime = Date.now();
    
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        
        const loadTime = Date.now() - startTime;
        const html = await response.text();
        
        console.log(`✓ Status: ${response.status}`);
        console.log(`✓ Load Time: ${loadTime}ms`);
        console.log(`✓ Content Length: ${html.length} bytes`);
        
        // Check for specific elements
        if (pageName === 'Homepage') {
            const hasWhyUs = html.includes('Why Choose Us') || html.includes('WhyUs');
            const hasHandshake = html.includes('handshake.png');
            const hasSlider = html.includes('Built on Trust');
            
            console.log(`\n📋 Homepage Checks:`);
            console.log(`  - WhyUs Section: ${hasWhyUs ? '✓ Found' : '✗ Missing'}`);
            console.log(`  - Handshake Image: ${hasHandshake ? '✓ Found' : '✗ Missing'}`);
            console.log(`  - Trust Message: ${hasSlider ? '✓ Found' : '✗ Missing'}`);
        }
        
        if (pageName === 'Dealership Page') {
            const hasFilterSidebar = html.includes('Filters') || html.includes('Price Range');
            const hasPriceSlider = html.includes('slider') || html.includes('Slider');
            const hasVehicles = html.includes('vehicle') || html.includes('Vehicle');
            
            console.log(`\n📋 Dealership Page Checks:`);
            console.log(`  - Filter Sidebar: ${hasFilterSidebar ? '✓ Found' : '✗ Missing'}`);
            console.log(`  - Price Slider: ${hasPriceSlider ? '✓ Found' : '✗ Missing'}`);
            console.log(`  - Vehicle Content: ${hasVehicles ? '✓ Found' : '✗ Missing'}`);
        }
        
        // Check for errors in HTML
        const hasErrors = html.includes('Error') || html.includes('error') || 
                         html.includes('undefined') || html.includes('null');
        if (hasErrors) {
            console.log(`\n⚠️  Warning: Potential errors detected in HTML`);
        }
        
        return { success: true, loadTime, status: response.status };
        
    } catch (error) {
        console.log(`✗ Error: ${error.message}`);
        return { success: false, error: error.message };
    }
}

async function main() {
    console.log('🚀 Starting Performance Tests...\n');
    console.log(`Testing server at: ${BASE_URL}`);
    
    // Test Homepage
    const homepageResult = await testPage(BASE_URL, 'Homepage');
    await setTimeout(1000);
    
    // Test Dealership Page
    const dealershipResult = await testPage(`${BASE_URL}/dealership`, 'Dealership Page');
    
    console.log(`\n${'='.repeat(60)}`);
    console.log('📊 Summary');
    console.log('='.repeat(60));
    console.log(`Homepage: ${homepageResult.success ? `✓ ${homepageResult.loadTime}ms` : '✗ Failed'}`);
    console.log(`Dealership: ${dealershipResult.success ? `✓ ${dealershipResult.loadTime}ms` : '✗ Failed'}`);
    console.log('\n✅ Testing complete!');
}

main().catch(console.error);
