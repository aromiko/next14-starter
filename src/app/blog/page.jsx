import PostCard from '@/components/postCard/PostCard';
import { getPosts } from '@/lib/data';
import styles from './blog.module.css';

const BlogPage = async () => {
  // const posts = await getData();
  const posts = await getPosts();

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
