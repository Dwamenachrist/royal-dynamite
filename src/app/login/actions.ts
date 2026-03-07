'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const supabase = await createClient()

    let authError: string | null = null

    try {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            // Supabase returned an auth error (wrong creds, user not found, etc.)
            authError = error.message === 'Invalid login credentials'
                ? 'Invalid email or password'
                : error.message
        }
    } catch (err: unknown) {
        // Network-level failure (timeout, DNS, no internet)
        const message = err instanceof Error ? err.message : ''
        if (message.includes('fetch failed') || message.includes('TimeoutError') || message.includes('ConnectTimeout')) {
            authError = 'Unable to connect to the server. Please check your internet connection and try again.'
        } else {
            authError = 'An unexpected error occurred. Please try again.'
        }
    }

    if (authError) {
        redirect(`/login?error=${encodeURIComponent(authError)}`)
    }

    revalidatePath('/admin', 'layout')
    redirect('/admin')
}
