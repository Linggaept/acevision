"use client";
import { cn } from "@/lib/utils";
import { Cast } from "@/types/movies";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function MovieCastCard({ cast }: { cast: Cast }) {
  return (
    <Link
      href={`/movie/${slugify(cast.name)}-${cast.id}`}
      className="block w-full min-w-[280px] group"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl",
          "bg-white/80 dark:bg-zinc-900/80",
          "backdrop-blur-xl",
          "border border-zinc-200/50 dark:border-zinc-800/50",
          "shadow-xs",
          "transition-all duration-300",
          "hover:shadow-md",
          "hover:border-zinc-300/50 dark:hover:border-zinc-700/50"
        )}
      >
        <div className="relative h-[320px] overflow-hidden">
          <Image
            src={`https://media.themoviedb.org/t/p/w440_and_h660_face${cast?.profile_path}`}
            alt={cast?.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>

        <div
          className={cn(
            "absolute inset-0",
            "bg-linear-to-t from-black/90 via-black/40 to-transparent"
          )}
        />

        <div className="absolute top-3 right-3">
          <span
            className={cn(
              "px-2.5 py-1 rounded-lg text-xs font-medium",
              "bg-white/90 text-zinc-800",
              "dark:bg-zinc-900/90 dark:text-zinc-200",
              "backdrop-blur-md",
              "shadow-xs",
              "border border-white/20 dark:border-zinc-800/50"
            )}
          >
            {cast?.popularity.toFixed(1)}{" "}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1.5">
              <h3 className="text-lg font-semibold text-white dark:text-zinc-100 leading-snug tracking-tighter">
                {cast?.original_name}
              </h3>
              <p className="text-sm text-zinc-200 dark:text-zinc-300 line-clamp-2 tracking-tight">
                {cast?.character}
              </p>
            </div>
            <div
              className={cn(
                "p-2 rounded-full",
                "bg-white/10 dark:bg-zinc-800/50",
                "backdrop-blur-md",
                "group-hover:bg-white/20 dark:group-hover:bg-zinc-700/50",
                "transition-colors duration-300 group"
              )}
            >
              <ArrowUpRight className="w-4 h-4 text-white group-hover:-rotate-12 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
