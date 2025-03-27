"use client"

import type * as React from "react"
import { createContext, forwardRef, useContext, useMemo } from "react"

import { cn } from "@/lib/utils"

// Simplified chart configuration
interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContextProps {
  config: ChartConfig
}

const ChartContext = createContext<ChartContextProps | null>(null)

export const useChartContext = () => {
  const context = useContext(ChartContext)
  if (!context) {
    throw new Error("useChartContext must be used within a ChartContainer")
  }
  return context
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

export const ChartContainer = forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ config, className, children, ...props }, ref) => {
    // Apply chart colors as CSS variables
    const style = useMemo(() => {
      return Object.fromEntries(Object.entries(config).map(([key, value]) => [`--color-${key}`, value.color]))
    }, [config])

    return (
      <ChartContext.Provider value={{ config }}>
        <div ref={ref} className={cn("relative", className)} style={style} {...props}>
          {children}
        </div>
      </ChartContext.Provider>
    )
  },
)
ChartContainer.displayName = "ChartContainer"

export const ChartTooltip = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className="rounded-lg border bg-background px-3 py-1.5 text-sm shadow-md" {...props}>
        {children}
      </div>
    )
  },
)
ChartTooltip.displayName = "ChartTooltip"

export const ChartTooltipContent = ({ active, payload }: any) => {
  const { config } = useChartContext()

  if (!active || !payload?.length) {
    return null
  }

  return (
    <ChartTooltip>
      <div className="grid gap-2">
        {payload.map((item: any) => {
          const dataKey = item.dataKey
          const configItem = config[dataKey]
          if (!configItem) return null
          return (
            <div key={dataKey} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full" style={{ background: configItem.color }} />
                <span>{configItem.label}</span>
              </div>
              <span className="font-medium">{item.value}</span>
            </div>
          )
        })}
      </div>
    </ChartTooltip>
  )
}

export { ChartContext }

