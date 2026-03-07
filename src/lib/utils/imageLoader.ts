export default function supabaseLoader({ src, width, quality }: { src: string, width: number, quality?: number }) {
    const projectId = process.env.NEXT_PUBLIC_SUPABASE_URL?.match(/https:\/\/(.*?)\.supabase\.co/)?.[1] || "placeholder-project"

    // Only transform Supabase Storage URLs — let everything else pass through
    if (src.includes("/storage/v1/object/public/")) {
        const path = src.split("/storage/v1/object/public/")[1]
        return `https://${projectId}.supabase.co/storage/v1/render/image/public/${path}?width=${width}&quality=${quality || 75}`
    }

    // External URLs — append width so Next.js doesn't warn about missing width
    if (src.startsWith("http")) {
        // Google User Content URLs support =w{width} for resizing
        if (src.includes("lh3.googleusercontent.com")) {
            return `${src}=w${width}`;
        }
        const separator = src.includes("?") ? "&" : "?";
        return `${src}${separator}w=${width}`;
    }

    // Local /public images — use default Next.js image optimization
    return `${src}?w=${width}&q=${quality || 75}`
}
