import { ChangeEvent, KeyboardEvent, useState } from "react"

import TextField from "@mui/material/TextField"
import AddBoxIcon from "@mui/icons-material/AddBox"
import IconButton from "@mui/material/IconButton"

interface CreateItemFormProps {
  onCreateItem: (title: string) => void
}
export const CreateItemForm = ({ onCreateItem }: CreateItemFormProps) => {
  const [title, setTitle] = useState<string>("")
  const [error, setError] = useState<string | null>("")
  const createItemHandler = () => {
    if (title.trim() !== "") {
      onCreateItem(title)
      setTitle("")
    } else {
      setError("Title is required")
    }
  }

  return (
    <div className={""}>
      <TextField
        label={"Enter a title"}
        variant={"outlined"}
        className={error ? "error" : ""}
        value={title}
        size={"small"}
        error={!!error}
        helperText={error}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setTitle(e.currentTarget.value)
          setError(null)
        }}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            createItemHandler()
          }
        }}
      />
      <IconButton onClick={createItemHandler} color={"primary"}>
        <AddBoxIcon />
      </IconButton>
    </div>
  )
}
