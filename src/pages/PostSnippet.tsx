import { CreateSnippetCard } from '../components/CreateSnippetCard';
import { Layout } from '../components/Layout';

export const PostSnippet = () => {
  return (
    <Layout>
      <div className="mt-[5%]">
        <h1 className="text-center font-bold text-2xl mb-4">Create new snippet!</h1>
        <CreateSnippetCard />
      </div>
    </Layout>
  );
};
