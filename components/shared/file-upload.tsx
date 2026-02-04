'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, File, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

interface FileUploadProps {
    accept?: Record<string, string[]>
    maxSize?: number
    onUpload: (file: File) => Promise<string>
    value?: string
    onChange: (url: string) => void
    placeholder?: string
}

export function FileUpload({
    accept = {
        'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    },
    maxSize = 5 * 1024 * 1024, // 5MB
    onUpload,
    value,
    onChange,
    placeholder = 'Glissez-déposez ou cliquez pour uploader',
}: FileUploadProps) {
    const [isUploading, setIsUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [error, setError] = useState<string | null>(null)

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            const file = acceptedFiles[0]
            if (!file) return

            setError(null)
            setIsUploading(true)
            setUploadProgress(0)

            try {
                // Simulate progress (real progress would come from upload API)
                const progressInterval = setInterval(() => {
                    setUploadProgress((prev) => Math.min(prev + 10, 90))
                }, 200)

                const url = await onUpload(file)

                clearInterval(progressInterval)
                setUploadProgress(100)
                onChange(url)
            } catch (err) {
                setError('Erreur lors de l\'upload')
                console.error(err)
            } finally {
                setIsUploading(false)
            }
        },
        [onUpload, onChange]
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        maxSize,
        multiple: false,
    })

    const isImage = value?.match(/\.(png|jpg|jpeg|gif|webp)$/i)

    return (
        <div className="w-full">
            {value ? (
                <div className="relative rounded-lg border-2 border-dashed border-gray-200 p-4">
                    <div className="flex items-center gap-4">
                        {isImage ? (
                            <img
                                src={value}
                                alt="Uploaded"
                                className="h-20 w-20 object-cover rounded"
                            />
                        ) : (
                            <div className="h-20 w-20 bg-gray-100 rounded flex items-center justify-center">
                                <File className="h-8 w-8 text-gray-400" />
                            </div>
                        )}
                        <div className="flex-1">
                            <p className="text-sm text-gray-600 truncate">{value}</p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onChange('')}
                            className="text-gray-400 hover:text-red-500"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            ) : (
                <div
                    {...getRootProps()}
                    className={`
            rounded-lg border-2 border-dashed p-8 text-center cursor-pointer transition-colors
            ${isDragActive
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-300 hover:border-indigo-400'
                        }
            ${isUploading ? 'pointer-events-none opacity-60' : ''}
          `}
                >
                    <input {...getInputProps()} />

                    {isUploading ? (
                        <div className="space-y-4">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100">
                                <Upload className="h-6 w-6 text-indigo-600 animate-pulse" />
                            </div>
                            <p className="text-sm text-gray-600">Upload en cours...</p>
                            <Progress value={uploadProgress} className="w-full max-w-xs mx-auto" />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                                <ImageIcon className="h-6 w-6 text-gray-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">{placeholder}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    Max {Math.round(maxSize / 1024 / 1024)}MB
                                </p>
                            </div>
                        </div>
                    )}

                    {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
                </div>
            )}
        </div>
    )
}
