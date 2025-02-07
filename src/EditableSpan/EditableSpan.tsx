import { TextField } from "@mui/material";
import { ChangeEvent, KeyboardEvent, useState } from "react";


interface EditableSpanProps {
  value: string;
  changeItem: (title: string) => void;
};
export const EditableSpan = ({ value, changeItem }: EditableSpanProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState<string>(value);
  const changeItemHandler = () => {
    changeItem(title);
  };

  return (
    <span className={""}>
      {!isEditMode ?
        <span onDoubleClick={() => setIsEditMode(true)}>{value}</span> :
        <TextField variant={'outlined'}
          value={title}
          size={'small'}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              changeItemHandler();
              setIsEditMode(false);
            }
          }}
          onBlur={() => {
            changeItemHandler();
            setIsEditMode(false);
          }}
          autoFocus />

      }
    </span>
  );
};