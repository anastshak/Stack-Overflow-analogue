import { useEffect } from 'react';
import { Layout } from '../components/Layout';
import { Logo } from '../components/Logo';
import { PostCardList } from '../components/PostCardsList';
import { useAuthStore } from '../store/authStore';

export const Home = () => {
  const restore = useAuthStore((state) => state.restore);

  useEffect(() => {
    restore();
  }, [restore]);

  return (
    <Layout>
      <h1 className="text-2xl my-5 font-bold font-mono flex flex-col items-center">
        Welcome to Codelang! <Logo />
      </h1>
      <PostCardList />
    </Layout>
  );
};
