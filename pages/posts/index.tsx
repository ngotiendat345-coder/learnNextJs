import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import React from 'react'

type PostListPageProps = {
    posts:any
}

const PostListPage = (props: PostListPageProps) => {

  return (
    <div>
        <h1>Post List Page</h1>
        <ul>
            {props.posts.map((post:any)=>(<li key={post.title}><Link href={`/posts/${post.id}`}>
                <a>{post.title}</a></Link></li>))}
        </ul>
    </div>
  )
}

export default PostListPage;

// export const getStaticPaths: GetStaticPaths = async()=>{
//     console.log('\nGET STATIC PATHS');
//     const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');
//     const data = await response.json();

//     return {
//         paths: data.data.map((item:any)=> ({params: {postId: item.id}})),
//         fallback: false,
//     }
// }
// server side
// build time
export const getStaticProps:GetStaticProps = async(context: GetStaticPropsContext)=>{
    console.log('\getStaticProps');
    const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');
    const data  = await response.json();
    // console.log('data',data);
    return {
        props: {
            posts:data.data
        }
    }
}

