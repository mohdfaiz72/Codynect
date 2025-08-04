import { useState } from "react";

const CreateSnippet = ({ onSubmit }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    institution: "",
    language: "JavaScript",
    time: "",
    space: "",
    points: "",
    code: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-slate-900 border border-amber-700 p-4 rounded-xl text-white w-full max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-3">Post a Snippet</h2>

      <input
        name="title"
        onChange={handleChange}
        value={form.title}
        placeholder="Title"
        className="input"
      />
      <textarea
        name="description"
        onChange={handleChange}
        value={form.description}
        placeholder="Description"
        className="textarea"
      />
      <input
        name="institution"
        onChange={handleChange}
        value={form.institution}
        placeholder="Institution (Optional)"
        className="input"
      />

      <select
        name="language"
        onChange={handleChange}
        value={form.language}
        className="input"
      >
        <option value="JavaScript">JavaScript</option>
        <option value="C++">C++</option>
        <option value="Python">Python</option>
        <option value="Java">Java</option>
      </select>

      <input
        name="time"
        onChange={handleChange}
        value={form.time}
        placeholder="Time Complexity (e.g., O(n))"
        className="input"
      />
      <input
        name="space"
        onChange={handleChange}
        value={form.space}
        placeholder="Space Complexity"
        className="input"
      />
      <textarea
        name="points"
        onChange={handleChange}
        value={form.points}
        placeholder="Important Points (one per line)"
        className="textarea"
      />
      <textarea
        name="code"
        onChange={handleChange}
        value={form.code}
        placeholder="Paste your code..."
        className="textarea font-mono bg-slate-800 text-green-300"
      />

      <button onClick={() => onSubmit(form)} className="btn-gradient mt-4">
        Post Snippet
      </button>
    </div>
  );
};

export default CreateSnippet;
