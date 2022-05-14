import React from "react";
import { Link } from "react-router-dom";
import { delResp } from "../apiService";
import { IRespondent } from "../types";
import { colorResponseMap } from "../utils";

type HomePageEntryBlockProps = {
  entry: IRespondent;
};
export const HomePageEntryBlock: React.FC<HomePageEntryBlockProps> = ({
  entry,
}) => {
  const [isAuxInfo, setIsAuxInfo] = React.useState(false);
  const colorClass = colorResponseMap[entry.response];
  return (
    <div className={`flex h-16 shadow-md bg-white ${colorClass}`}>
      {!isAuxInfo ? (
        <>
          <p className="pl-4 flex-grow self-center text-xl">{entry.name}</p>
          <div className="flex gap-4">
            <div
              className="bg-white rounded-md  m-2 shadow-md w-12 flex items-center justify-center"
              onClick={() => {
                setIsAuxInfo(true);
              }}
            >
              ?
            </div>

            <Link style={{ margin: ".5rem" }} to={`/edit/${entry.id}`}>
              <div className="bg-white rounded-md  h-full shadow-md w-12 flex items-center justify-center">
                ...
              </div>
            </Link>
          </div>
        </>
      ) : (
        <div
          className="self-center bg-purple-200 border-4 h-full w-full flex items-center justify-center"
          onClick={() => setIsAuxInfo(false)}
        >
          <p>{entry.comment}</p>
        </div>
      )}
    </div>
  );
};
