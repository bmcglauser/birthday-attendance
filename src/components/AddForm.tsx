import * as React from "react";
import { useNavigate } from "react-router-dom";
import { BsClipboardData } from "react-icons/bs";

type AddFormProps = {
  addHandler: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    name: string
  ) => void;
};

export const AddForm: React.FC<AddFormProps> = ({ addHandler }) => {
  const [nameInput, setNameInput] = React.useState("");
  const navigate = useNavigate();

  return (
    <form className="p-2 flex">
      <div className="flex flex-col flex-grow mr-2">
        <label className="text-lg" htmlFor="name">
          Name:
        </label>
        <input
          className="p-2 text-lg outline-2 outline-purple-400"
          id="name"
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <button
          className="bg-white shadow-lg text-lg rounded-lg self-center py-2 px-6 mt-2"
          onClick={(e) => {
            addHandler(e, nameInput.trim());
            setNameInput("");
          }}
          disabled={!nameInput.length}
        >
          Add
        </button>
      </div>
      <div
        className="m-2 mr-0 rounded-md bg-white shadow-lg flex items-center"
        onClick={(_) => {
          navigate("/summary");
        }}
      >
        <BsClipboardData size="80" className="p-4" />
      </div>
    </form>
  );
};
