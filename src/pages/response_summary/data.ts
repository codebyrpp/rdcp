// data.ts

export interface QuestionData {
  question: string;
  options: string[];
  responses: number[];
}

export const dummyData: QuestionData[] = [
  {
    question: "Which is your favorite color?",
    options: ["Red", "Blue", "Green", "Yellow"],
    responses: [15, 25, 30, 10],
  },
  {
    question: "Which is your preferred mode of transport?",
    options: ["Car", "Bike", "Public Transport", "Walking"],
    responses: [20, 10, 50, 5],
  },
  {
    question: "What type of music do you prefer?",
    options: ["Pop", "Rock", "Classical", "Jazz"],
    responses: [40, 30, 20, 10],
  },
];
