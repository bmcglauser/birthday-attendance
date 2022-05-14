import * as React from "react";
import { getAllResps } from "./apiService";

export const App: React.FC = () => {
  const [allEntries, setAllEntries] = React.useState<unknown[]>([]);

  React.useEffect(() => {
    getAllResps().then((resps) => {
      setAllEntries(resps);
    });
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col">
      {allEntries}
      <h2>Add new:</h2>
      <form className="border flex flex-col">
        <input type="text" value="Hey" />
        <input name="response" value="Def yes" type="radio" />
        <input name="response" value="Soft yes" type="radio" />
        <input name="response" value="No clue" type="radio" />
        <input name="response" value="Prob not" type="radio" />
        <input name="response" value="No lol" type="radio" />
        <input type="text" value="Hey2" />
      </form>
    </div>
  );
};
