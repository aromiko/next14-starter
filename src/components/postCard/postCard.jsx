import Image from 'next/image';
import Link from 'next/link';
import styles from './postCard.module.css';

const PostCard = ({ post }) => {
  return (
    <article className={styles.container}>
      <div className={styles.top}>
        <div className={styles.imgContainer}>
          <Image
            src={
              post.img ||
              'https://images.pexels.com/photos/7150991/pexels-photo-7150991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            }
            alt=""
            fill
            className={styles.img}
          />
        </div>
        <time className={styles.date}>
          {post.createdAt.toString().slice(4, 16)}
        </time>
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.desc}>{post.desc}</p>
        <Link
          className={styles.link}
          href={`/blog/${post.slug}`}
          rel="bookmark"
        >
          Open blog post
        </Link>
      </div>
    </article>
  );
};

export default PostCard;
