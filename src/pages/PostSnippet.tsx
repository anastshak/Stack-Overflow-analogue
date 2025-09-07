import { CreateSnippetCard } from '@modules/snippets';
import { Layout } from '@shared/layouts/Layout';

const PostSnippet = () => {
  return (
    <Layout>
      <div className="mt-[5%]">
        <h1 className="text-center font-bold text-2xl mb-4">Create new snippet!</h1>
        <CreateSnippetCard />
      </div>
    </Layout>
  );
};

export default PostSnippet;
