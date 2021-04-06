import Head from 'next/head';

export default function HeadComponent({ title = 'Cinema Period', description = 'Cinema Movie reviews, trending news, latest gossips, trailers, audios and videos, cinema tidbits', canonicalUrl = 'https://www.cinemaperiod.com' }) {
  return (
    <Head>
        <title>{title}</title>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <meta name='description' content={description} />
        <meta name='robots' content='index,follow' />
        <link rel='canonical' href={canonicalUrl} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta charset='utf-8' />
    </Head>
  ); 
}