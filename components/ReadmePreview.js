import ReactMarkdown from 'react-markdown';

const ReadmePreview = ({ content }) => {
  return (
    <div className="prose">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default ReadmePreview;