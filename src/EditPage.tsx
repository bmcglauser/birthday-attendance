import * as React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { changeResp, delResp, getOneResp } from "./apiService";
import { IRespondent, ResponseOption } from "./types";
import { colorResponseMap, responseOptionDict } from "./utils";

export const EditPage = () => {
  const [currentEntry, setCurrentEntry] = React.useState<IRespondent>();
  const [commentInput, setCommentInput] = React.useState("");
  const [responseInput, setResponseInput] =
    React.useState<ResponseOption>("AWAITING");

  const { id } = useParams();
  const navigate = useNavigate();

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
    }).then((_) => {
      setResponseInput("AWAITING");
      navigate("/");
    });
  }

  function deleteHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    delResp({ id: currentEntry?.id ?? 0 });
    navigate("/home");
  }

  function radioChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setResponseInput(responseOptionDict[e.target.value] ?? "AWAITING");
  }

  function commentChangeHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setCommentInput(e.target.value);
  }

  return (
    <div className="h-screen w-screen flex flex-col text-xl bg-[#d3d3d3]">
      {currentEntry ? (
        <div className="flex flex-col gap-2 p-4 m-4 bg-white shadow-lg">
          <div className="flex justify-between">
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
      <form className="flex flex-col mx-4 p-4 py-8 bg-white shadow-lg">
        <section className="flex flex-col items-center gap-4 mb-4 p-4 w-full">
          {Object.entries(colorResponseMap).map(([response, color], i) => {
            const label =
              response[0] +
              response.toLowerCase().split("_").join(" ").slice(1);
            const forAttr = label.toLowerCase().split(" ").join("");
            return (
              <div
                className={`flex justify-between w-full items-center ${color} py-2 px-8 rounded-md`}
                key={`label/${i}`}
              >
                <label className="flex-grow" htmlFor={forAttr}>
                  {label}
                </label>
                <input
                  className="scale-150"
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
        <div className="flex gap-2">
          <Link
            className="border mt-4 text-center p-4 px-6 rounded-lg border-black border-dotted w-2/3"
            to="/"
          >
            Back
          </Link>
          <button
            className="border mt-4 text-center p-4 px-6 rounded-lg border-black border-dotted w-2/3"
            onClick={deleteHandler}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};
