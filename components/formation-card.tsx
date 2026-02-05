import Image from "next/image";
import Link from "next/link";
import { Users, BookOpen, Eye, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FormationCardProps {
    id: string;
    title: string;
    description: string;
    coverImage: string;
    price: number;
    studentsCount: number;
    modulesCount: number;
    status: "published" | "draft";
    className?: string;
}

export function FormationCard({
    id,
    title,
    description,
    coverImage,
    price,
    studentsCount,
    modulesCount,
    status,
    className,
}: FormationCardProps) {
    const isPublished = status === "published";

    return (
        <article
            className={cn(
                "group relative overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all duration-200 hover:shadow-lg hover:shadow-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:shadow-neutral-900/20",
                className
            )}
        >
            {/* Cover Image */}
            <div className="relative aspect-video w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                <Image
                    src={coverImage}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Status Badge */}
                <div className="absolute right-3 top-3">
                    <Badge
                        variant={isPublished ? "default" : "secondary"}
                        className={cn(
                            "text-[11px] font-medium shadow-sm",
                            isPublished
                                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                                : "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                        )}
                    >
                        {isPublished ? "Publié" : "Brouillon"}
                    </Badge>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Title & Description */}
                <div className="mb-4">
                    <h3 className="mb-1.5 line-clamp-1 text-[16px] font-semibold text-neutral-900 dark:text-neutral-50">
                        {title}
                    </h3>
                    <p className="line-clamp-2 text-[13px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                        {description}
                    </p>
                </div>

                {/* Stats */}
                <div className="mb-4 flex items-center gap-4 border-t border-neutral-100 pt-4 dark:border-neutral-800">
                    <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
                        <Users className="h-3.5 w-3.5" strokeWidth={2} />
                        <span className="text-[12px] font-medium">
                            {studentsCount} élève{studentsCount > 1 ? "s" : ""}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
                        <BookOpen className="h-3.5 w-3.5" strokeWidth={2} />
                        <span className="text-[12px] font-medium">
                            {modulesCount} module{modulesCount > 1 ? "s" : ""}
                        </span>
                    </div>
                </div>

                {/* Price & Actions */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[24px] font-bold text-neutral-900 dark:text-neutral-50">
                            {price}€
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="h-9 border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
                        >
                            <Link href={`/formations/${id}`}>
                                <Eye className="mr-1.5 h-3.5 w-3.5" strokeWidth={2} />
                                Voir
                            </Link>
                        </Button>
                        <Button
                            variant="default"
                            size="sm"
                            asChild
                            className="h-9 bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                        >
                            <Link href={`/formations/${id}/edit`}>
                                <Pencil className="mr-1.5 h-3.5 w-3.5" strokeWidth={2} />
                                Modifier
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </article>
    );
}
