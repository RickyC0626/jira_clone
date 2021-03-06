import { catchErrors } from 'errors';
import { signToken } from 'utils/authToken';
import createAccount from 'database/createGuestAccount';

export const createGuestAccount = catchErrors((_req, res) => {
  return async () => {
    const user = await createAccount();
    res.respond({
      authToken: signToken({ sub: user.id }),
    });
  };
});
