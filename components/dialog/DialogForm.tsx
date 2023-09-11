"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

type Props = {
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
};

export default function DialogForm({
  title,
  onClose,
  onSubmit,
  children,
}: Props) {
  const searchParams = useSearchParams();
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const showDialog = searchParams.get("showDialog");

  useEffect(() => {
    if (showDialog === "y") {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  const closeDialog = () => {
    dialogRef.current?.close();
    onClose();
  };

  const clickSubmit = () => {
    onSubmit();
    closeDialog;
   };

   const dialog : JSX.Element | null  = showDialog === 'y'
   ? (
      <dialog ref={dialogRef} className="backdrop:bg-gray-800/50">
         <div className="flex flex-col">
            <div>
            <h1>{title}</h1>
            <button onClick={closeDialog}>X</button>
            </div>
            <div>{children}</div>
            <div>
               <button onClick={onSubmit}> Submit </button>
            </div>
         </div>
      </dialog>
   ) : null

  return dialog
}
