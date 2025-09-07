import { AccountActions } from '@modules/account';
import { UserCardDetails } from '@modules/users';
import { Layout } from '@shared/layouts/Layout';

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
