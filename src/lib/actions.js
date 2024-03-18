'use server';

import { Post, User } from './models';
import { signIn, signOut } from './auth';

import bcrypt from 'bcryptjs';
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

export const register = async (previousState, formData) => {
  const { username, email, password, passwordRepeat, img } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: 'Passwords do not match!' };
  }

  try {
    connectToDb();

    const user = await User.findOne({ username });

    if (user) {
      return { error: 'User already exists!' };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
    });

    await newUser.save();
    console.log('Saved to DB');

    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: 'Failed to register user.' };
  }
};

export const login = async (previousState, formData) => {
  const { username, password } = Object.fromEntries(formData);
  try {
    await signIn('credentials', { username, password });
    return { success: true };
  } catch (error) {
    console.log(error);

    if (error.message.includes('CredentialsSignIn')) {
      return { error: 'Wrong username or password' };
    }
    // return { error: 'Something went wrong' };
    throw error;
  }
};
