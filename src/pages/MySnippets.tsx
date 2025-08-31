import { Layout } from '../components/Layout';
import { MySnippetsList } from '../components/MySnippetsList';

export const MySnippets = () => {
  return (
    <Layout>
      <h1 className="text-center font-bold text-2xl mb-4">My code snippets</h1>
      <MySnippetsList />
    </Layout>
  );
};
