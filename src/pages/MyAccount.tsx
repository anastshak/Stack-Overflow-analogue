import { AccountActions } from '../components/AccountActions';
import { Layout } from '../components/Layout';
import { UserCardDetails } from '../components/UserCardDetails';

export const MyAccount = () => {
  return (
    <Layout>
      <h1 className="text-center font-bold text-2xl">My profile</h1>
      <UserCardDetails isMyAccount={true} />
      <AccountActions />
    </Layout>
  );
};
