const TextEditor = ({ content, setContent }) => {
    return (
      <textarea
        className="w-full h-full p-2 border"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    );
  };
  
  export default TextEditor;
  