"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import type { TimerData } from "../types/TimerData"
import { Plus } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface TimerCreationCardProps {
  onCreateTimer: (timer: Omit<TimerData, "id">) => void
}

export function TimerCreationCard({ onCreateTimer }: TimerCreationCardProps) {
  const [isActive, setIsActive] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [timerName, setTimerName] = useState("")
  const [step, setStep] = useState<"initial" | "date" | "name">("initial")
  const [isTillTimer, setIsTillTimer] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (step === "name" && inputRef.current) {
      inputRef.current.focus()
    }
  }, [step])

  const handleClick = () => {
    if (step === "initial") {
      setStep("date")
      setIsActive(true)
    }
  }

  const handleCancel = () => {
    setStep("initial")
    setIsActive(false)
    setSelectedDate(undefined)
    setTimerName("")
    setIsTillTimer(true)
  }

  const handleConfirm = () => {
    if (step === "date" && selectedDate) {
      setStep("name")
    } else if (step === "name" && timerName && selectedDate) {
      onCreateTimer({
        name: timerName,
        endDate: selectedDate,
        type: isTillTimer ? "till" : "from",
      })
      handleCancel()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && timerName && selectedDate) {
      handleConfirm()
    }
  }

  return (
    <Card
      className={`w-[280px] h-[280px] rounded-3xl overflow-visible transition-all duration-200 
        ${step === "initial" ? "bg-transparent hover:bg-card/10 border border-dashed border-muted-foreground/30" : "bg-card"}
        ${step === "initial" ? "hover:opacity-100 cursor-pointer" : ""}
      `}
      onClick={handleClick}
    >
      <CardContent className="p-4 h-full flex flex-col items-center justify-center relative">
        {step === "initial" && <Plus className="w-12 h-12 text-muted-foreground/50" />}
        {step === "date" && (
          <>
            <div className="flex items-center space-x-2 mb-4">
              <Switch id="timer-type" checked={isTillTimer} onCheckedChange={setIsTillTimer} />
              <Label htmlFor="timer-type" className="font-mono text-sm">
                {isTillTimer ? "UNTIL" : "SINCE"}
              </Label>
            </div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => setSelectedDate(date)}
              className="rounded-md scale-[0.85] -mt-4 border-none"
              initialFocus
            />
            <div className="flex justify-between w-full absolute -bottom-6 left-0 right-0 px-4">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleConfirm} disabled={!selectedDate}>
                Confirm
              </Button>
            </div>
          </>
        )}
        {step === "name" && (
          <>
            <div className="flex items-center space-x-2 mb-4">
              <Switch id="timer-type" checked={isTillTimer} onCheckedChange={setIsTillTimer} />
              <Label htmlFor="timer-type" className="font-mono text-sm">
                {isTillTimer ? "UNTIL" : "SINCE"}
              </Label>
            </div>
            {selectedDate && (
              <p className="text-xs text-muted-foreground text-center mb-4 font-mono">
                {selectedDate.toLocaleString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}
            <Input
              ref={inputRef}
              type="text"
              placeholder="Description"
              value={timerName}
              onChange={(e) => setTimerName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="mb-4 w-full font-mono"
            />
            <div className="flex justify-between w-full absolute -bottom-6 left-0 right-0 px-4">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleConfirm} disabled={!timerName}>
                Create Timer
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

