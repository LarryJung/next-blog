import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
const postsDirectory = join(process.cwd(), '_posts');

const read = (dir) =>
  fs
    .readdirSync(dir)
    .reduce(
      (files, file) =>
        fs.statSync(join(dir, file)).isDirectory()
          ? files.concat(read(join(dir, file)))
          : files.concat(join(dir, file)),
      [],
    );

export function getPostSlugs() {
  return read(postsDirectory);
}

export function getPostByPath(path, fields = []) {
  return getPostBySlug(postsDirectory + '/' + path.join('/') + '.md', fields);
}

export function getPostBySlug(slug, fields = []) {
  console.log('=======');
  console.log(slug);
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = `${realSlug}.md`;
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const breadCrumbs = realSlug.replace(postsDirectory).split('/').slice(1);
  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });
  items['breadCrumbs'] = breadCrumbs;
  return items;
}

export function getAllPosts(fields = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
