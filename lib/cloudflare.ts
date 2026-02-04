// lib/cloudflare.ts
const CLOUDFLARE_API_URL = 'https://api.cloudflare.com/client/v4'

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
const apiToken = process.env.CLOUDFLARE_API_TOKEN
const customerCode = process.env.CLOUDFLARE_CUSTOMER_CODE

export interface CloudflareVideoResult {
    uid: string
    thumbnail: string
    playback: {
        hls: string
        dash: string
    }
    duration: number
    status: {
        state: string
        pctComplete?: string
    }
}

/**
 * Upload une vidéo vers Cloudflare Stream
 */
export async function uploadVideoToCloudflare(file: File): Promise<string> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(
        `${CLOUDFLARE_API_URL}/accounts/${accountId}/stream`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiToken}`,
            },
            body: formData,
        }
    )

    if (!response.ok) {
        const error = await response.json()
        throw new Error(`Failed to upload video: ${JSON.stringify(error)}`)
    }

    const data = await response.json()
    return data.result.uid // ID de la vidéo
}

/**
 * Récupère les détails d'une vidéo Cloudflare Stream
 */
export async function getVideoDetails(videoId: string): Promise<CloudflareVideoResult | null> {
    const response = await fetch(
        `${CLOUDFLARE_API_URL}/accounts/${accountId}/stream/${videoId}`,
        {
            headers: {
                Authorization: `Bearer ${apiToken}`,
            },
        }
    )

    if (!response.ok) {
        return null
    }

    const data = await response.json()
    return data.result
}

/**
 * Génère une URL de streaming HLS pour une vidéo
 */
export function getVideoStreamUrl(videoId: string): string {
    return `https://customer-${customerCode}.cloudflarestream.com/${videoId}/manifest/video.m3u8`
}

/**
 * Génère l'URL d'embed iframe pour une vidéo
 */
export function getVideoEmbedUrl(videoId: string): string {
    return `https://customer-${customerCode}.cloudflarestream.com/${videoId}/iframe`
}

/**
 * Génère la thumbnail d'une vidéo
 */
export function getVideoThumbnail(videoId: string, options?: {
    time?: string // Format: 2s, 30s, 1m30s
    width?: number
    height?: number
    fit?: 'contain' | 'cover' | 'crop' | 'pad' | 'scale-down'
}): string {
    let url = `https://customer-${customerCode}.cloudflarestream.com/${videoId}/thumbnails/thumbnail.jpg`

    const params = new URLSearchParams()
    if (options?.time) params.append('time', options.time)
    if (options?.width) params.append('width', options.width.toString())
    if (options?.height) params.append('height', options.height.toString())
    if (options?.fit) params.append('fit', options.fit)

    const query = params.toString()
    if (query) {
        url += `?${query}`
    }

    return url
}

/**
 * Supprime une vidéo de Cloudflare Stream
 */
export async function deleteVideo(videoId: string): Promise<boolean> {
    const response = await fetch(
        `${CLOUDFLARE_API_URL}/accounts/${accountId}/stream/${videoId}`,
        {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${apiToken}`,
            },
        }
    )

    return response.ok
}

/**
 * Crée une URL d'upload direct (TUS) pour upload côté client
 * Utilisé pour les gros fichiers (jusqu'à 200GB)
 */
export async function createDirectUploadUrl(maxDurationSeconds?: number): Promise<{
    uploadUrl: string
    uid: string
}> {
    const response = await fetch(
        `${CLOUDFLARE_API_URL}/accounts/${accountId}/stream/direct_upload`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                maxDurationSeconds: maxDurationSeconds || 3600, // 1 hour max by default
                requireSignedURLs: false,
                allowedOrigins: ['*'], // Configure as needed
            }),
        }
    )

    if (!response.ok) {
        throw new Error('Failed to create upload URL')
    }

    const data = await response.json()
    return {
        uploadUrl: data.result.uploadURL,
        uid: data.result.uid,
    }
}

/**
 * Vérifie si le service Cloudflare Stream est configuré
 */
export function isCloudflareConfigured(): boolean {
    return !!(accountId && apiToken && customerCode)
}
