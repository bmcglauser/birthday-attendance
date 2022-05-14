import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { changeResp, getOneResp } from "./apiService";
import { SummaryBlock } from "./components/SummaryBlock";
import { IRespondent, ResponseOption } from "./types";
import { responseOptionDict } from "./utils";

export const EditPage = () => {
  const [currentEntry, setCurrentEntry] = React.useState<IRespondent>();
  const [commentInput, setCommentInput] = React.useState("");
  const [responseInput, setResponseInput] =
    React.useState<ResponseOption>("AWAITING");

  const { id } = useParams();

  React.useEffect(() => {
    getOneResp(id ?? "").then((resp) => {
      setCurrentEntry(resp);
    });
  }, [id]);

  function confirmHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    changeResp({
      id: +(id ?? 0),
      response: responseInput,
      comment: commentInput,
    }).then(() => {
      setResponseInput("AWAITING");
    });
  }

  function radioChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setResponseInput(responseOptionDict[e.target.value] ?? "AWAITING");
  }

  function commentChangeHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setCommentInput(e.target.value);
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-[#d3d3d3] items-center">
      {currentEntry ? (
        <div className="flex flex-col gap-2 p-4 m-4 bg-white shadow-lg self-stretch">
          <div className="flex justify-between text-xl">
            <span>{currentEntry.name}</span>
            <span>
              {currentEntry.response[0] +
                currentEntry.response
                  .toLowerCase()
                  .slice(1)
                  .split("_")
                  .join(" ")}
            </span>
          </div>
          <p>Comments: {currentEntry.comment}</p>
        </div>
      ) : (
        <></>
      )}
      <form className="flex flex-col items-center mx-4 p-4 py-8 bg-white shadow-lg w-2/3">
        <section className="flex flex-col items-center gap-4 mb-4">
          {[
            ["Def yes", "bg-[#7fff5c]"],
            ["Soft yes", "bg-[#ceff5c]"],
            ["No clue", "bg-[#fff15c]"],
            ["Prob not", "bg-[#ffab5c]"],
            ["No lol", "bg-[#ff745c]"],
            ["Awaiting", "bg-[#acacac]"],
          ].map(([label, color], i) => {
            const forAttr = label.split(" ").join("").toLowerCase();
            return (
              <div
                className={`flex justify-between w-full items-center ${color} py-1 px-4 rounded-md`}
                key={`label/${i}`}
              >
                <label className="flex-grow" htmlFor={forAttr}>
                  {label}
                </label>
                <input
                  name="response"
                  id={forAttr}
                  value={forAttr}
                  type="radio"
                  onChange={radioChangeHandler}
                />
              </div>
            );
          })}
          <div className="flex flex-col w-full mt-4">
            <label>Add comments:</label>
            <textarea
              className="border border-black p-2"
              onChange={commentChangeHandler}
            />
          </div>
        </section>
        <button
          className="self-center mt-6 p-4 px-6 rounded-lg border border-black border-dotted w-2/3"
          onClick={confirmHandler}
        >
          Confirm edit
        </button>
        <Link
          className="border mt-4 text-center p-4 px-6 rounded-lg border-black border-dotted w-2/3"
          to="/"
        >
          Go back
        </Link>
      </form>
    </div>
  );
};
