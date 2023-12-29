// checkAndUpdateAddress.ts
import {useAddress} from "@thirdweb-dev/react";

import * as path from 'path';
import * as userLocks from '../userLocks.json';

interface Users {
  [number: string]: string;
}

interface UserLocks {
  users: Users;
}
const userId = useAddress()?.toString + "";
function checkAndUpdateAddress(address: string): void {
  

  const locksPath = path.join(__dirname, '..', 'userLocks.json');
  const locks: UserLocks = userLocks;

  if (!(userId in locks.users)) {
    // Add the address if not present
    locks.users[userId] = address;

    // You may want to update the userLocks.json file here if your environment allows
    // Note: Directly modifying the imported object won't persist changes to the file

    console.log(`Address added for user ${userId}`);
  } else {
    console.log(`Address already exists for user ${userId}`);
  }
}

export default checkAndUpdateAddress;
