import type { APIRoute, GetStaticPaths } from 'astro';
import { sermons, type Sermon } from '../../lib/sermons';
import { sermonMd } from '../../lib/markdown';
import { abs } from '../../lib/schema';

export const getStaticPaths: GetStaticPaths = () => sermons.map((s) => ({ params: { slug: s.slug }, props: { sermon: s } }));

export const GET: APIRoute = ({ site, props }) =>
  new Response(sermonMd(props.sermon as Sermon, (p) => abs(p, site!)), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
