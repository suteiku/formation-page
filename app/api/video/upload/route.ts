import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createDirectUploadUrl, isCloudflareConfigured } from '@/lib/cloudflare'

// POST - Get a direct upload URL for video
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        if (!isCloudflareConfigured()) {
            return NextResponse.json(
                { error: 'Video hosting not configured' },
                { status: 503 }
            )
        }

        const body = await req.json()
        const maxDurationSeconds = body.maxDurationSeconds || 3600 // 1 hour default

        const { uploadUrl, uid } = await createDirectUploadUrl(maxDurationSeconds)

        return NextResponse.json({
            uploadUrl,
            videoId: uid,
        })
    } catch (error) {
        console.error('Error creating upload URL:', error)
        return NextResponse.json({ error: 'Internal error' }, { status: 500 })
    }
}
