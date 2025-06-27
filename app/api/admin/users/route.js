import { auth } from '@clerk/nextjs/server'

// Admin email list - you can modify this or move to environment variables
const ADMIN_EMAILS = [
  "syedyawaraliturab@gmail.com", // Replace with your actual admin email
  // Add more admin emails as needed
];

export async function GET() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    // In a real application, you would fetch user details from Clerk
    // and check against your admin list
    return new Response(JSON.stringify({
      adminEmails: ADMIN_EMAILS,
      message: 'Admin configuration retrieved'
    }), { status: 200 });
    
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch admin config' }), { status: 500 });
  }
}

// Function to check if user is admin (can be used in other API routes)
export function isUserAdmin(userEmail) {
  return ADMIN_EMAILS.includes(userEmail) || userEmail.endsWith("@medmagic.com");
}
