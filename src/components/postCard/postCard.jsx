import Image from 'next/image';
import Link from 'next/link';
import styles from './postCard.module.css';

const PostCard = ({ post }) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.imgContainer}>
          <Image src="/noavatar.png" alt="" fill className={styles.img} />
        </div>
        <span className={styles.date}>01.01.2021</span>
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.title}>Title</h1>
        <p className={styles.desc}>Desc</p>
        <Link className={styles.link} href="/blog/post">
          READ MORE
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
