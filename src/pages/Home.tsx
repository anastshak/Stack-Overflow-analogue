import { SnippetsList } from '@modules/snippets';
import { Layout } from '@shared/layouts/Layout';
import { Logo } from '@shared/ui/Logo';

const Home = () => {
  return (
    <Layout>
      <h1 className="text-2xl my-5 font-bold font-mono flex flex-col items-center">
        Welcome to Codelang! <Logo />
      </h1>
      <SnippetsList />
    </Layout>
  );
};

export default Home;
