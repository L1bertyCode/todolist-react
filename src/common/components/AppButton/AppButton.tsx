import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
};

export const AppButton = ({ title, ...otherProps }: Props) => {
  return <button {...otherProps}>{title}</button>;
};