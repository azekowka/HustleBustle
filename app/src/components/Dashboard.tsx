"use client"

import React, { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Timer } from "./Timer"
import { TimerCreationCard } from "./TimerCard"
import type { TimerData } from "@/types/TimerData"
import { TimeProvider } from "../contexts/TimeContext"

export function Dashboard() {
  const [timers, setTimers] = React.useState<TimerData[]>([])

  useEffect(() => {
    const storedTimers = localStorage.getItem("timers")
    if (storedTimers) {
      setTimers(JSON.parse(storedTimers, (key, value) => (key === "endDate" ? new Date(value) : value)))
    } else {
      // Default timers
      const defaultTimers: TimerData[] = [
        {
          id: "1",
          name: "2025",
          endDate: new Date(2025, 0, 1), // January 1st, 2025
          type: "till",
        },
        {
          id: "2",
          name: "Since ChatGPT",
          endDate: new Date(2022, 10, 30), // November 30, 2022
          type: "from",
        },
      ]
      setTimers(defaultTimers)
      localStorage.setItem("timers", JSON.stringify(defaultTimers))
    }

    // Enable View Transitions API
    document.documentElement.classList.add("view-transition")
  }, [])

  useEffect(() => {
    localStorage.setItem("timers", JSON.stringify(timers))
  }, [timers])

  const handleCreateTimer = (newTimer: Omit<TimerData, "id">) => {
    const timerWithId: TimerData = {
      ...newTimer,
      id: Date.now().toString(),
    }
    setTimers((prevTimers) => {
      const updatedTimers = [...prevTimers, timerWithId]
      localStorage.setItem("timers", JSON.stringify(updatedTimers))
      return updatedTimers
    })
  }

  const handleDeleteTimer = (id: string) => {
    setTimers((prevTimers) => {
      const updatedTimers = prevTimers.filter((timer) => timer.id !== id)
      localStorage.setItem("timers", JSON.stringify(updatedTimers))
      return updatedTimers
    })
  }

  const handleEditTimer = (id: string, updatedTimer: Partial<TimerData>) => {
    setTimers((prevTimers) => {
      const updatedTimers = prevTimers.map((timer) => (timer.id === id ? { ...timer, ...updatedTimer } : timer))
      localStorage.setItem("timers", JSON.stringify(updatedTimers))
      return updatedTimers
    })
  }

  const handleToggleEdit = (id: string) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) => (timer.id === id ? { ...timer, isEditing: !timer.isEditing } : timer)),
    )
  }

  return (
    <TimeProvider>
      <div className="min-h-screen bg-background flex items-center justify-center py-20">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center content-center"
          layout
        >
          <AnimatePresence>
            {timers.map((timer) => (
              <motion.div
                key={timer.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <Timer
                  {...timer}
                  onDelete={handleDeleteTimer}
                  onEdit={handleEditTimer}
                  onToggleEdit={handleToggleEdit}
                />
              </motion.div>
            ))}
          </AnimatePresence>
          <TimerCreationCard onCreateTimer={handleCreateTimer} />
        </motion.div>
      </div>
    </TimeProvider>
  )
}

