import { useState, useEffect } from 'react';
import Link from 'next/link';
import HeadComponent from '../../components/Head';
import FooterComponent from '../../components/Footer';
import MobileNavigation from '../../components/MobileNavigation';
import DesktopNavigation from '../../components/DesktopNavigation';
// import topicsData from '../../data/homepage.json';

export default function Post({ topicsData = {} }) {
  const [windowWidth, setWindowWidth] = useState(768);
  // const [posts, setPostsData] = useState(topicsData?.blockPosts?.data || {});
  const [posts, setPostsData] = useState(topicsData || {});
  
  useEffect(() => {
    // if (!topicsData) {
    //   window.location.href = '404';
    //   return false;
    // }
    setWindowWidth(window.innerWidth);
    const handleWindowResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleWindowResize);
    document.querySelector('html').style.visibility = 'visible';
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return (
    <div className='container'>
      <HeadComponent title='Cinema Period - All Blog Posts & Reviews about Cinema' />
      <main className='main'>
        {windowWidth < 768 ? <MobileNavigation /> : <DesktopNavigation />}
        <section className='header-bar'>
          <h1 className='pageHeading'>
            Movies
          </h1>
          {/* <h2 className='pageSubHeading'>
            #hashes
          </h2> */}
        </section>

        <section className='main-container'>
          <section className='grid'>
            {posts && Object.keys(posts).length && Object.keys(posts).map((key, index) => {
              return (
                <section className={`card ${((windowWidth > 960 && (index+1) % 3 === 0) || (windowWidth > 600 && windowWidth <= 960 && (index+1) % 2 === 0)) ? 'right-most' : ''}`} key={index}>
                  <article>
                    <Link href={`/${key}`} target="_blank">
                      <a className='imgLink'>
                        <img src={posts[key].posterImage || posts[key].heroImage} alt='' />
                      </a>
                    </Link>
                    <header className='postHeader'>
                      <label>
                        <a href=''>{posts[key].tag || 'Movie'}</a>  
                      </label>
                      <h3 className='postTitle'>
                        <Link href={`/${key}`} target="_blank">
                          <a>{posts[key].heading}</a>
                        </Link>
                      </h3>
                      <p className='postSubTitle'>{posts[key].subHeading}</p>
                      <div className='byline'>
                        <img src='https://mtv.mtvnimages.com/uri/mgid:file:http:shared:mtv.com/news/wp-content/uploads/2017/05/headshot-med-1495221420.png?format=jpg&quality=.8' alt='' />
                        <div className='authorDetails'>
                          <a href=''>{posts[key].author}</a>
                          <time>{posts[key].publishedDate}</time>
                        </div>
                      </div>
                    </header>
                  </article>
                </section>
              );  
            })}
          </section>
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
        
        .header-bar .pageHeading, .header-bar .pageSubHeading {
          margin: 0;
          line-height: 1.15;
          font-size: 3.2rem;
          margin: 0 auto;
          text-align: center;
        }
        
        .header-bar .pageSubHeading {
          margin-top: 1.5rem;
          font-size: 1.8rem;
          font-weight: 400;
        }
        
        .main-container {
          display: flex;
          justify-content: space-between;
          max-width: 100%;
        }

        .grid {
          display: flex;
          // align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 1.8rem;
          width: 100%;
          text-align: center;
        }

        .card {
          padding: 0;
          flex-basis: calc(33.33% - 1rem);
          max-width: calc(100% - 2rem);
          text-decoration: none;
          margin-right: 1rem;
          flex-grow: 1;
        }

        .card.right-most {
          margin-right: 0px;
          flex-basis: 33.33%
          max-width: 33.33%
        }
        
        .card > article {
          width: 100%;
          background: transparent;
        }

        .imgLink {
          color: #1a1a1a;
          text-decoration: none;
        }

        .imgLink > img {
          height: auto;
          border-radius: 0.4rem;
          display: block;
          max-width: 100%;
          max-height: 300px;
          width: 100%;
          min-height: 300px;
        }
        
        .postHeader {
          margin-top: 0;
          border-top: 0;
          padding: 1.25rem;
          position: relative;
        }

        .postHeader > label {
          position: absolute;
          width: 10rem;
          text-align: center;
          left: calc(50% - 5rem);
          top: -2rem;
          background: #333;
          color: #fff;
          font-size: 1.4rem;
          font-weight: bold;
          padding: 1rem 0;
          border-radius: 0.2rem;
        }

        .postTitle {
          font-size: 2.5rem;
          font-weight: 600;
          line-height: 2.6rem;
          margin: 1rem 0;
          text-align: center;
        }
        
        .postTitle:hover {
          text-decoration: underline;
        }
        .postSubTitle {
          margin: 0;
          line-height: 1.2;
          font-size: 1.8rem;
          text-align: center;
        }

        .byline {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 1rem 0;
          border: none;
          font-size: 1rem;
          font-weight: bold;
          letter-spacing: 0.125rem;
        }

        .byline > img {
          width: 6rem;
          height: 6rem;
          line-height: 0;
          display: block;
          border-radius: 50%;
          margin-right: 1rem;
        }

        .byline .authorDetails {
          display: flex;
          flex-direction: column;
          height: 100%;
          align-self: center;
        }
        .authorDetails > a {
          margin-bottom: 0.8rem;
          text-transform: uppercase;
          font-size: 1.4rem;
        }
        .authorDetails > time {
          font-size: 1rem;
        }

        @media only screen and (max-width: 600px) {
          .card {
            flex-basis: calc(100% - 1rem);
          } 
        }
        
        @media only screen and (min-width: 601px) and (max-width: 960px) {
          .card {
            flex-basis: calc(50% - 1rem);
          } 
        }

      `}
      </style>
    </div>
  )
}

export async function getStaticProps() {
  const topicsData = await import('../../data/topicsData.json');
  return {
    props: {
      topicsData: topicsData.default
    }
  }
}