import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
// import { EditorView } from "codemirror";

export const NoteEditor = ({
  onSave,
}: {
  onSave: (note: { title: string; content: string }) => void;
}) => {
  const [code, setCode] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  // const mytheme = EditorView.theme(
  //   {
  //     "&": {
  //       color: "white",
  //       backgroundColor: "#034",
  //     },
  //     ".cm-content": {
  //       caretColor: "#0e9",
  //     },
  //     "&.cm-focused .cm-cursor": {
  //       borderLeftColor: "#0e9",
  //     },
  //     "&.cm-focused .cm-selectionBackground, ::selection": {
  //       backgroundColor: "#074",
  //     },
  //     ".cm-gutters": {
  //       backgroundColor: "#045",
  //       color: "#ddd",
  //       border: "none",
  //     },
  //   },
  //   { dark: true }
  // );

  return (
    <div className="card mt-5 border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <input
            type="text"
            placeholder="Note Title"
            className="input-primary input input-lg w-full font-bold"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </h2>
        <CodeMirror
          value={code}
          width="500px"
          height="30vh"
          minWidth="100%"
          minHeight="30vh"
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
          ]}
          onChange={(value) => setCode(value)}
          className="border border-gray-800 text-base"
          theme={"dark"}
          placeholder="Take your notes here // example :  #Hello world"
        />
        <div className="card-actions justify-end">
          <button
            onClick={() => {
              onSave({
                title,
                content: code,
              });
              setCode("");
              setTitle("");
            }}
            className="btn-primary btn"
            disabled={title.trim().length === 0 || code.trim().length === 0}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
