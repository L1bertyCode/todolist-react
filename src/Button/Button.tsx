import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
};

export const Button = ({ title, ...otherProps }: Props) => {
  return <button {...otherProps}>{title}</button>;
};