// import Highlight, { defaultProps } from "prism-react-renderer";
// import dracula from "prism-react-renderer/themes/dracula";

// const CodeBlock = ({ code, language = "javascript" }) => {
//   return (
//     <Highlight
//       {...defaultProps}
//       code={code.trim()}
//       language={language}
//       theme={dracula}
//     >
//       {({ className, style, tokens, getLineProps, getTokenProps }) => (
//         <pre
//           className={`${className} p-4 rounded-lg overflow-x-auto`}
//           style={style}
//         >
//           {tokens.map((line, i) => (
//             <div key={i} {...getLineProps({ line })}>
//               {line.map((token, key) => (
//                 <span key={key} {...getTokenProps({ token })} />
//               ))}
//             </div>
//           ))}
//         </pre>
//       )}
//     </Highlight>
//   );
// };

// export default CodeBlock;
