import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getVideoDetails, deleteVideo, getVideoStreamUrl, getVideoThumbnail, isCloudflareConfigured } from '@/lib/cloudflare'

interface Props {
    params: Promise<{ id: string }>
}

// GET - Get video details
export async function GET(req: NextRequest, { params }: Props) {
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

        const { id } = await params
        const details = await getVideoDetails(id)

        if (!details) {
            return NextResponse.json({ error: 'Video not found' }, { status: 404 })
        }

        return NextResponse.json({
            ...details,
            streamUrl: getVideoStreamUrl(id),
            thumbnail: getVideoThumbnail(id),
        })
    } catch (error) {
        console.error('Error getting video:', error)
        return NextResponse.json({ error: 'Internal error' }, { status: 500 })
    }
}

// DELETE - Delete video
export async function DELETE(req: NextRequest, { params }: Props) {
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

        const { id } = await params
        const success = await deleteVideo(id)

        if (!success) {
            return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting video:', error)
        return NextResponse.json({ error: 'Internal error' }, { status: 500 })
    }
}
