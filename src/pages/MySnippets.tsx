import { Layout } from '@shared/layouts/Layout';
import { MySnippetsList } from '@modules/snippets';

const MySnippets = () => {
  return (
    <Layout>
      <h1 className="text-center font-bold text-2xl mb-4">My code snippets</h1>
      <MySnippetsList />
    </Layout>
  );
};

export default MySnippets;
