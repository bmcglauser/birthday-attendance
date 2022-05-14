import { ResponseOption } from "./types";

export const responseOptionDict: Record<string, ResponseOption> = {
  defyes: "DEF_YES",
  softyes: "SOFT_YES",
  noclue: "NO_CLUE",
  probnot: "PROB_NOT",
  nolol: "NO_LOL",
  awaiting: "AWAITING",
};

export const colorResponseMap: Record<ResponseOption, string> = {
  DEF_YES: "bg-[#7fff5c]",
  SOFT_YES: "bg-[#ceff5c]",
  NO_CLUE: "bg-[#fff15c]",
  PROB_NOT: "bg-[#ffab5c]",
  NO_LOL: "bg-[#ff745c]",
  AWAITING: "bg-[#acacac]",
};
