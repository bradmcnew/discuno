import { Calendar, GraduationCap, School, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { Card } from '~/app/types'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card'

export const PostCard = ({ card }: { card: Card; index: number }) => {
  return (
    <div className="border/50 bg-card/90 hover:shadow-primary/10 dark:bg-card/90 dark:shadow-primary/5 dark:hover:bg-card/95 dark:hover:shadow-primary/15 group relative overflow-hidden rounded-xl border p-0 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl dark:shadow-lg">
      {/* Profile Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={card.userImage ?? '/images/placeholder.jpg'}
          alt={card.name ?? 'Student profile'}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Name overlay on image */}
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-xl font-bold text-white drop-shadow-lg">
            {card.name ?? 'Student Name'}
          </h2>
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-3 p-4">
        {/* School & Major Row */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-2">
              <School className="text-primary h-4 w-4 flex-shrink-0" />
              <p className="text-foreground truncate text-sm font-semibold">{card.school}</p>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="text-muted-foreground h-4 w-4 flex-shrink-0" />
              <p className="text-muted-foreground truncate text-sm">{card.major}</p>
            </div>
          </div>

          {/* School Year Badge */}
          <div className="bg-primary/10 text-primary border-primary/20 whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium">
            {card.schoolYear}
          </div>
        </div>

        {/* Bio with HoverCard */}
        {card.description && (
          <HoverCard>
            <HoverCardTrigger asChild>
              <button className="w-full text-left">
                <div className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors">
                  <User className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate text-sm">
                    {card.description.length > 40
                      ? `${card.description.substring(0, 40)}...`
                      : card.description}
                  </span>
                </div>
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80" side="top">
              <div className="space-y-2">
                <h4 className="text-foreground text-sm font-semibold">About {card.name}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{card.description}</p>
              </div>
            </HoverCardContent>
          </HoverCard>
        )}

        {/* Footer Info */}
        <div className="border/50 flex items-center justify-between border-t pt-3">
          <div className="text-muted-foreground flex items-center gap-1">
            <span className="text-xs">Class of</span>
            <span className="text-foreground text-xs font-medium">{card.graduationYear}</span>
          </div>

          <div className="text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span className="text-xs">{new Date(card.createdAt ?? '').toLocaleDateString()}</span>
          </div>
        </div>

        {/* View Profile Link */}
        <Link href={`/img/${card.id}`} className="block w-full">
          <button className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 hover:border-primary/30 mt-3 w-full rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200 hover:shadow-sm">
            View Profile
          </button>
        </Link>
      </div>
    </div>
  )
}
