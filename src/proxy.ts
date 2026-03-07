import { updateSession } from '@/utils/supabase/middleware'
import { type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
    return await updateSession(request)
}

export const config = {
    matcher: ['/admin/:path*', '/auth/:path*', '/login'],
}
