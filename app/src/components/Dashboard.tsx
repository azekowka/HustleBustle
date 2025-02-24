"use client"

import React, { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Timer } from "./Timer"
import { TimerCreationCard } from "./TimerCard"
import type { TimerData } from "@/types/TimerData"
import { TimeProvider } from "../contexts/TimeContext"
import { useUser } from "@clerk/nextjs"
import { supabase } from "@/lib/supabase"

export function Dashboard() {
  const [timers, setTimers] = React.useState<TimerData[]>([])
  const { user } = useUser()

  // Load timers from Supabase when user logs in
  useEffect(() => {
    const loadTimers = async () => {
      if (!user) {
        setTimers([])
        return
      }

      console.log('Loading timers for user:', user.id)

      const { data, error } = await supabase
        .from('timers')
        .select('*')
        .eq('user_id', user.id)

      if (error) {
        console.error('Error loading timers:', error)
        return
      }

      console.log('Loaded timers:', data)

      if (data) {
        const parsedTimers = data.map(timer => ({
          id: timer.id,
          name: timer.name,
          endDate: new Date(timer.end_date),
          type: timer.type,
        }))
        setTimers(parsedTimers)
      }
    }

    loadTimers()
  }, [user])

  const handleCreateTimer = async (newTimer: Omit<TimerData, "id">) => {
    if (!user) return

    console.log('Creating timer with user ID:', user.id)

    const timerWithId: TimerData = {
      ...newTimer,
      id: Date.now().toString(),
    }

    try {
      const { error } = await supabase
        .from('timers')
        .insert({
          id: timerWithId.id,
          user_id: user.id,
          name: timerWithId.name,
          end_date: timerWithId.endDate.toISOString(),
          type: timerWithId.type
        })
        .select()

      if (error) {
        console.error('Error creating timer:', error.message)
        return
      }

      setTimers(prevTimers => [...prevTimers, timerWithId])
    } catch (error) {
      console.error('Error creating timer:', error)
    }
  }

  const handleDeleteTimer = async (id: string) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('timers')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

      if (error) {
        console.error('Error deleting timer:', error.message)
        return
      }

      setTimers(prevTimers => prevTimers.filter(timer => timer.id !== id))
    } catch (error) {
      console.error('Error deleting timer:', error)
    }
  }

  const handleEditTimer = async (id: string, updatedTimer: Partial<TimerData>) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('timers')
        .update({
          name: updatedTimer.name,
          end_date: updatedTimer.endDate?.toISOString(),
          type: updatedTimer.type
        })
        .eq('id', id)
        .eq('user_id', user.id)

      if (error) {
        console.error('Error updating timer:', error.message)
        return
      }

      setTimers(prevTimers =>
        prevTimers.map(timer =>
          timer.id === id ? { ...timer, ...updatedTimer } : timer
        )
      )
    } catch (error) {
      console.error('Error updating timer:', error)
    }
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

