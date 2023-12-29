// userLocks.ts
import fs from 'fs';
import path from 'path';

export interface UserLocks {
    users: Record<string, string>;
    elecINFOS: Record<string, number>;
    kontostandINFOS: Record<string, number>
  }
  
  export function getUserNumber(userAddress: string | undefined, userLocks: UserLocks): string | undefined {
    if (userAddress === undefined) {
      return undefined;
    }
  
    return userLocks.users[userAddress];
  }
export function getUserEnergy(userNumber: string | undefined, userLocks: UserLocks): number | undefined {
    if (userNumber === undefined) {
        return undefined;
      }

    return userLocks.elecINFOS[userNumber];
}

export function getUserKontostand(userKontostand: string | undefined, userLocks: UserLocks): number | undefined {
    if (userKontostand === undefined) {
        return undefined;
      }

    return userLocks.kontostandINFOS[userKontostand];
}

