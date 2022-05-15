import * as React from "react";
import { getAllResps, newResp } from "./apiService";
import { AddForm } from "./components/AddForm";
import { HomePageEntryBlock } from "./components/HomePageEntryBlock";
import { IRespondent, ResponseOption } from "./types";

export const HomePage = () => {
  const [allEntries, setAllEntries] = React.useState<IRespondent[]>([]);

  const [responseInput, setResponseInput] =
    React.useState<ResponseOption>("AWAITING");
  const [shouldReload, setShouldReload] = React.useState(false);

  React.useEffect(() => {
    getAllResps().then((resps) => {
      setAllEntries(resps);
    });
  }, [shouldReload]);

  function addHandler(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    name: string
  ) {
    e.preventDefault();
    newResp({
      name,
      number: "",
      response: responseInput,
    }).then(() => {
      setResponseInput("AWAITING");
      setShouldReload((r) => !r);
    });
  }

  return (
    <div className="h-screen w-screen flex flex-col gap-2 px-2 pb-12 bg-[#d3d3d3]">
      <AddForm addHandler={addHandler} />
      {allEntries
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((entry) => (
          <HomePageEntryBlock entry={entry} />
        ))}
    </div>
  );
};
