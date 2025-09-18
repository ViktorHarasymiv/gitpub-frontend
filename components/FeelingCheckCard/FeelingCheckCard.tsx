import React from "react";

import css from "./FeelingCheckCard.module.css";

import Button from "../ui/Button/Button";
import Link from "next/link";

interface BabyToday {
  title: string;
  height: string;
  width: string;
  activeRange: string;
  about: string;
  advice: string;
  adviceToday: string;
}

interface FeelingCheckCardProps {
  babyToday: BabyToday;
}

function FeelingCheckCard({ babyToday }: FeelingCheckCardProps) {
  return (
    <div className={css.advice_form}>
      <h3 className={css.block_title}>Як ви себе почуваєте?</h3>
      <p className={css.paragraph_content}>
        <b>Рекомендації на сьогодні:</b>
        <span>{babyToday.adviceToday}</span>
      </p>
      <Link href={"/diary"}>
        <Button type="button" styles={{ maxWidth: 250 }}>
          Зробити запис у щоденник
        </Button>
      </Link>
    </div>
  );
}

export default FeelingCheckCard;
