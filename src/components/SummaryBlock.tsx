import { IRespondent } from "../types";

type SummaryBlockProps = {
  entry: IRespondent;
};

export const SummaryBlock: React.FC<SummaryBlockProps> = ({ entry }) => {
  return (
    <div className="flex flex-col">
      <p>{entry.name}</p>
      <p>{entry.response}</p>
    </div>
  );
};
