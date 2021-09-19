import remark from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

const md = remark().use(gfm).use(html);

export default md;
