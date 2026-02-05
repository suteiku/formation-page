'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Loader2, Wand2, ArrowRight, LayoutTemplate, PenTool, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

export default function NewFormationPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(1) // 1: Topic, 2: Details, 3: Generation

    // Form State
    const [topic, setTopic] = useState('')
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: 97
    })

    const handleGenerateIdea = async () => {
        if (!topic) return
        setLoading(true)
        try {
            const res = await fetch('/api/ai/generate-structure', {
                method: 'POST',
                body: JSON.stringify({ topic }),
            })
            const data = await res.json()
            if (data.title) {
                setFormData({
                    title: data.title,
                    description: data.description,
                    price: 97
                })
                setStep(2)
            }
        } catch (e) {
            toast.error("Erreur de génération")
        } finally {
            setLoading(false)
        }
    }

    const handleCreate = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/formations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (res.ok) {
                const formation = await res.json()
                toast.success("Formation créée !")
                router.push(`/dashboard/formations/${formation.id}/design`)
            }
        } catch (e) {
            toast.error("Erreur de création")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto py-16 px-4">
            {/* PROGRESS STEPS */}
            <div className="flex items-center justify-center gap-4 mb-12">
                <div className={`flex items-center gap-2 ${step >= 1 ? 'text-slate-900 font-semibold' : 'text-slate-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border ${step >= 1 ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-200'}`}>1</div>
                    <span>Sujet</span>
                </div>
                <div className={`w-12 h-px ${step >= 2 ? 'bg-slate-900' : 'bg-slate-200'}`} />
                <div className={`flex items-center gap-2 ${step >= 2 ? 'text-slate-900 font-semibold' : 'text-slate-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border ${step >= 2 ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-200'}`}>2</div>
                    <span>Détails</span>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">

                {step === 1 && (
                    <div className="space-y-6 animate-in slide-in-from-right-4">
                        <div className="text-center space-y-2 mb-8">
                            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Wand2 className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">De quoi parle votre formation ?</h2>
                            <p className="text-slate-500">Décrivez votre sujet en quelques mots, l'IA va structurer le reste.</p>
                        </div>

                        <div className="space-y-4">
                            <Label>Sujet principal</Label>
                            <Textarea
                                placeholder="Ex: Comment apprendre la guitare en 30 jours..."
                                className="min-h-[100px] text-lg p-4"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                            />
                        </div>

                        <Button
                            className="w-full h-12 text-base bg-slate-900 hover:bg-slate-800"
                            onClick={handleGenerateIdea}
                            disabled={!topic || loading}
                        >
                            {loading ? <Loader2 className="animate-spin mr-2" /> : <Wand2 className="mr-2" />}
                            Générer la structure
                        </Button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6 animate-in slide-in-from-right-4">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-slate-900">C'est un bon début !</h2>
                            <p className="text-slate-500">Vérifiez les détails avant de créer.</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <Label>Titre de la formation</Label>
                                <Input
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="font-medium"
                                />
                            </div>
                            <div>
                                <Label>Description courte</Label>
                                <Textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                />
                            </div>
                            <div>
                                <Label>Prix (€)</Label>
                                <Input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                                    className="max-w-[150px]"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                                Retour
                            </Button>
                            <Button
                                className="flex-[2] bg-slate-900 hover:bg-slate-800"
                                onClick={handleCreate}
                                disabled={!formData.title || loading}
                            >
                                {loading && <Loader2 className="animate-spin mr-2" />}
                                Créer la formation
                            </Button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}
