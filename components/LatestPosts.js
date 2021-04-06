import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styles from './LatestPosts.module.css'

export default function LatestPosts() {
  return (
    <Query query={gql`
      {
        blogposts {
          edges {
            node {
              content
              postData {
                type
                heading
                subheading
                publisheddate
                author
                readtime
                heroimage
                secondaryimage
                language
                category
                content1
                content2
                content3
                content4
                content5
                content6
                youtubelinks
                tweetlinks
                socialtags
                moviegallery
              }
            }
          }
        }
      }
    `}>
      {({ loading, error, data}) => {
          console.log(data);
          if (loading) return (<h3>Loading....</h3>);
          if (error) returnn (<h5>Sorry, let again later.</h5>)
          return (
            <div className="latest-section col-md-3">
              <h4 className='text-uppercase trendingHeading'>Latest Posts</h4>
              <div>
                {
                  data?.blogposts?.edges?.map((post, key) => {
                    return (
                      <div className='border-top mt-1' key={key}>
                        <div className='post-item-wrapper'>
                          <a href='' className='category-link text-uppercase'>{post?.node?.postData?.language}</a>
                          <div className='post-title-wrapper'>
                            <h5><a href={post.url} target='_blank'>{post?.node?.postData?.heading}</a></h5>
                          </div>
                          <div className='author-wrapper'>
                            <h5><a href='javascript:void(0)'>By {post?.node?.postData?.author}</a></h5>
                            <span>{post.date}</span>
                          </div>
                          <div className='tag-wrapper'>
                            <a href='javascript:void(0)'>{post?.node?.postData?.category}</a>
                          </div>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
              <a href='/posts/allposts' className='allPosts'>See all posts</a>
            </div>
          )
        }
      }
    </Query>
  );
}