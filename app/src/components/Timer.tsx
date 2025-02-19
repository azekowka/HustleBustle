"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { formatTimeDifference } from "@/utils/formatTimeDifference"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Edit2 } from "lucide-react"
import type { TimerData } from "@/types/TimerData"
import { useTime } from "../contexts/TimeContext"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface TimerProps extends TimerData {
  onDelete: (id: string) => void
  onEdit: (id: string, updatedTimer: Partial<TimerData>) => void
  onToggleEdit: (id: string) => void
}

export function Timer({ id, name, endDate, type, isEditing, onDelete, onEdit, onToggleEdit }: TimerProps) {
  const { now } = useTime()
  const [showDelete, setShowDelete] = React.useState(false)
  const [isHovered, setIsHovered] = React.useState(false)
  const [editName, setEditName] = React.useState(name)
  const [editDate, setEditDate] = React.useState(endDate)
  const [editHour, setEditHour] = React.useState(endDate.getHours().toString().padStart(2, "0"))
  const [editMinute, setEditMinute] = React.useState(endDate.getMinutes().toString().padStart(2, "0"))
  const [editType, setEditType] = React.useState(type)

  const timeLeft = React.useMemo(() => formatTimeDifference(endDate, type, now), [endDate, type, now])
  const isExpired = type === "till" && timeLeft.total <= 0

  const handleSaveEdit = () => {
    const updatedDate = new Date(editDate)
    updatedDate.setHours(Number.parseInt(editHour || "00", 10), Number.parseInt(editMinute || "00", 10))
    onEdit(id, {
      name: editName,
      endDate: updatedDate,
      type: editType,
    })
    onToggleEdit(id)
  }

  const renderTimeUnit = (value: number, label: string) => {
    return (
      <div className="flex justify-center w-[160px]">
        <span className="flex-1 text-4xl font-bold tabular-nums text-right pr-1">
          {value.toString().padStart(2, "0")}
        </span>
        <span className="flex-1 text-sm font-medium text-left pl-1 self-end pb-1">{label}</span>
      </div>
    )
  }

  const renderTimeUnits = () => {
    const units = [
      { value: timeLeft.years, label: "YEARS" },
      { value: timeLeft.months, label: "MONTHS" },
      { value: timeLeft.days, label: "DAYS" },
      { value: timeLeft.hours, label: "HOURS" },
      { value: timeLeft.minutes, label: "MINUTES" },
      { value: timeLeft.seconds, label: "SECONDS" },
    ]

    if (isExpired) {
      return units
        .slice(2, 6)
        .map((unit) => <React.Fragment key={unit.label}>{renderTimeUnit(0, unit.label)}</React.Fragment>)
    }

    let startIndex = 0
    if (timeLeft.years > 0) {
      startIndex = 0
    } else if (timeLeft.months > 0) {
      startIndex = 1
    } else {
      startIndex = 2
    }

    const unitsToShow = units.slice(startIndex, startIndex + 4)

    return unitsToShow.map((unit) => (
      <React.Fragment key={unit.label}>{renderTimeUnit(unit.value, unit.label)}</React.Fragment>
    ))
  }

  return (
    <motion.div
      layout
      whileHover={{
        scale: 1.02,
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <Card
        className={`w-[400px] h-[450px] rounded-3xl relative ${isExpired && !isHovered ? "opacity-50" : ""} transition-opacity duration-200`}
        onMouseEnter={() => {
          !isEditing && setShowDelete(true)
          setIsHovered(true)
        }}
        onMouseLeave={() => {
          setShowDelete(false)
          setIsHovered(false)
        }}
        style={{ viewTransitionName: `timer-${id}` }}
      >
        <CardContent className="p-4 h-full relative">
          {isEditing ? (
            <div className="absolute inset-0 flex flex-col p-4 bg-card z-10">
              <div className="flex items-center space-x-4 mb-4 w-full">
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-1 font-mono"
                  placeholder="Timer name"
                />
                <div className="flex items-center space-x-2">
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={2}
                    value={editHour === "00" ? "" : editHour}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "")
                      setEditHour(value ? value.padStart(2, "0") : "00")
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
                    value={editMinute === "00" ? "" : editMinute}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "")
                      setEditMinute(value ? value.padStart(2, "0") : "00")
                    }}
                    className="w-16 font-mono text-center"
                    placeholder="MM"
                  />
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center -mt-14">
                <Calendar
                  mode="single"
                  selected={editDate}
                  onSelect={(date) => date && setEditDate(date)}
                  className="rounded-md border-none"
                  initialFocus
                />
              </div>
              <div className="flex justify-between items-center absolute inset-x-0 bottom-2 px-4">
                <div className="flex items-center space-x-2">
                    <Switch
                    id={`timer-type-${id}`}
                    checked={editType === "till"}
                    onCheckedChange={(checked) => setEditType(checked ? "till" : "from")}
                    />
                    <Label htmlFor={`timer-type-${id}`} className="font-mono text-sm">
                    {editType === "till" ? "UNTIL" : "SINCE"}
                    </Label>
                </div>
                <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => onToggleEdit(id)}>
                    Cancel
                    </Button>
                    <Button size="sm" onClick={handleSaveEdit}>
                    Save
                    </Button>
                </div>
                </div>
            </div>
          ) : (
            <>
              <div className="absolute top-4 left-6 right-4">
                <div className="flex items-center">
                  <div
                    className={`w-1.5 h-1.5 rounded-full mr-2 ${type === "till" ? "bg-red-500" : "bg-green-500"}`}
                  ></div>
                  <h2 className="text-sm text-muted-foreground truncate font-mono uppercase">{name}</h2>
                </div>
                <p
                  className={`text-xs text-muted-foreground mt-1 font-mono uppercase transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}
                >
                  {type === "till" ? "Until: " : "Since: "}
                  {endDate.toLocaleString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col -space-y-1">{renderTimeUnits()}</div>
              </div>
            </>
          )}
        </CardContent>

        <AnimatePresence>
          {showDelete && !isEditing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute -top-3 -left-3 z-20"
            >
              <Button variant="destructive" size="icon" className="rounded-full" onClick={() => onDelete(id)}>
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {!isEditing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-3 -right-3 z-20"
          >
            <Button variant="secondary" size="icon" className="rounded-full" onClick={() => onToggleEdit(id)}>
              <Edit2 className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </Card>
    </motion.div>
  )
}

