import * as React from "react";
import { useParams } from "react-router-dom";
import { changeResp, getOneResp } from "./apiService";
import { DisplayEntryInfo } from "./components/DisplayEntryInfo";
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
    <div className="h-screen w-screen flex flex-col">
      {currentEntry ? (
        <>
          <DisplayEntryInfo entry={currentEntry} />
          <p>Comments: {currentEntry.comment}</p>
        </>
      ) : (
        <></>
      )}
      <h2>Edit entry:</h2>
      <form className="border flex flex-col">
        <section className="flex flex-col">
          {[
            "Def yes",
            "Soft yes",
            "No clue",
            "Prob not",
            "No lol",
            "Awaiting",
          ].map((label, i) => {
            const forAttr = label.split(" ").join("").toLowerCase();
            return (
              <React.Fragment key={`label/${i}`}>
                <label htmlFor={forAttr}>{label}</label>
                <input
                  name="response"
                  id={forAttr}
                  value={forAttr}
                  type="radio"
                  onChange={radioChangeHandler}
                />
              </React.Fragment>
            );
          })}
          <label>Comments:</label>
          <textarea onChange={commentChangeHandler} />
        </section>
        <button onClick={confirmHandler}>Confirm edit</button>
      </form>
    </div>
  );
};
