import SnippetList from "../components/SnippetList";

const SnippetsPage = () => {
  return (
    <div className="p-4 min-h-screen bg-slate-950 text-white">
      <h1 className="text-2xl font-bold mb-4 text-amber-400">🧩 Snippets</h1>
      <SnippetList />
    </div>
  );
};

export default SnippetsPage;
