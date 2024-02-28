function LearnReading({ content, key }) {
  return (
    <>
      <div key={key}>
        <div className="ql-editor" style={{ padding: 0, wordBreak: 'break-word' }}>
          <div dangerouslySetInnerHTML={{ __html: content || '' }} />
        </div>
      </div>
    </>
  );
}

export default LearnReading;
