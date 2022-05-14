export enum ResponseOption {
  "DEF_YES",
  "SOFT_YES",
  "NO_CLUE",
  "PROB_NOT",
  "NO_LOL",
}

export type IRespInput = {
  name: ResponseOption;
  response: string;
  number?: string;
};
