import { ChangeEvent, KeyboardEvent, useState } from "react";
// import { AppButton } from "../AppButton/AppButton";

import Button from '@mui/material/Button';
import { TextField } from "@mui/material";

interface CreateItemFormProps {
  createItem: (title: string) => void;
};
export const CreateItemForm = ({ createItem }: CreateItemFormProps) => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string | null>("");
  const createItemHandler = () => {
    if (title.trim() !== "") {
      createItem(title);
      setTitle("");
    } else {
      setError('Title is required');
    }
  };

  return (
    <div className={""}>

      <TextField label={'Enter a title'}
        variant={'outlined'}
        className={error ? 'error' : ''}
        value={title}
        size={'small'}
        error={!!error}
        helperText={error}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setTitle(e.currentTarget.value);
          setError(null);

        }}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            createItemHandler();
          }
        }} />
      {/* <input
        className={`input ${error && "error"}`}
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setTitle(e.currentTarget.value);
          setError(null);

        }}
        onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            createItemHandler();
          }
        }}
      /> */}
      <Button variant="contained" onClick={createItemHandler}>+</Button>
    </div>
  );
};