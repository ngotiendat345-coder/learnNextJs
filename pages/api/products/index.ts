// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy from 'http-proxy';

type Data = | {
    data:any[],
    pagination: any
} | { name: string}


const proxy = httpProxy.createProxyServer();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if(req.method !== 'GET'){
        return res.status(404).json({name:'method not supported'});
    }
    req.headers.cookie = '';
    proxy.web(req, res, {
        target: process.env.API_URL,
        changeOrigin: true,
        selfHandleResponse: false
    })
    // const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');
    // const responseJSON = await response.json();
    // res.status(200).json(responseJSON)
}
