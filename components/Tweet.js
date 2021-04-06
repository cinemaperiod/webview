import { Tweet } from 'react-twitter-widgets';

const TweetComponent = ({ id, options }) => {
  return (
    <Tweet
      tweetId={id}
      options={options}
    />
  );
}

export default TweetComponent;