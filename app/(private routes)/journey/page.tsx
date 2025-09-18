import JourneyDetails from "@/components/JourneyDetails/JourneyDetails";
import WeekSelector from "@/components/WeekSelector/WeekSelector";
import React from "react";

function journey() {
  return (
    <section>
      <WeekSelector />
      <JourneyDetails />
    </section>
  );
}

export default journey;
