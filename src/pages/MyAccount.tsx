import { Layout } from '@shared/layouts/Layout';
import { UserCardDetails } from '@modules/users';
import { AccountActions } from '@modules/account';

const MyAccount = () => {
  return (
    <Layout>
      <h1 className="text-center font-bold text-2xl">My profile</h1>
      <UserCardDetails isMyAccount={true} />
      <AccountActions />
    </Layout>
  );
};

export default MyAccount;
