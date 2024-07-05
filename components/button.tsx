"use client";

import { useFormStatus } from "react-dom";

interface IButtonProps {
  text: string;
}

export default function Button({ text }: IButtonProps) {
  //이 훅은 무조건 form의 내부(자식)에서 호출되고 사용되어야 한다.
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="primary-btn h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
    >
      {pending ? "로딩 중" : text}
    </button>
  );
}
