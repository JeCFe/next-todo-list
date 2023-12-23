"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";

type Props = {
  openTitle: ReactNode | ReactNode[];
  closeTitle: ReactNode | ReactNode[];
  children: ReactNode | ReactNode[];
};
export function Accordion({ openTitle, closeTitle, children }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [height, setHeight] = useState<number | undefined>(undefined);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full">
      <div
        className="w-fit pb-2 underline underline-offset-4 text-blue-500 hover:text-blue-900 transition duration-200 ease-in-out cursor-pointer"
        onClick={toggleAccordion}
      >
        {!isOpen ? openTitle : closeTitle}
      </div>
      <div
        className={`transition-max-height ease-out-in duration-200 overflow-hidden ${
          isOpen ? "max-h-full" : "max-h-0"
        }`}
        style={{ maxHeight: `${height}px` }}
      >
        <div ref={contentRef}>{children}</div>
      </div>
    </div>
  );
}

export default Accordion;
