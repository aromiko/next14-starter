'use server';

import { signIn, signOut } from './auth';

import { Post } from './models';
import { connectToDb } from './utils';
import { revalidatePath } from 'next/cache';

export const addPost = async (formData) => {
  const { title, desc, slug, userId } = Object.fromEntries(formData);

  console.log(title, desc, slug);

  try {
    connectToDb();
    const newPost = new Post({
      title,
      desc,
      slug,
      userId,
    });

    await newPost.save();
    console.log('Saved to DB');
    revalidatePath('/blog');
  } catch (error) {
    console.log(error);
    return { error: 'Failed to create post.' };
  }
};

export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.findByIdAndDelete(id);
    console.log('Saved to DB');
    revalidatePath('/blog');
  } catch (error) {
    console.log(error);
    return { error: 'Failed to delete post.' };
  }
};

export const handleGithubLogin = async () => {
  'use server';
  await signIn('github');
};

export const handleLogout = async () => {
  'use server';
  await signOut();
};
