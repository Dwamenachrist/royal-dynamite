import { setTimeout } from 'timers/promises';

const BASE_URL = 'http://localhost:3000';

async function inspectVisualElements(url, pageName) {
    console.log(`\n${'='.repeat(70)}`);
    console.log(`🎨 Visual Inspection: ${pageName}`);
    console.log('='.repeat(70));
    
    try {
        const response = await fetch(url);
        const html = await response.text();
        
        if (pageName === 'Homepage - WhyUs Section') {
            console.log('\n📸 WhyUs Section Elements:');
            
            // Check for section structure
            const checks = [
                { name: 'Section Background', pattern: /#132b4d|132b4d/, found: html.match(/#132b4d|132b4d/) },
                { name: 'Why Choose Us Title', pattern: /Why Choose Us/i, found: html.match(/Why Choose Us/i) },
                { name: 'Main Heading', pattern: /Built on Trust, Driven by Excellence/i, found: html.match(/Built on Trust, Driven by Excellence/i) },
                { name: 'Handshake Image', pattern: /handshake\.png/, found: html.match(/handshake\.png/) },
                { name: 'Royal Dynamite Mark', pattern: /royal_dynamite_mark\.png/, found: html.match(/royal_dynamite_mark\.png/) },
                { name: 'Trust & Legitimacy Card', pattern: /Trust &amp; Legitimacy|Trust & Legitimacy/, found: html.match(/Trust &amp; Legitimacy|Trust & Legitimacy/) },
                { name: 'White-Glove Service Card', pattern: /White-Glove Service/, found: html.match(/White-Glove Service/) },
                { name: 'Trusted Partnerships Card', pattern: /Trusted Partnerships/, found: html.match(/Trusted Partnerships/) },
                { name: 'About Us Button', pattern: /About Us/, found: html.match(/About Us/) },
                { name: 'Visit Our Office Button', pattern: /Visit Our Office/, found: html.match(/Visit Our Office/) },
                { name: 'Gold Color (#D4AF37)', pattern: /#D4AF37|D4AF37|rd-gold/, found: html.match(/#D4AF37|D4AF37|rd-gold/) },
            ];
            
            checks.forEach(({ name, found }) => {
                console.log(`   ${found ? '✓' : '✗'} ${name}`);
            });
            
            // Count occurrences
            const goldCount = (html.match(/D4AF37|rd-gold/gi) || []).length;
            const handshakeCount = (html.match(/handshake/gi) || []).length;
            
            console.log(`\n📊 Element Frequency:`);
            console.log(`   - Gold color references: ${goldCount}`);
            console.log(`   - Handshake references: ${handshakeCount}`);
            
        } else if (pageName === 'Dealership - Price Slider') {
            console.log('\n🎚️ Price Slider Elements:');
            
            const checks = [
                { name: 'Filter Sidebar', pattern: /Filters/i, found: html.match(/Filters/i) },
                { name: 'Price Range Label', pattern: /Price Range/i, found: html.match(/Price Range/i) },
                { name: 'Slider Component', pattern: /slider-thumb|slider-track|slider-range/, found: html.match(/slider-thumb|slider-track|slider-range/) },
                { name: 'Min Price Display', pattern: /Min:|GH₵/, found: html.match(/Min:|GH₵/) },
                { name: 'Max Price Display', pattern: /Max:/, found: html.match(/Max:/) },
                { name: 'Body Style Filters', pattern: /Body Style/i, found: html.match(/Body Style/i) },
                { name: 'Sedan Option', pattern: /Sedan/i, found: html.match(/Sedan/i) },
                { name: 'SUV Option', pattern: /SUV/i, found: html.match(/SUV/i) },
                { name: 'Truck Option', pattern: /Truck/i, found: html.match(/Truck/i) },
                { name: 'Search Bar', pattern: /Search keywords/i, found: html.match(/Search keywords/i) },
                { name: 'Make Dropdown', pattern: /Any Make|Mercedes-Benz|Toyota/i, found: html.match(/Any Make|Mercedes-Benz|Toyota/i) },
                { name: 'Reset All Button', pattern: /Reset All/i, found: html.match(/Reset All/i) },
                { name: 'Showing X Vehicles', pattern: /Showing.*Premium Vehicles/i, found: html.match(/Showing.*Premium Vehicles/i) },
            ];
            
            checks.forEach(({ name, found }) => {
                console.log(`   ${found ? '✓' : '✗'} ${name}`);
            });
            
            // Check for Radix UI slider attributes
            const sliderAttributes = [
                'data-slot="slider"',
                'data-slot="slider-track"',
                'data-slot="slider-range"',
                'data-slot="slider-thumb"',
            ];
            
            console.log(`\n🔧 Slider Implementation:`);
            sliderAttributes.forEach(attr => {
                const found = html.includes(attr);
                console.log(`   ${found ? '✓' : '✗'} ${attr}`);
            });
            
            // Count slider-related elements
            const sliderCount = (html.match(/slider/gi) || []).length;
            console.log(`\n📊 Slider References: ${sliderCount}`);
        }
        
        // Check for styling
        console.log(`\n🎨 Styling Check:`);
        const hasInlineStyles = html.includes('style=') || html.includes('className=');
        const hasTailwind = html.includes('class=');
        console.log(`   - Inline/React styles: ${hasInlineStyles ? '✓' : '✗'}`);
        console.log(`   - Tailwind classes: ${hasTailwind ? '✓' : '✗'}`);
        
    } catch (error) {
        console.log(`✗ Error: ${error.message}`);
    }
}

async function main() {
    console.log('🔍 Visual Element Inspection Report');
    console.log(`Server: ${BASE_URL}\n`);
    
    await inspectVisualElements(BASE_URL, 'Homepage - WhyUs Section');
    await setTimeout(500);
    await inspectVisualElements(`${BASE_URL}/dealership`, 'Dealership - Price Slider');
    
    console.log(`\n${'='.repeat(70)}`);
    console.log('✅ Visual inspection complete!');
    console.log('='.repeat(70));
    console.log('\n💡 Next Steps:');
    console.log('   1. Open http://localhost:3000 in your browser');
    console.log('   2. Scroll down to see the WhyUs section with handshake image');
    console.log('   3. Navigate to http://localhost:3000/dealership');
    console.log('   4. Test the price range slider by dragging the handles');
    console.log('   5. Verify the vehicle list updates when you release the slider\n');
}

main().catch(console.error);
