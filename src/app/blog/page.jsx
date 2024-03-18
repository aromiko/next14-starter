import PostCard from '@/components/postCard/PostCard';
import { getPosts } from '@/lib/data';
import styles from './blog.module.css';

const getData = async () => {
  const res = await fetch('http://localhost:3000/api/blog', {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

const BlogPage = async () => {
  const posts = await getData();
  // const posts = await getPosts();

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
