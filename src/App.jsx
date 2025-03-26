import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function App() {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const markdownUrl = params.get("url");

    if (markdownUrl) {
      fetch(markdownUrl)
        .then((response) => response.text())
        .then((text) => setMarkdown(text))
        .catch((error) => setMarkdown(`Error loading markdown: ${error}`));
    } else {
      setMarkdown("No markdown URL provided. It should be passed as a query parameter, e.g. ?url=https://example.com/README.md");
    }
  }, []);

  return (
    <div className="markdown-body" style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
}

export default App;
