export interface BabyFromBackend {
  image?: string;
  analogy?: string;
  babyActivity?: string;
  babySize?: string;
  babyWeight?: string;
  babyDevelopment?: string;
}

export interface MomFromBackend {
  _id: string;
  weekNumber: number;
  feelings: {
    states: string[];
    sensationDescr: string;
  };
  comfortTips: {
    category: string;
    tip: string;
  }[];
}

export interface CurrentWeekDetailed {
  week: string;
  daysToDue: string;
  pack?: {
    baby?: BabyFromBackend;
    mom?: MomFromBackend;
  };
}