import { IRespondent } from "../types";

type DisplayEntryInfoProps = {
  entry: IRespondent;
};

export const DisplayEntryInfo: React.FC<DisplayEntryInfoProps> = ({
  entry,
}) => {
  return (
    <div className="flex flex-col">
      <p>Name: {entry.name}</p>
      <p>Phone: {entry.number}</p>
      <p>Status: {entry.response}</p>
    </div>
  );
};
