import { Layout } from '../components/Layout';
import { PostSnippetForm } from '../components/PostSnippetForm';

export const PostSnippet = () => {
  return (
    <Layout>
      <h1 className="text-center font-bold text-2xl">Create new snippet!</h1>
      <PostSnippetForm />
    </Layout>
  );
};
