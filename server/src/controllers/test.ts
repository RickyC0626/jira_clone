import { catchErrors } from 'errors';
import { signToken } from 'utils/authToken';
import resetTestDatabase from 'database/resetDatabase';
import createTestAccount from 'database/createTestAccount';

export const resetDatabase = catchErrors((_req, res) => {
  return async () => {
    await resetTestDatabase();
    res.respond(true);
  };
});

export const createAccount = catchErrors((_req, res) => {
  return async () => {
    const user = await createTestAccount();
    res.respond({
      authToken: signToken({ sub: user.id }),
    });
  };
});
