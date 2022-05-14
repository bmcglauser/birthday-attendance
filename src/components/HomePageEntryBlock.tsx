import React from "react";
import { Link } from "react-router-dom";
import { delResp } from "../apiService";
import { IRespondent } from "../types";

type HomePageEntryBlockProps = {
  entry: IRespondent;
  setShouldReload: React.Dispatch<React.SetStateAction<boolean>>;
};
export const HomePageEntryBlock: React.FC<HomePageEntryBlockProps> = ({
  entry,
  setShouldReload,
}) => {
  const [isAuxInfo, setIsAuxInfo] = React.useState(false);

  return (
    <div className="flex border h-16 shadow-md bg-white">
      {!isAuxInfo ? (
        <>
          <div className="flex flex-grow flex-col justify-evenly pl-4">
            <p>{entry.name}</p>
            <p className="pl-4">{entry.response}</p>
          </div>
          <div className="flex gap-4">
            <div
              className="bg-blue-200 rounded-md  m-2 shadow-md w-12 flex items-center justify-center"
              onClick={() => {
                setIsAuxInfo(true);
              }}
            >
              ?
            </div>
            <div
              className="bg-red-200 rounded-md  m-2 shadow-md w-12 flex items-center justify-center"
              onClick={() => {
                delResp({ id: entry.id }).then(() => {
                  setShouldReload((r) => !r);
                });
              }}
            >
              X
            </div>
            <Link style={{ margin: ".5rem" }} to={`/edit/${entry.id}`}>
              <div className="bg-yellow-200 rounded-md  h-full shadow-md w-12 flex items-center justify-center">
                ...
              </div>
            </Link>
          </div>
        </>
      ) : (
        <div
          className="self-center border-green-200 border-4 h-full w-full flex items-center justify-center"
          onClick={() => setIsAuxInfo(false)}
        >
          <p>{entry.comment}</p>
        </div>
      )}
    </div>
  );
};
