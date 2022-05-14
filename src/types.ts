export type ResponseOption =
  | "DEF_YES"
  | "SOFT_YES"
  | "NO_CLUE"
  | "PROB_NOT"
  | "NO_LOL"
  | "AWAITING";

export type IRespInput = {
  name: string;
  response: ResponseOption;
  number?: string;
  comment?: string;
};

export type IRespondent = IRespInput & { id: number };
