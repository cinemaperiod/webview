import { useState, useEffect, lazy, Suspense } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dynamic from "next/dynamic";
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { formatDate, getIdFromURL, getSocialMediaFromLink } from "../helpers";
// import HeadComponent from '../components/Head';
// import FooterComponent from '../components/Footer';
// import MobileNavigation from '../components/MobileNavigation';
// import DesktopNavigation from '../components/DesktopNavigation';

const HeadComponent = dynamic(() => import('../components/Head'), { ssr: false });
const FooterComponent = dynamic(() => import('../components/Footer'), { ssr: false });
const MobileNavigation = dynamic(() => import('../components/MobileNavigation'), { ssr: false });
const DesktopNavigation = dynamic(() => import('../components/DesktopNavigation'), { ssr: false });
// import post from '../data/post.json';
// import staticPaths from '../../data/staticPaths.json';
// import topicsData from '../../data/topicsData.json';
const TweetComponent = lazy(() => import('../components/Tweet'));
const YoutubeComponent = lazy(() => import('../components/Youtube'));

function Post({ topicsData = {} }) {
  const router = useRouter();
  const { topic } = router.query;
  // const { topicsData } = props;
  const [windowWidth, setWindowWidth] = useState(768);
  const [post, setPostData] = useState({});

  const relatedPosts = topicsData.filter((topicData, index) => index <= 4 && topic !== topicData.node.postData.slug) || [];

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleWindowResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleWindowResize);
    console.log(topicsData, Object.keys(topicsData)?.length, topic, 'arun2');
    const postDataAvailable = topicsData?.find((data) => data?.node?.slug === topic);
    console.log(postDataAvailable, 'arun123');
    if (topic && topicsData?.length > 0 && postDataAvailable) {
      setPostData(postDataAvailable?.node?.postData);
    }
    document.querySelector('html').style.visibility = 'visible';
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [topic]);

  if (Object.keys(post).length === 0 && post.constructor === Object) return <div />

  const youtubeLinks = post?.youtubelinks?.split(',') || [];
  const socialTags = post?.socialtags?.split(',') || [];
  const tweetLinks = post?.tweetlinks?.split(',') || [];
  const isMovieGalleryAvailable = post?.movieimages1 || post?.movieimages2 || post?.movieimages3 || post?.movieimages4 || post?.movieimages5 || post?.movieimages6 || post?.movieimages7 || post?.movieimages8;

  return (
    <div className='container'>
      <HeadComponent title={`${post.heading} - Cinema Period - cinemaperiod.com`} />
      <main className='main'>
        {windowWidth < 768 ? <MobileNavigation /> : <DesktopNavigation />}
        <section className='main-container'>
          <section className='content'>
            <h1 className='title'>
              {post.heading}
            </h1>

            <h2 className='subtitle'>
              {post.subHeading}
            </h2>

            <p className='description'>
              <span>
                Published on:&nbsp;<span className='highlight-text'>{formatDate(post.publisheddate)}</span>&nbsp;
              </span>
              <span>
                Author:&nbsp;<span className='highlight-text'>{post.author}</span>&nbsp;
              </span>
              <span>
                Reading Time:&nbsp;<span className='highlight-text'>{post.readtime} mins</span>&nbsp;
              </span>
            </p>

            <div className='grid'>
              <section className='card' style={{ flexBasis: '100%', textAlign: 'center', width: '100%' }}>
                <figure>
                  <img className='heroImage' src={post?.heroimage?.mediaItemUrl} alt={post.heading} />
                </figure>
              </section>

              {/* {post && post.basicDetails && (
                <section className='card'>
                  {post.basicDetails.director && (
                    <p>
                      <span className='highlight-text'>Director:</span>&nbsp; {post.basicDetails.director}
                    </p>
                  )}

                  {post.basicDetails.cast && (
                    <p>
                      <span className='highlight-text'>Cast:</span>&nbsp; {post.basicDetails.cast.join(',')}
                    </p>
                  )}

                  {post.basicDetails.streamingOn && (
                    <p>
                      <span className='highlight-text'>Streaming on:</span>&nbsp; {post.basicDetails.streamingOn}
                    </p>
                  )}
                </section>
              )} */}

              {post.content1 && (
                <section className='card'>
                  <p>{post.content1}</p>
                </section>
              )}

              {post.content2 && (
                <section className='card'>
                  <p>{post.content2}</p>
                </section>
              )}

              {youtubeLinks.length && youtubeLinks[0] && (
                <section className='card video-card'>
                  <Suspense fallback={<>Loading...</>}>
                    <YoutubeComponent id={getIdFromURL(youtubeLinks[0])} windowWidth={windowWidth} />
                  </Suspense>
                </section>
              )}

              {post.content3 && (
                <section className='card'>
                  <p>{post.content3}</p>
                </section>
              )}

              {tweetLinks.length > 0 && (
                <section className='card tweet-card'>
                  <Suspense fallback={<>Loading...</>}>
                    <TweetComponent
                      id={tweetLinks[0]?.trim()}
                      options={{ width: '500' }}
                    />
                  </Suspense>
                </section>
              )}

              {post.content4 && (
                <section className='card' style={{ width: '100%', display: 'block' }}>
                  <p>{post.content4}</p>
                </section>
              )}

              {tweetLinks.length > 0 && (
                <section className='card tweet-card'>
                  <Suspense fallback={<>Loading...</>}>
                    <TweetComponent
                      id={tweetLinks[1]?.trim()}
                      options={{ width: '500' }}
                    />
                  </Suspense>
                </section>
              )}

              {post.content5 && (
                <section className='card'>
                  <p>{post.content5}</p>
                </section>
              )}

              {post.content6 && (
                <section className='card'>
                  <p>{post.content6}</p>
                </section>
              )}

              {youtubeLinks.length && youtubeLinks[1] && (
                <section className='card video-card'>
                  <Suspense fallback={<>Loading...</>}>
                    <YoutubeComponent id={getIdFromURL(youtubeLinks[1])} windowWidth={windowWidth} />
                  </Suspense>
                </section>
              )}

              {post.content7 && (
                <section className='card'>
                  <p>{post.content7}</p>
                </section>
              )}

              {post.type !== 'review' && post.secondaryimage && post.secondaryimage.mediaItemUrl && (
                <section className='card' style={{ flexBasis: '100%', textAlign: 'center', width: '100%' }}>
                  <figure>
                    <Suspense fallback={<>Loading...</>}>
                      <img className='heroImage' src={post.secondaryimage?.mediaItemUrl} alt={post.heading} />
                    </Suspense>
                  </figure>
                </section>
              )}

              {post.content8 && (
                <section className='card'>
                  <p>{post.content8}</p>
                </section>
              )}

              {post.content9 && (
                <section className='card'>
                  <p>{post.content9}</p>
                </section>
              )}

              {post.content10 && (
                <section className='card'>
                  <p>{post.content10}</p>
                </section>
              )}

            </div>
          </section>

          <aside className='sidebar'>
            <div className='grid'>
              {relatedPosts.length > 0 && (
                <section className='card related-reviews-block'>
                  <h3 className='related-reviews-heading'>Related Posts</h3>
                  {relatedPosts.map(({ node : { postData:relatedPost = {}, slug }}) => {
                    // const currentPost = topicsData[url] || null;
                    // if (!currentPost) return null;
                    return (
                      <div className='movie-card' key={Math.random()}>
                        <div className='movie-card-container'>
                          <img src={relatedPost?.heroimage?.mediaItemUrl} alt={relatedPost.heading} />
                          <Link href={slug} target='_blank'>
                            <a className='movie-card-data'>
                              <h5>{relatedPost?.heading}</h5>
                              <h6>Published on {formatDate(relatedPost?.publisheddate)}</h6>
                            </a>
                          </Link>
                        </div>
                      </div>
                    )
                  })}
                </section>
              )}

              {socialTags.length > 0 && (
                <section className='card'>
                  <h3 className='social-posts-heading'>Social Posts</h3>
                  <div className='social-tags'>
                    {socialTags.map((tag) => {
                      if (!tag || !tag?.trim()) return null;
                      return (
                        <span className={getSocialMediaFromLink(tag)?.media} key={Math.random()}>
                          <a href={tag} target='_blank'>@{getSocialMediaFromLink(tag)?.id}</a>
                        </span>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* {post.movieGallery && post.movieGallery.length > 0 && (
                <section className='card'>
                  <h3 className='movie-gallery-heading'>Movie Gallery</h3>
                  <div className='gallery-container'>
                    {post.movieGallery.map((img, index) => {
                      if (!img) return null;
                      return (
                        <div className='image-wrapper' key={index}>
                          <img src={img} alt={post.heading} />
                        </div>
                      )
                    })}
                  </div>
                </section>
              )} */}
              {isMovieGalleryAvailable && (
                <section className='card'>
                  <h3 className='movie-gallery-heading'>Movie Gallery</h3>
                  <div className='gallery-container'>
                    {post?.movieimages1 && (
                      <div className='image-wrapper'>
                        <Suspense fallback={<>Loading...</>}>
                          <img src={post?.movieimages1?.mediaItemUrl} alt={post?.heading} />
                        </Suspense>
                      </div>
                    )}
                    {post?.movieimages2 && (
                      <div className='image-wrapper'>
                        <Suspense fallback={<>Loading...</>}>
                          <img src={post?.movieimages2?.mediaItemUrl} alt={post?.heading} />
                        </Suspense>
                      </div>
                    )}
                    {post?.movieimages3 && (
                      <div className='image-wrapper'>
                        <Suspense fallback={<>Loading...</>}>
                          <img src={post?.movieimages3?.mediaItemUrl} alt={post?.heading} />
                        </Suspense>
                      </div>
                    )}
                    {post?.movieimages4 && (
                      <div className='image-wrapper'>
                        <Suspense fallback={<>Loading...</>}>
                          <img src={post?.movieimages4?.mediaItemUrl} alt={post?.heading} />
                        </Suspense>
                      </div>
                    )}
                    {post?.movieimages5 && (
                      <div className='image-wrapper'>
                        <Suspense fallback={<>Loading...</>}>
                          <img src={post?.movieimages5?.mediaItemUrl} alt={post?.heading} />
                        </Suspense>
                      </div>
                    )}
                    {post?.movieimages6 && (
                      <div className='image-wrapper'>
                        <Suspense fallback={<>Loading...</>}>
                          <img src={post?.movieimages6?.mediaItemUrl} alt={post?.heading} />
                        </Suspense>
                      </div>
                    )}
                    {post?.movieimages7 && (
                      <div className='image-wrapper'>
                        <Suspense fallback={<>Loading...</>}>
                          <img src={post?.movieimages7?.mediaItemUrl} alt={post?.heading} />
                        </Suspense>
                      </div>
                    )}
                    {post?.movieimages8 && (
                      <div className='image-wrapper'>
                        <Suspense fallback={<>Loading...</>}>
                          <img src={post?.movieimages8?.mediaItemUrl} alt={post?.heading} />
                        </Suspense>
                      </div>
                    )}
                  </div>
                </section>
              )}
            </div>
          </aside>
        </section>
      </main>
      <FooterComponent />
      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 1rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          width: 90vw;
          max-width: 90vw;
        }
        .main {
          padding: 1rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .highlight-text {
          color: #0070f3;
          text-decoration: none;
        }
        
        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }
        
        .title, .subtitle {
          margin: 0;
          line-height: 1.15;
          font-size: 3.2rem;
          margin: 0 auto;
          display: block;
        }
        .subtitle {
          margin-top: 1.5rem;
          font-size: 1.8rem;
          font-weight: 400;
        }
        .title,
        .subtitle,
        .description {
          text-align: center;
        }
        
        .description {
          line-height: 1.5;
          font-size: 1.4rem;
          margin-top: 2rem;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
        }
        .description > p {
          padding-left: 0.5rem;
          padding-right: 0.5rem;
        }
        
        .grid {
          display: flex;
          align-items: center;
          // justify-content: center;
          flex-wrap: wrap;
          // max-width: 1000px;
          // width: 80vw;
          margin-top: 1.8rem;
        }
        .sidebar .grid, .related-reviews-heading {
          margin-top: 0;
        }
        
        .card {
          margin: 0 0 3rem 0;
          padding: 0;
          // flex-basis: 100%;
          // width: 100%;
          text-align: left;
          color: inherit;
          text-decoration: none;
        }

        .card.video-card {
          margin: 0 auto 2rem;
        }

        .card.tweet-card {
          max-width: 100%;
          width: 500px;
          margin: 0 auto;
        }

        .main-container {
          display: flex;
          justify-content: space-between;
          max-width: 100%;
        }

        .main-container .content {
          flex-basis: 70%;
          max-width: 70%;
          padding: 0 1rem;
        }
        
        .main-container .sidebar {
          flex-basis: 30%;
          max-width: 30%;
        }

        .card h3 {
          margin: 0rem 0 1rem;
          font-size: 2.5rem;
          font-weight: 600;
        }
        
        .card p {
          margin: 0;
          font-size: 2rem;
          line-height: 1.5;
        }

        .card .downloadBtn {
          display: flex;
          justify-content: center;
          cursor: pointer;
        }

        .card .downloadBtn button {
          padding: 15px 20px;
          border-radius: 5px;
          outline: none;
          border: 1px solid #000;
          background: #fff;
          color: #000;
          font-size: 1.8rem;
          font-weight: bold;
          cursor: pointer;
        }

        .card .downloadBtn button:hover {
          text-decoration: underline;
        }

        .card ul {
          margin-top: 2rem;
        }
        .card ul li {
          line-height: 1.5;
          font-size: 2rem;
          margin-left: 2.5rem;
        }

        .link {
          text-decoration: underline;
        }
        .movie-card {
          margin-bottom: 1rem;
        }
        .movie-card-container {
          display: flex;
        }
        .movie-card-container > img {
          height: 7rem;
          max-height: 7rem;
          border-radius: 50%;
          min-width: 8rem;
          max-width: 8rem;
        }

        .movie-card-data {
          padding-left: 0.5rem;
          cursor: pointer;
          transition: color .3s;
        }
        .movie-card-data:hover h5 {
          color: #CD5C5C;
        }
        .movie-card-data > h5 {
          font-size: 1.6rem;
          line-height: 2rem;
          padding-bottom: 0.4rem;
          font-weight: 600;
        }
        .movie-card-data > h6 {
          font-size: 1.2rem;
        }
        .heroImage {
          max-width: 100%;
          height: auto;
          max-height: 500px;
        }
        .social-tags {
          display: flex;
          flex-wrap: wrap;
        }

        .social-tags > span {
          background: rgb(29, 161, 242);
          padding: 5px 10px;
          border-radius: 15px;
          color: #000;
          font-size: 1.4rem;
          font-weight: 600;
          margin: 0 10px 10px 0;
          cursor: pointer;
        }
        .social-tags > span.facebook {
          background: #1877f2;
        }
        .social-tags > span.pinterest {
          background: #e60023;
        }
        .social-tags > span.youtube {
          background: #f00;
        }
        .social-tags > span.instagram {
          background: #405DE6;
        }
        .social-tags > span > a {
          color: #fff;
        }
        .gallery-container {
          display: flex;
          flex-wrap: wrap;
        }
        .gallery-container > .image-wrapper {
          flex: 0 0 50%;
          max-width: 50%;
          padding: 0.5rem;
          overflow: hidden;
        }
        .gallery-container > .image-wrapper > img  {
          width: 100%;
          max-width: 100%;
          min-height: 100%;
          border-radius: 0.5rem;
          max-height: 150px;
          cursor: pointer;
          transition: opacity 0.2s ease-in-out, transform 0.4s ease-in;
        }
        .gallery-container > .image-wrapper > img:hover  {
          opacity: 0.9;
          transform: scale(1.05);
        }
        @media only screen and (max-width: 1200px) and (min-width: 768px) {
          .main-container > .content {
            flex-basis: 100%;
            max-width: 100%;
          }
        }
        @media only screen and (max-width: 768px) {
          .title {
            font-size: 3.5rem;
          }
          .title > span {
            white-space: nowrap;
          }
          .description {
            margin: 0.8rem;
          }
          .description .code {
            font-size: 2.1rem;
          }
          .grid {
            width: 80vw;
            margin: 0 auto;
            max-width: 1000px;
            flex-direction: column;
          }
          .card {
            text-align: left;
          }
          .related-reviews-block {
            order: 2;
          }
        }

        @media only screen and (max-width: 1024px) and (min-width: 768px) {
          .container {
            min-height: 50vh;
          }
        }

        @media only screen and (max-width: 1150px) {
          .container {
            overflow: hidden;
            margin: 0 auto;
            flex-wrap: wrap;
            padding: 0;
            width: 100vw;
          }
          .main {
            flex-basis: 100%;
          }
          .main-container {
            flex-basis: 90%;
            max-width: 90%;
            flex-wrap: wrap;
          }
          .main-container > .content {
            flex-basis: 100%;
            max-width: 100%;
          }
          .main-container > .sidebar {
            flex-basis: 100%;
            max-width: 100%;
          }
          .title {
            font-size: 3.2rem;
          }
          .grid {
            max-width: 100%;
            align-items: stretch;
          }
          .card {
            width: 100%;
            max-width: 100%;
          }
          iframe {
            width: 100%;
            max-width: 100%;
            height: auto;
          }
          .card figure, .card figure img {
            width: 100%;
            max-width: 100%;
            flex-basis: 100%;
          }
          .social-posts-heading, 
          .related-reviews-heading, 
          .movie-gallery-heading {
            text-align: center;
          }
          .social-tags {
            justify-content: center;
          }
        }
      `}
      </style>
    </div>
  )
}

const GetAllBlosPosts = gql`
  query getToasterBySlug($slug: ID!) {
    blogposts(where: { status: PUBLISH }, last: 10000000) {
      edges {
        node {
          slug
          postData {
            type
            heading
            publisheddate
            author
            language
            category
            tags
          }
        }
      }
    }
  }
`;

async function fetchAPI(query, { variables, preview } = {}) {
  const res = await fetch('http://data.cinemaperiod.com/graphql' + (preview ? '/preview' : ''), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

export async function getStaticProps() {
  const PROJECTS_QUERY = gql`
    query {
      blogposts(where: { status: PUBLISH }, last: 100) {
        edges {
          node {
            slug
            postData {
              type
              heading
              subheading
              publisheddate
              author
              readtime
              tags
              heroimage {
                id
                mediaItemUrl            
              }
              secondaryimage {
                id 
                mediaItemUrl
              }
              language
              category
              content1
              content2
              content3
              content4
              content5
              content6
              content7
              content8
              youtubelinks
              tweetlinks
              socialtags
              movieimages1 {
                id
                mediaItemUrl
              }
              movieimages2 {
                id
                mediaItemUrl
              }
              movieimages3 {
                id
                mediaItemUrl
              }
              movieimages4 {
                id
                mediaItemUrl
              }
              movieimages5 {
                id
                mediaItemUrl
              }
              movieimages6 {
                id
                mediaItemUrl
              }
              movieimages7 {
                id
                mediaItemUrl
              }
              movieimages8 {
                id
                mediaItemUrl
              }
            }
          }
        }
      }
    }
  `;
  const apolloClient = new ApolloClient({
    link: new HttpLink({
      uri: 'http://data.cinemaperiod.com/graphql',
    }),
    cache: new InMemoryCache()
  });

  const { data } = await apolloClient.query({
    query: PROJECTS_QUERY
  });


  data?.blogposts?.edges?.forEach((post) => {
    // slugs.push(`/test/${post?.node?.slug}`);
  });

  // console.log('getstaticprops', data?.blogposts?.edges);

  return {
    props: {
      topicsData: data?.blogposts?.edges,
    }
  }
}

export async function getStaticPaths() {
  const PROJECTS_QUERY = gql`
    query {
      blogposts(where: { status: PUBLISH }, last: 100) {
        edges {
          node {
            slug
            postData {
              type
              heading
              publisheddate
              author
              language
              category
              tags
            }
          }
        }
      }
    }
  `;
  const apolloClient = new ApolloClient({
    link: new HttpLink({
      uri: 'http://data.cinemaperiod.com/graphql',
    }),
    cache: new InMemoryCache()
  });

  const result = await apolloClient.query({
    query: PROJECTS_QUERY
  });

  // setPostData(data.blogposts.edges);
  const slugs = [];
  const { data } = result;
  data?.blogposts?.edges?.forEach((post) => {
    slugs.push(`/${post?.node?.slug}`);
  });

  console.log('getstaticpaths', slugs);

  // return data?.allPosts
  return {
    // paths: staticPaths && staticPaths.urls,
    paths: slugs,
    fallback: false
  };
}

// export default graphql(GetAllBlosPosts, {
//   options: (props) => {
//     // const slug = 'toaster2';
//     const slug = props.match.params.topic;
//     return {
//       variables: {
//         slug
//       }
//     }
//   }
// })(Post);

export default Post;