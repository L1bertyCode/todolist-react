import { TextField } from "@mui/material"
import { ChangeEvent, KeyboardEvent, useState } from "react"

interface EditableSpanProps {
  value: string
  onChange: (title: string) => void
  disabled?: boolean
}
export const EditableSpan = ({ value, onChange, disabled = false }: EditableSpanProps) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [title, setTitle] = useState<string>(value)
  const onChangeHandler = () => {
    onChange(title)
  }

  return (
    <span className={""}>
      {!isEditMode ? (
        <span onDoubleClick={() => setIsEditMode(!disabled)}>{value}</span>
      ) : (
        <TextField
          variant={"outlined"}
          value={title}
          size={"small"}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              onChangeHandler()
              setIsEditMode(false)
            }
          }}
          onBlur={() => {
            onChangeHandler()
            setIsEditMode(false)
          }}
          autoFocus
        />
      )}
    </span>
  )
}
