import { ChangeEvent, KeyboardEvent, useState } from "react";
// import { AppButton } from "../AppButton/AppButton";

import Button from '@mui/material/Button';

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
      <input
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
      />
      <Button variant="contained" onClick={createItemHandler}>+</Button>
      {error && <div className={'error-message'}>{error}</div>}
    </div>
  );
};