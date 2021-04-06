const YoutubeComponent = ({ id, windowWidth }) => {
  return (
    <iframe 
      style={{ width: windowWidth < 600  ? "400px" : "600px", maxWidth: windowWidth < 600  ? "100%" : "600px", height: windowWidth < 600  ? "250px" : (windowWidth < 900 ? "350px" : "400px"), maxHeight: "400px" }}
      className='youtube-embed'
      src={`https://www.youtube.com/embed/${id}`} 
      frameBorder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowFullScreen>
    </iframe>
  );
}

export default YoutubeComponent;