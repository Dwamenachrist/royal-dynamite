import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { SupabaseClient } from '@supabase/supabase-js'

// The email domain that identifies Royal Dynamite staff accounts
const ADMIN_EMAIL_DOMAIN = '@royaldynamite.com'

/** Returns true if the given email belongs to an authorised admin user. */
function isAdminUser(email: string | undefined): boolean {
    if (!email) return false
    const extraAdminEmail = process.env.ADMIN_EXTRA_EMAIL
    return email.endsWith(ADMIN_EMAIL_DOMAIN) || (!!extraAdminEmail && email === extraAdminEmail)
}

/** Fetches the authenticated user; returns null on any network/auth failure. */
async function getAuthenticatedUser(supabase: SupabaseClient) {
    const { data } = await supabase.auth.getUser()
    return data.user
}

/** Wraps native fetch with a hard 3-second timeout, chaining any existing signal. */
async function fetchWithTimeout(url: Parameters<typeof fetch>[0], init?: RequestInit): Promise<Response> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)
    init?.signal?.addEventListener('abort', () => controller.abort(), { once: true })
    return fetch(url, { ...init, signal: controller.signal })
        .finally(() => clearTimeout(timeoutId))
}

export async function updateSession(request: NextRequest) {
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
    const isAuthRoute = request.nextUrl.pathname.startsWith('/auth') ||
        request.nextUrl.pathname.startsWith('/login')

    // Auth/login routes and all public routes pass through — no Supabase call needed.
    // Avoids 42s+ hangs when Supabase is unreachable on the login page itself.
    if (!isAdminRoute || isAuthRoute) {
        return NextResponse.next()
    }

    let supabaseResponse = NextResponse.next({ request })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() { return request.cookies.getAll() },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({ request })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
            global: { fetch: fetchWithTimeout },
        }
    )

    let user = null
    try {
        user = await getAuthenticatedUser(supabase)
    } catch {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        url.searchParams.set('error', 'Authentication service unavailable. Please try again.')
        return NextResponse.redirect(url)
    }

    if (!isAdminUser(user?.email)) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    return supabaseResponse
}
