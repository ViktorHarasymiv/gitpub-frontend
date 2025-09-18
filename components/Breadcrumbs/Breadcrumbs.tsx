"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Icon } from "../ui/Icon/Icon";

import css from "./Page.module.css";

function Breadcrumbs() {
  const pathname = usePathname();
  const pathArray = pathname.split("/").filter(Boolean);

  const checkLabel = (name: string): string => {
    switch (name) {
      case "journey":
        return "Подорож";
      case "diary":
        return "Щоденник";
      case "profile":
        return "Профіль";
      default:
        return "Мій день";
    }
  };

  const styleObg = {
    transform: "rotate(90deg)",
  };

  return (
    <nav aria-label="breadcrumbs">
      <ul className={css.list}>
        <li className={css.item}>Лелека</li>
        {pathname == "/" ? (
          <li
            className={css.item}
            style={{
              color: `${pathname.includes("/") && "var(--color-neutral)"}`,
            }}
          >
            <Icon name={"arrowUp"} width={20} height={20} style={styleObg} />
            <Link href={"/"}>Мій день</Link>
          </li>
        ) : (
          pathArray.map((segment, index) => {
            const href = "/" + pathArray.slice(0, index + 1).join("/");
            const label = decodeURIComponent(segment);

            return (
              <li
                key={href}
                className={css.item}
                style={{
                  color: pathname.includes(label)
                    ? "var(--color-neutral)"
                    : "inherit",
                }}
              >
                <Icon
                  name={"arrowUp"}
                  width={20}
                  height={20}
                  style={styleObg}
                />
                <Link href={href}>{checkLabel(label)}</Link>
              </li>
            );
          })
        )}
      </ul>
    </nav>
  );
}

export default Breadcrumbs;
