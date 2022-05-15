import * as React from "react";
import { useNavigate } from "react-router-dom";
import { getAllResps } from "./apiService";
import { IRespondent, ResponseOption } from "./types";
import { colorResponseMap } from "./utils";

export const SummaryPage = () => {
  const [allEntries, setAllEntries] = React.useState<IRespondent[]>([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    getAllResps().then((resps) => {
      setAllEntries(resps);
    });
  }, []);

  const reducedObj = React.useMemo(
    () =>
      allEntries
        .map((r) => ({ [r.response]: 1 }))
        .reduce((acc, el) => {
          const responseKey = Object.keys(el)[0];
          return { ...acc, [responseKey]: (acc[responseKey] ?? 0) + 1 };
        }, {}),
    [allEntries]
  );

  React.useEffect(() => {
    console.log({ reducedObj });
  }, [reducedObj]);

  return (
    <div className="h-screen w-screen flex flex-col text-center bg-[#d3d3d3]">
      {Object.entries(reducedObj)
        .sort(([rA, _A], [rB, _b]) => {
          const orderMap = Object.keys(colorResponseMap)
            .map((resp, i) => ({
              [resp]: i + 1,
            }))
            .reduce((acc, el) => ({ ...acc, ...el }), {});
          return orderMap[rA] - orderMap[rB];
        })
        .map(([response, number]) => {
          const bgClass = colorResponseMap[response as ResponseOption];
          return (
            <div
              key={response}
              className={`${bgClass} text-8xl flex-grow flex flex-col justify-center`}
              onClick={(_) => {
                navigate("/home");
              }}
            >
              {number}
            </div>
          );
        })}
    </div>
  );
};
