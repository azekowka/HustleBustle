"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/../components/ui/card"
import { Button } from "@/../components/ui/button"
import { Calendar } from "@/../components/ui/calendar"
import { Input } from "@/../components/ui/input"
import type { TimerData } from "@/../types/TimerData"
import { Plus } from "lucide-react"
import { Switch } from "@/../components/ui/switch"
import { Label } from "@/../components/ui/label"

interface TimerCreationCardProps {
  onCreateTimer: (timer: Omit<TimerData, "id">) => void
}

export function TimerCreationCard({ onCreateTimer }: TimerCreationCardProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedHour, setSelectedHour] = useState<string>("00")
  const [selectedMinute, setSelectedMinute] = useState<string>("00")
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
    }
  }

  const handleCancel = () => {
    setStep("initial")
    setSelectedDate(undefined)
    setSelectedHour("00")
    setSelectedMinute("00")
    setTimerName("")
    setIsTillTimer(true)
  }

  const handleConfirm = () => {
    if (step === "date" && selectedDate) {
      setStep("name")
    } else if (step === "name" && timerName && selectedDate) {
      const finalDate = new Date(selectedDate)
      finalDate.setHours(Number.parseInt(selectedHour || "00", 10))
      finalDate.setMinutes(Number.parseInt(selectedMinute || "00", 10))
      onCreateTimer({
        name: timerName,
        endDate: finalDate,
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
      className={`w-[400px] h-[450px] rounded-3xl overflow-visible transition-all duration-200 
        ${step === "initial" ? "bg-transparent hover:bg-card/10 border border-dashed border-muted-foreground/30" : "bg-card"}
        ${step === "initial" ? "hover:opacity-100 cursor-pointer" : ""}
      `}
      onClick={handleClick}
    >
      <CardContent className="p-4 h-full flex flex-col items-center justify-center relative">
        {step === "initial" && <Plus className="w-12 h-12 text-muted-foreground/50" />}
        {step === "date" && (
          <>
            <div className="flex items-center space-x-2 mb-2">
              <Switch id="timer-type" checked={isTillTimer} onCheckedChange={setIsTillTimer} />
              <Label htmlFor="timer-type" className="font-mono text-sm">
                {isTillTimer ? "UNTIL" : "SINCE"}
              </Label>
            </div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => setSelectedDate(date)}
              className="rounded-md border-none"
              initialFocus
            />
            <div className="flex justify-end absolute gap-2 mt-2 inset-x-0 bottom-2 px-4">
              <Button size="sm" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleConfirm} disabled={!selectedDate}>
                Next
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
                {new Date(
                  selectedDate.setHours(Number.parseInt(selectedHour, 10), Number.parseInt(selectedMinute, 10)),
                ).toLocaleString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}
            <div className="flex items-center space-x-4 mb-4 w-full">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Description"
                value={timerName}
                onChange={(e) => setTimerName(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 font-mono"
              />
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={2}
                  value={selectedHour === "00" ? "" : selectedHour}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "")
                    setSelectedHour(value ? value.padStart(2, "0") : "00")
                  }}
                  className="w-16 font-mono text-center"
                  placeholder="HH"
                />
                <span>:</span>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={2}
                  value={selectedMinute === "00" ? "" : selectedMinute}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "")
                    setSelectedMinute(value ? value.padStart(2, "0") : "00")
                  }}
                  className="w-16 font-mono text-center"
                  placeholder="MM"
                />
              </div>
            </div>
            <div className="flex justify-end absolute gap-2 mt-2 inset-x-0 bottom-2 px-4">
              <Button variant="outline" onClick={() => setStep("date")}>
                Back
              </Button>
              <Button onClick={handleConfirm} disabled={!timerName}>
                Create Hustle
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

