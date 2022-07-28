import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router'
import React from 'react'

type PostDetailPageProps = {post:any}

export default function PostDetailPage({post}: PostDetailPageProps) {
  const router = useRouter();
  return (
    <div>
        <h1>PostDetailPage</h1>
        <p>Query: {JSON.stringify(router.query)}</p>
        <p>{post.title}</p>
        <p>{post.author}</p>
        <p>{post.description}</p>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async()=>{
    console.log('\nGET STATIC PATHS');
    const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');
    const data = await response.json();

    return {
        paths: data.data.map((item:any)=> ({params: {postId: item.id}})),
        fallback: false,
    }
}

export const getStaticProps:GetStaticProps = async(context: GetStaticPropsContext)=>{
    console.log('\nGET STATIC PATHS', context.params?.postId);
    const postId = context.params?.postId;
    if(!postId) return {notFound: true};
    const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`);
    const data  = await response.json();
    // console.log('data',data);
    return {
        props: {
            post:data
        }
    }
}

