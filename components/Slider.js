import { useState, useEffect } from 'react';

export default function Slider() {
  const [windowWidth, setWindowWidth] = useState(768);
  const [slideOptions, setSlideOptions] = useState({
    translate: 0,
    transition: 0.45,
    activeSlideIndex: 0,
    containerWidth: 0,
  });

  useEffect(() => {
    setSlideOptions({...slideOptions, containerWidth: document.querySelector('.swiper-wrapper')?.offsetWidth});
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
      setSlideOptions({...slideOptions, containerWidth: document.querySelector('.swiper-wrapper')?.offsetWidth});
    }
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  const navigateSlider = (index) => {
    setSlideOptions({...slideOptions, activeSlideIndex: index });
  }
  
  const goPrev = () => {
    let newActiveSlideIndex = null;
    if (slideOptions.activeSlideIndex === 0) {
      newActiveSlideIndex = Array.from(Array(4)).length - 1;
    } else {
      newActiveSlideIndex = slideOptions.activeSlideIndex - 1;
    }
    setSlideOptions({...slideOptions, activeSlideIndex: newActiveSlideIndex });
  }

  const goNext = () => {
    let newActiveSlideIndex = null;
    if (slideOptions.activeSlideIndex === Array.from(Array(4)).length - 1) {
      newActiveSlideIndex = 0;
    } else {
      newActiveSlideIndex = slideOptions.activeSlideIndex + 1;
    }
    setSlideOptions({...slideOptions, activeSlideIndex: newActiveSlideIndex });
  }

  return (
    <div className='slider-section col-md-6 side-border'>
      <div className='swiper-container'>
        <div className='swiper-wrapper' style={{ transition: 'transform 0.3s cubic-bezier(0.995, 0.020, 0.000, -0.015)', transform: `translate3d(-${slideOptions.containerWidth * slideOptions.activeSlideIndex}px, 0, 0)` }}>
          <div className='swiper-slide'>
            <div className='featured-post-wrapper'>
              <div className='featured-img-wrapper'>
                <img src="https://cdn.dnaindia.com/sites/default/files/styles/full/public/2020/08/22/920553-suriya-soorarai-pottru.jpg" />
              </div>
              <div className='featured-details-wrapper'>
                <h2 className='featured-title'>
                  <a href=''>Best Movies of 2020 - Tamil</a>
                </h2>
                <div className='featured-author'>
                  <a href=''>By Akash</a>
                  <span>30 Dec, 2020</span>
                </div>
              </div>
            </div>
          </div>
          <div className='swiper-slide'>
            <div className='featured-post-wrapper'>
              <div className='featured-img-wrapper'>
                <img src="https://occ-0-1001-444.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABfDqVfGEgUxFd9JCJYKOdan1dJiVJumrwTIHZXhhgYPwfzhs7-zouKQ_T811lHckfuQtdAuqlN78Sg8AcDvkIzKzvvo5.jpg?r=daf" />
              </div>
              <div className='featured-details-wrapper'>
                <h2 className='featured-title'>
                  <a href=''>Paava Kadhaigal - Anthology that we can be proud of</a>
                </h2>
                <div className='featured-author'>
                  <a href=''>By Akash Muthu</a>
                  <span>29 Dec, 2020</span>
                </div>
              </div>
            </div>
          </div>
          <div className='swiper-slide'>
            <div className='featured-post-wrapper'>
              <div className='featured-img-wrapper'>
                <img src="https://www.moviedash.com/wp-content/uploads/2020/05/Tenet-Theories-1.jpeg" />
              </div>
              <div className='featured-details-wrapper'>
                <h2 className='featured-title'>
                  <a href=''>Tenet - Nolan's special is not that special after all this time</a>
                </h2>
                <div className='featured-author'>
                  <a href=''>By 20th Dec, 2020</a>
                  <span>29 Dec, 2020</span>
                </div>
              </div>
            </div>
          </div>
          <div className='swiper-slide'>
            <div className='featured-post-wrapper'>
              <div className='featured-img-wrapper'>
                <img src="https://i.ytimg.com/vi/fPueXWDpI2Q/maxresdefault.jpg" />
              </div>
              <div className='featured-details-wrapper'>
                <h2 className='featured-title'>
                  <a href=''>Kanni Raasi - The Vimal Anna we know is back</a>
                </h2>
                <div className='featured-author'>
                  <a href=''>By Akash Muthu</a>
                  <span>25 Dec, 2020</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='swiper-navigation'>
          {Array.from(Array(4))?.map((slide, index) => {
            return (<span key={index} className={slideOptions.activeSlideIndex === index ? 'swiper-bullet swiper-bullet-active' : 'swiper-bullet'} onClick={() => navigateSlider(index)}></span>);
          })}
        </div>
        <div className='swiper-button-prev' onClick={goPrev}>
          <span className='icon-left'>&#171;</span>
        </div>
        <div className='swiper-button-next' onClick={goNext}>
          <span className='icon-right'>&#187;</span>
        </div>
      </div>
      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 1rem;
          display: flex;
          flex-direction: column;
        }
        .main {
          padding: 1rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        .row {
          display: flex;
          flex-wrap: wrap;
          max-width: 100%;
        }
        .col-md-3, .col-md-6 {
          position: relative;
          width: 100%;
          min-height: 1px;
          padding-right: 20px;
          padding-left: 20px;
        }
        .latest-section > h4, .trending-section > h4, .overlay-container > h4 {
          font-size: 2rem;
          letter-spacing: 0.5px;
          // text-transform: none;
        }
        .overlay-container > h4 {
          text-align: center;
          width: 100%;
          padding-bottom: 1rem;
          font-size: 2rem;
        }
        .post-item-wrapper {
          margin: 1rem 0;
        }
        .category-link {
          color: #227871;
          font-weight: 900;
          font-size: 1.2rem;
        }
        .post-title-wrapper {
          display: flex;
          margin-bottom: 0.5rem;
        }
        .post-title-wrapper:hover, .featured-title:hover > a {
          text-decoration: underline;
          cursor: pointer;
        }
        .post-title-wrapper.upcoming-releases:hover {
          text-decoration: none;
        }
        .post-title-wrapper > h5, .author-wrapper > h5 {
          flex: 0 0 100% !important;
          max-width: 100% !important
          line-height: 24px;
          font-size: 1.8rem;
          color: #000;
          line-height: 1.8rem;
        }
        .author-wrapper > h5 {
          font-size: 1.4rem;
          font-weight: 500;
        }
        // .post-title-wrapper a {
        //   line-height: 20px;
        // }
        .border-top {
          border-top: 1px dotted lightgrey;
        }
        .mt-1 {
          margin-top: 1rem!important;
        }
        .text-uppercase {
          text-transform: uppercase;
        }
        .author-wrapper {
          color: #292929;
          font-size: 1.2rem;
          font-weight: 500;
          margin-bottom: 1rem;
        }
        .tag-wrapper > a {
          font-size: 1rem;
          color: #292929;
        }
        .btn {
          font-size: 1.4rem;
          font-weight: 500;
          padding: 1rem 1.5rem;
          background: cadetblue;
          color: #fff;
          cursor: pointer;
          width: 100%;
          flex-basis: 100%;
          display: block;
          text-align: center;
          border-radius: 0.4rem;
        }
        .btn:hover {
          text-decoration: underline;
          opacity: 0.9;
        }
        .side-border {
          border-right: 1px solid rgba(108,108,108,.15);
          border-left: 1px solid rgba(108,108,108,.15);
        }
        .swiper-container {
          margin: 0 auto;
          position: relative;
          overflow: hidden;
          list-style: none;
          padding: 0;
          z-index: 1;
        }
        .swiper-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          z-index: 1;
          display: flex;
          transition-property: -webkit-transform;
          transition-property: transform;
          transition-property: transform,-webkit-transform;
          box-sizing: content-box;
          transition-property: transform,-webkit-transform;
        }
        .swiper-slide {
          width: 558px;
          flex-shrink: 0;
          width: 100%;
          height: 100%;
          position: relative;
          transition-property: transform;
        }
        .featured-img-wrapper img {
          width: 100%;
          object-fit: cover;
        }
        .featured-post-wrapper {
          position: relative;
        }
        .featured-details-wrapper {
          background: #f4f4f4;
          width: 90%;
          margin: -30px auto 17px;
          position: relative;
          text-align: center;
          padding: 10px;
          border-radius: 0.3rem;
        }
        .featured-title {
          font-size: 26px;
          color: #333;
          line-height: 36px;
          padding: 10px 0 0;
        }
        .featured-author {
          padding-bottom: 20px;
        }
        .featured-author > a {
          font-size: 11px;
          color: #333;
          border-right: .5px solid #292929;
          padding: 0 10px;
          font-weight: 600;
        }
        .featured-author > span {
          font-size: 11px;
          color: #333;
          padding: 0 10px;
          font-weight: 600;
        }
        .swiper-navigation {
          display: flex;
          justify-content: center;
          transition: 0.5s opacity;
          transform: translate3d(0, 0, 0);
          z-index: 10;
          margin: 10px 0;
        }
        .swiper-bullet {
          margin: 0 5px;
          cursor: pointer;
          width: 12px;
          height: 12px;
          border-radius: 100%;
          background: #000;
          opacity: 0.6;
        }
        .swiper-bullet-active {
          background: green;
        }
        .col-overlay {
          overflow: hidden;
          border-radius: 4px;
        }
        .overlay-block img {
          transition: transform .4s;
        }
        .overlay-block img:hover {
          transform: scale(1.05);
        }
        .col-overlay > a {
          display: block;
          position: relative;
          cursor: pointer;
          color: #fff;
          transition: all .2s;
          text-decoration: none;
        }
        .col-overlay figure {
          display: block;
        }
        .col-overlay img {
          width: 100%;
          display: block;
          height: auto;
          max-width: 100%;
          max-height: 165px;
        }
        .block-figcaption {
          position: absolute;
          left: 0;
          width: 100%;
          right: 0;
          top: auto;
          bottom: 0;
          color: #fff;
          display: block;
          padding: 5px 10px;
          background: linear-gradient(180deg,transparent,#000);
        }
        .block-details {
          display: flex;
          justify-content: space-between;
        }
        .block-figcaption > h6 {
          font-size: 1.8rem;
          margin: 0.4rem 0;
        }
        .block-author {
          font-size: 1.6rem;
          font-weight: 600;
        }
        .block-stars {
          align-self: center;
        }
        .side-block-title {
          display: flex;
          flex-direction: column;
          width: 100%;
          margin: 3rem 0;
          padding-left: 2rem;
          padding-right: 2rem;
        }
        .side-block-overline {
          width: 50px;
          height: 5px;
          background: #d2691e;
          border-radius: 50%;
          align-self: center;
          margin-bottom: 10px;
        }
        .side-block-heading {
          align-self: center;
          font-size: 2.6rem;
        }
        .side-block-columns {
          display: flex;
          background: #f8f6f1;
        }
        .side-block-content {
          padding-left: 2rem;
          padding-right: 2rem;
        }
        .side-block-main-heading {
          font-size: 3rem;
        }
        .side-block-subheading {
          padding-top: 4rem;
          font-weight: 600;
          font-style: normal;
          font-size: 1.8rem;
          line-height: .9816rem;
          color: blue;
          font-family: sans-serif;
        }
        .side-block-line {
          font-size: 1.6rem;
          padding-top: 2rem;
        }
        .side-block-time {
          color: grey;
          padding-top: 0.5rem;
          font-size: 1.4rem;
        }
        .side-block-img a {
          color: #1897c2;
          transition: all .2s;
          text-decoration: none;
          opacity: 1 !important;
        }
        .side-block-img img {
          max-width: 100%;
          min-width: 100%;
          max-height: 500px;
          height: 100%;
        }
        .side-block-data {
          padding: 10px 20px;
        }
        .tabs-container {
          display: flex;
          width: 100%;
          padding-left: 20px;
          padding-right: 20px;
        }
        .movie-list-container-1, .movie-list-container-2 {
          list-style: none;
          flex: 0 0 50%;
          max-width: 50%;
          padding-right: 1rem;
        }
        .movie-list-item {
          padding-bottom: 1rem;
          padding-top: 1rem;
          padding-left: 1rem;
          border-bottom: 0.1rem dotted cornflowerblue;
          cursor: pointer;
          transition: background 0.3s ease-in-out, transform 0.2s ease-out;
        }
        .movie-list-item:hover {
          background: #fff1de;
          border-radius: 0.5rem;
          transform: scale(1.009);
        }
        .tab-list-item-container {
          display: flex;
        }
        .tab-list-item-container > span {
          font-size: 4rem;
          // border: 0.5px solid red;
          border-radius: 10%;
          background: mediumaquamarine;
          padding: 0 10px;
          display: inline-block;
          max-height: 60px;
          text-align: center;
          flex-basis: 10%;
        }
        .tab-list-item-container > div {
          align-self: flex-start;
          margin-left: 10px;
          font-size: 2rem;
          flex-basis: 90%;
        }
        .tab-list-item-container > div > h4 {
          line-height: 2rem;
        }
        .swiper-button-prev {
          // bottom: 100px;
          left: 1.5rem;
        }
        .swiper-button-next {
          right: 1.5rem;
        }
        .swiper-button-next, .swiper-button-prev {
          position: absolute;
          width: 2.7rem;
          top: 25%;
          height: 4.4rem;
          z-index: 1000;
          cursor: pointer;
          font-size: 1.6rem;
          font-weight: bold;
          color: #000;
          border: 0.1rem dotted silver;
          display: flex;
          justify-content: center;
          border-radius: 10%;
        }
        .swiper-button-next > span, .swiper-button-prev > span {
          font-size: 2.6rem;
        }

        @media (max-width: 760px) {
          .trending-section {
            order: -1;
            margin-bottom: 1rem;
          }
          .latest-section {
            margin-bottom: 1rem;
          }
          .latestHeading, .trendingHeading {
            text-align: center;
          }
        }
        @media (min-width: 760px) {
          .col-md-3 {
              flex: 0 0 25%;
              max-width: 25%;
          }
          .col-md-4 {
            flex: 0 0 33.33%;
            max-width: 33.33%;
          }
          .col-md-6 {
            flex: 0 0 50%;
            max-width: 50%;
          }
          .col-md-8 {
            flex: 0 0 66.67%;
            max-width: 66.67%;
          }
        }

        @media (min-width: 968px) {
          .col-md-6 {
              flex: 0 0 50%;
              max-width: 50%;
          }
        }

        @media only screen and (max-width: 1024px) and (min-width: 768px) {
          .container {
            min-height: 100vh;
          }
        }
        @media only screen and (max-width: 600px) {
          .trendingHeading, .latestHeading {
            text-align: center;
          }
          .overlay-container .col-md-3 {
            padding-bottom: 1rem;
          }
          .side-block-columns {
            flex-direction: column;
          }
          .side-block-columns .side-block-data {
            flex-basis: 100%;
            max-width: 100%;
            align-self: center;
            /* margin: 0 auto; */
            text-align: center
          }
          .side-block-heading {
            text-align: center;
          }
          .tabs-container {
            flex-direction: column;
          }
          .tabs-container .movie-list-container-1, 
          .tabs-container .movie-list-container-2 {
            flex-basis: 100%;
            max-width: 100%;
          }
          .tab-list-item-container > span {
            flex-basis: 21%;
            max-width: 21%;
            min-width: 21%;
          }
          .side-block-img img {
            max-height: 300px;
          }
          .swiper-button-prev, .swiper-button-next {
            top: 15%;
          }
          .swiper-button-prev {
            left: 0.5rem;
          }
          .swiper-button-next {
            right: 0.5rem;
          }
          .btn {
            margin-bottom: 1rem;
          }
        }
      `}
      </style>
    </div>
  );
}