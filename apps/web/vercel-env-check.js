// This script helps verify environment variables in Vercel
// Run this in your API route to debug

console.log('=== Vercel Environment Variables Check ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('VERCEL_ENV:', process.env.VERCEL_ENV);

// Check Resend configuration
console.log('\n=== Resend Configuration ===');
console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
console.log('RESEND_API_KEY starts with re_:', process.env.RESEND_API_KEY?.startsWith('re_'));
console.log('RESEND_API_KEY first 10 chars:', process.env.RESEND_API_KEY?.substring(0, 10));
console.log('RESEND_FROM_EMAIL:', process.env.RESEND_FROM_EMAIL);
console.log('RESEND_TO_EMAIL:', process.env.RESEND_TO_EMAIL);

// List all env vars that start with RESEND or NEXT_PUBLIC
console.log('\n=== All Relevant Environment Variables ===');
Object.keys(process.env).forEach(key => {
  if (key.startsWith('RESEND') || key.startsWith('NEXT_PUBLIC')) {
    console.log(`${key}: ${key.includes('KEY') ? '[REDACTED]' : process.env[key]}`);
  }
});