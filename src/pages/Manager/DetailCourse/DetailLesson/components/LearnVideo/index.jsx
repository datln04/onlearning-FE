import ReactPlayer from 'react-player';

function LearnVideo({ url, key }) {
  return (
    <>
      {/* <ReactPlayer key={key} width={780} height={420} url={url} /> */}
      <video key={key} controls width={780} height={420}>
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
}

export default LearnVideo;
