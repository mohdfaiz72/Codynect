import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ code, language }) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={atomDark}
      showLineNumbers
      customStyle={{
        backgroundColor: "#001",
        paddingLeft: "0",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
