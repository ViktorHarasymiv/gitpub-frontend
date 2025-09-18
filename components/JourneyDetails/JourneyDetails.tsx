"use client";

import React, { useState } from "react";
import clsx from "clsx";
import css from "./JourneyDetails.module.css";
import TasksReminderCard from "../TasksReminderCard/TasksReminderCard";

function JourneyDetails() {
  const [tabsIndex, setTabIndex] = useState(1);

  const tabsButton = [
    {
      index: 1,
      title: "Розвиток малюка",
    },
    {
      index: 2,
      title: "Тіло мами",
    },
  ];

  return (
    <div className={css.tab_content_wrapper}>
      <div className={css.tabs_wrapper}>
        {tabsButton.map((item, index) => {
          return (
            <button
              key={index}
              type="button"
              onClick={() => setTabIndex(item.index)}
              className={clsx(
                css.tab_button,
                tabsIndex == item.index && css.active
              )}
            >
              {item.title}
            </button>
          );
        })}
      </div>

      <div className={css.tab_wrapper}>
        {tabsIndex === 1 ? (
          <div>Розвиток малюка</div>
        ) : (
          <div>
            <TasksReminderCard />
          </div>
        )}
      </div>
    </div>
  );
}

export default JourneyDetails;
