import * as React from "react";

type AddFormProps = {
  addHandler: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    name: string
  ) => void;
};

export const AddForm: React.FC<AddFormProps> = ({ addHandler }) => {
  const [nameInput, setNameInput] = React.useState("");

  return (
    <form className="flex flex-col p-2">
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
          addHandler(e, nameInput);
          setNameInput("");
        }}
        disabled={!nameInput.length}
      >
        Add
      </button>
    </form>
  );
};
