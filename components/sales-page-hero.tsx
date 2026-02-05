"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Shield,
    Clock,
    HeadphonesIcon,
    Play,
    CheckCircle2,
} from "lucide-react";

interface SalesPageHeroProps {
    title: string;
    description?: string;
    price: number;
    originalPrice?: number;
    coverMedia: {
        type: "image" | "video";
        url: string;
        thumbnail?: string;
    };
    creator: {
        name: string;
        avatar?: string;
        role?: string;
    };
    features?: string[];
    onPurchase?: () => void;
    className?: string;
}

export function SalesPageHero({
    title,
    description,
    price,
    originalPrice,
    coverMedia,
    creator,
    features = [
        "Accès à vie à la formation",
        "Certificat de réussite",
        "Support prioritaire",
    ],
    onPurchase,
    className,
}: SalesPageHeroProps) {
    const discount = originalPrice
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : null;

    return (
        <section
            className={cn(
                "relative overflow-hidden bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950",
                className
            )}
        >
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Left: Content */}
                    <div className="flex flex-col justify-center">
                        {/* Creator Info */}
                        <div className="mb-6 flex items-center gap-3">
                            <Avatar className="h-12 w-12 border-2 border-white shadow-sm dark:border-neutral-800">
                                <AvatarImage src={creator.avatar} alt={creator.name} />
                                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-[14px] font-semibold text-white">
                                    {creator.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                        .toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-[14px] font-semibold text-neutral-900 dark:text-neutral-50">
                                    {creator.name}
                                </p>
                                {creator.role && (
                                    <p className="text-[13px] text-neutral-500 dark:text-neutral-400">
                                        {creator.role}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="mb-4 text-[36px] font-bold leading-tight tracking-tight text-neutral-900 lg:text-[48px] dark:text-neutral-50">
                            {title}
                        </h1>

                        {/* Description */}
                        {description && (
                            <p className="mb-8 text-[16px] leading-relaxed text-neutral-600 lg:text-[18px] dark:text-neutral-400">
                                {description}
                            </p>
                        )}

                        {/* Price Section */}
                        <div className="mb-8 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                            <div className="flex items-baseline gap-3">
                                <span className="text-[48px] font-bold text-neutral-900 dark:text-neutral-50">
                                    {price}€
                                </span>
                                {originalPrice && (
                                    <>
                                        <span className="text-[24px] text-neutral-400 line-through dark:text-neutral-600">
                                            {originalPrice}€
                                        </span>
                                        {discount && (
                                            <Badge className="bg-emerald-500 text-white hover:bg-emerald-600">
                                                -{discount}%
                                            </Badge>
                                        )}
                                    </>
                                )}
                            </div>
                            <p className="mt-2 text-[13px] text-neutral-500 dark:text-neutral-400">
                                Paiement unique • Accès immédiat
                            </p>

                            {/* CTA Button */}
                            <Button
                                size="lg"
                                onClick={onPurchase}
                                className="mt-6 h-14 w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-[16px] font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:shadow-xl hover:shadow-indigo-500/40 dark:from-indigo-500 dark:to-violet-500"
                            >
                                Acheter maintenant
                            </Button>

                            {/* Trust Badges */}
                            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-neutral-100 pt-6 dark:border-neutral-800">
                                <div className="flex flex-col items-center gap-1.5 text-center">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                                        <Clock className="h-4 w-4" strokeWidth={2} />
                                    </div>
                                    <span className="text-[11px] font-medium text-neutral-600 dark:text-neutral-400">
                                        Accès à vie
                                    </span>
                                </div>
                                <div className="flex flex-col items-center gap-1.5 text-center">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                        <HeadphonesIcon className="h-4 w-4" strokeWidth={2} />
                                    </div>
                                    <span className="text-[11px] font-medium text-neutral-600 dark:text-neutral-400">
                                        Support 7j/7
                                    </span>
                                </div>
                                <div className="flex flex-col items-center gap-1.5 text-center">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                                        <Shield className="h-4 w-4" strokeWidth={2} />
                                    </div>
                                    <span className="text-[11px] font-medium text-neutral-600 dark:text-neutral-400">
                                        Garantie 30j
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Features List */}
                        <div className="space-y-2.5">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2.5">
                                    <CheckCircle2
                                        className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400"
                                        strokeWidth={2}
                                    />
                                    <span className="text-[14px] text-neutral-700 dark:text-neutral-300">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Media */}
                    <div className="relative">
                        <div className="sticky top-8 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 shadow-2xl shadow-neutral-900/10 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-neutral-900/50">
                            {coverMedia.type === "video" ? (
                                <div className="group relative aspect-video">
                                    <Image
                                        src={coverMedia.thumbnail || coverMedia.url}
                                        alt={title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/30 transition-colors group-hover:bg-neutral-900/40">
                                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-xl transition-transform group-hover:scale-110 dark:bg-neutral-950/95">
                                            <Play
                                                className="ml-1 h-8 w-8 text-indigo-600 dark:text-indigo-400"
                                                fill="currentColor"
                                                strokeWidth={0}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative aspect-video">
                                    <Image
                                        src={coverMedia.url}
                                        alt={title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Background decoration */}
            <div className="pointer-events-none absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl">
                <div
                    className="aspect-[1.5] w-[80rem] bg-gradient-to-tr from-indigo-400 to-violet-400 opacity-10"
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                />
            </div>
        </section>
    );
}
