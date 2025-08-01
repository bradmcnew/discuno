import { Calendar, Settings } from 'lucide-react'
import { Suspense } from 'react'
import { AvailabilitySettingsClient } from '~/components/calcom/AvailabilitySettingsClient'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { CalProviderWrapper } from '~/lib/providers/CalProviderWrapper'
import { EventTypeListClient } from './EventTypeListClient'

function LoadingSkeleton() {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="animate-pulse">
        <div className="bg-muted mb-4 h-8 w-1/3 rounded"></div>
        <div className="bg-muted mb-8 h-4 w-2/3 rounded"></div>
        <div className="bg-card rounded-lg border p-6">
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-muted h-16 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface SchedulingContentProps {
  eventTypes: Array<{
    id: number
    title?: string
    lengthInMinutes?: number
    price?: number
    hidden?: boolean
  }>
}

export const SchedulingContent = ({ eventTypes }: SchedulingContentProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-foreground text-3xl font-bold tracking-tight">Scheduling Center</h1>
        <p className="text-muted-foreground mx-auto mt-2 max-w-2xl">
          Set your availability, create bookable services, and manage your calendar integration
        </p>
      </div>

      <Tabs defaultValue="manage" className="w-full">
        <TabsList className="grid h-auto w-full grid-cols-2 p-1">
          <TabsTrigger value="availability" className="flex flex-col items-center gap-1 py-3">
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium">Availability</span>
            <span className="text-muted-foreground hidden text-xs sm:block">Set your schedule</span>
          </TabsTrigger>
          <TabsTrigger value="manage" className="flex flex-col items-center gap-1 py-3">
            <Settings className="h-4 w-4" />
            <span className="text-sm font-medium">Event Types</span>
            <span className="text-muted-foreground hidden text-xs sm:block">Create & manage</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="availability" className="mt-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 text-center">
              <h2 className="text-foreground mb-2 text-xl font-semibold">Set Your Availability</h2>
              <p className="text-muted-foreground text-sm">
                Define when you&apos;re available for bookings. These schedules will be used by your
                event types.
              </p>
              <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  💡 <strong>Pro tip:</strong> Start here! Set your availability first, then create
                  event types that use these schedules.
                </p>
              </div>
            </div>
            <CalProviderWrapper useCurrentUserTokens={true}>
              <Suspense fallback={<LoadingSkeleton />}>
                <AvailabilitySettingsClient />
              </Suspense>
            </CalProviderWrapper>
          </div>
        </TabsContent>

        <TabsContent value="manage" className="mt-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 text-center">
              <h2 className="text-foreground mb-2 text-xl font-semibold">Event Types</h2>
              <p className="text-muted-foreground text-sm">
                Create and manage your bookable services. Each event type uses your availability
                schedules.
              </p>
              {eventTypes.length === 0 && (
                <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    🚀 <strong>Getting started:</strong> Create your first event type to start
                    accepting bookings!
                  </p>
                </div>
              )}
              {eventTypes.length > 0 && (
                <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    ✨ <strong>Tip:</strong> Click &quot;New Event Type&quot; to create more
                    services, or click edit to configure existing ones.
                  </p>
                </div>
              )}
            </div>
            <CalProviderWrapper useCurrentUserTokens={true}>
              <Suspense fallback={<LoadingSkeleton />}>
                <EventTypeListClient eventTypes={eventTypes} />
              </Suspense>
            </CalProviderWrapper>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
