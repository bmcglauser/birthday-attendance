import * as React from "react";
import { Link } from "react-router-dom";
import { delResp, getAllResps, newResp } from "./apiService";
import { AddForm } from "./components/AddForm";
import { SummaryBlock } from "./components/SummaryBlock";
import { HomePageEntryBlock } from "./components/HomePageEntryBlock";
import { IRespondent, ResponseOption } from "./types";

export const Home = () => {
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
    <div className="h-screen w-screen flex flex-col gap-2 px-2 bg-purple-100">
      <AddForm addHandler={addHandler} />
      {allEntries.map((entry) => (
        <HomePageEntryBlock setShouldReload={setShouldReload} entry={entry} />
      ))}
    </div>
  );
};
