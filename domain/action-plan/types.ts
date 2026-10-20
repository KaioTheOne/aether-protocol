export type TrainingSet = {
  name: string;
  prescription: string;
  focus: string;
};

export type TrainingBlock = {
  day: string;
  title: string;
  duration: string;
  intensity: string;
  sets: TrainingSet[];
};

export type MealItem = {
  name: string;
  time: string;
  kcal: number;
  macros: string;
  items: string[];
};

export type MacroSplit = {
  proteinG: number;
  carbsG: number;
  fatG: number;
  kcal: number;
};

export type ActionPlan = {
  generatedFrom: string;
  training: TrainingBlock[];
  nutrition: MealItem[];
  macros: MacroSplit;
  hydrationLiters: number;
  notes: string[];
};
