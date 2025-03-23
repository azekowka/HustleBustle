export interface TimerData {
    id: string
    name: string
    endDate: Date
    type: "till" | "from"
    isEditing?: boolean
  }
  
  