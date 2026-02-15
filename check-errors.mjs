import { setTimeout } from 'timers/promises';

const BASE_URL = 'http://localhost:3000';

async function checkForErrors(url, pageName) {
    console.log(`\n🔍 Checking ${pageName} for errors...`);
    
    try {
        const response = await fetch(url);
        const html = await response.text();
        
        // Look for common error patterns
        const errorPatterns = [
            { pattern: /Module not found/gi, name: 'Module Not Found' },
            { pattern: /Cannot find module/gi, name: 'Cannot Find Module' },
            { pattern: /TypeError/gi, name: 'Type Error' },
            { pattern: /ReferenceError/gi, name: 'Reference Error' },
            { pattern: /SyntaxError/gi, name: 'Syntax Error' },
            { pattern: /Failed to compile/gi, name: 'Compilation Error' },
            { pattern: /Unhandled Runtime Error/gi, name: 'Runtime Error' },
            { pattern: /radix-ui/gi, name: 'Radix UI Reference' },
        ];
        
        const foundErrors = [];
        
        for (const { pattern, name } of errorPatterns) {
            const matches = html.match(pattern);
            if (matches) {
                foundErrors.push({ name, count: matches.length });
            }
        }
        
        if (foundErrors.length > 0) {
            console.log(`\n⚠️  Found potential issues:`);
            foundErrors.forEach(({ name, count }) => {
                console.log(`   - ${name}: ${count} occurrence(s)`);
            });
            
            // Extract context around radix-ui if found
            if (foundErrors.some(e => e.name === 'Radix UI Reference')) {
                const radixMatches = html.match(/.{0,100}radix-ui.{0,100}/gi);
                if (radixMatches && radixMatches.length > 0) {
                    console.log(`\n   Context:`);
                    radixMatches.slice(0, 3).forEach((match, i) => {
                        console.log(`   ${i + 1}. ...${match.substring(0, 150)}...`);
                    });
                }
            }
        } else {
            console.log(`✓ No obvious errors detected`);
        }
        
        // Check for specific components
        console.log(`\n📦 Component Checks:`);
        console.log(`   - WhyUs component: ${html.includes('Why Choose Us') ? '✓' : '✗'}`);
        console.log(`   - Handshake image: ${html.includes('handshake.png') ? '✓' : '✗'}`);
        console.log(`   - Slider component: ${html.includes('slider') || html.includes('Slider') ? '✓' : '✗'}`);
        
    } catch (error) {
        console.log(`✗ Error fetching page: ${error.message}`);
    }
}

async function main() {
    console.log('🔎 Error Detection Report');
    console.log('='.repeat(60));
    
    await checkForErrors(BASE_URL, 'Homepage');
    await setTimeout(500);
    await checkForErrors(`${BASE_URL}/dealership`, 'Dealership Page');
    
    console.log(`\n${'='.repeat(60)}`);
    console.log('✅ Error check complete!\n');
}

main().catch(console.error);
