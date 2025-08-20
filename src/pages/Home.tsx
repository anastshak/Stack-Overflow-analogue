import { Header } from '../components/Header';
import { Logo } from '../components/Logo';
import { PostCardList } from '../components/PostCardsList';
import { Sidebar } from '../components/Sidebar';

export const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-gray-50 p-6 overflow-y-auto ">
          <h1 className="text-2xl my-5 font-bold font-mono flex flex-col items-center">
            Welcome to Codelang! <Logo />
          </h1>
          <PostCardList />
        </main>
      </div>
    </div>
  );
};
