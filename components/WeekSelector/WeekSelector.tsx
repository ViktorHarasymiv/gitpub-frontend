"use client";

import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";

import css from "./Style.module.css";

function WeekSelector() {
  const [current, setCurrent] = useState(1);
  const weekValue = 40;
  const weeks = Array.from({ length: weekValue }, (_, index) => index + 1);

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const targetIndex = Math.min(current - 5, weeks.length - 1);
    const targetElement = itemRefs.current[targetIndex];

    if (current < 5) {
      container.scrollTo({
        left: 0,
        behavior: "smooth",
      });
      return;
    }

    if (targetElement && containerRef.current) {
      const offsetLeft = targetElement.offsetLeft;

      console.log(container);

      container.scrollTo({
        left: offsetLeft,
        behavior: "smooth",
      });
    }
  }, [current, weeks.length]);

  const handlerClick = (numm: number) => {
    setCurrent(numm);
  };

  return (
    <div className={css.wrapper} ref={containerRef}>
      {weeks.map((item, index) => {
        return (
          <button
            key={index}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            onClick={() => handlerClick(item)}
            className={clsx(css.week_box, item === current && css.active)}
            disabled={current + 1 < item}
          >
            <span className={css.number_style}>{item}</span>
            тиждень
          </button>
        );
      })}
    </div>
  );
}

export default WeekSelector;
