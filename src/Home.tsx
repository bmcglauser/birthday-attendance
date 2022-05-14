import * as React from "react";
import { Link } from "react-router-dom";
import { delResp, getAllResps, newResp } from "./apiService";
import { DisplayEntryInfo } from "./components/DisplayEntryInfo";
import { IRespondent, ResponseOption } from "./types";

export const Home = () => {
  const [allEntries, setAllEntries] = React.useState<IRespondent[]>([]);
  const [nameInput, setNameInput] = React.useState("");
  const [phoneInput, setPhoneInput] = React.useState("");
  const [responseInput, setResponseInput] =
    React.useState<ResponseOption>("AWAITING");
  const [shouldReload, setShouldReload] = React.useState(false);

  React.useEffect(() => {
    getAllResps().then((resps) => {
      setAllEntries(resps);
    });
  }, [shouldReload]);

  function addHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    newResp({
      name: nameInput,
      number: phoneInput,
      response: responseInput,
    }).then(() => {
      setNameInput("");
      setPhoneInput("");
      setResponseInput("AWAITING");
      setShouldReload((r) => !r);
    });
  }

  return (
    <div className="h-screen w-screen flex flex-col">
      {allEntries.map((entry) => (
        <div key={`${entry.id}`} className="flex w-full justify-between p-4">
          <DisplayEntryInfo entry={entry} />
          <div className="flex gap-4">
            <div
              className="bg-red-400 border border-black w-12"
              onClick={() => {
                delResp({ id: entry.id }).then(() => {
                  setShouldReload((r) => !r);
                });
              }}
            ></div>
            <Link to={`/edit/${entry.id}`}>
              <div className="bg-yellow-400 border border-black w-12 h-full"></div>
            </Link>
          </div>
        </div>
      ))}
      <h2>Add new:</h2>
      <form className="border flex flex-col">
        <input
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <input
          type="text"
          value={phoneInput}
          onChange={(e) => setPhoneInput(e.target.value)}
        />
        <button onClick={(e) => addHandler(e)}>Add</button>
      </form>
    </div>
  );
};
