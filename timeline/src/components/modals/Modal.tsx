import { ReactNode } from "react";

export default function Modal({ children }: { children: ReactNode }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-transparent bg-opacity-50 flex justify-center items-center z-50">
      {children}
    </div>
  );
}
