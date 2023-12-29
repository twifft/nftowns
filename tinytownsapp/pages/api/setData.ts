// pages/api/setData.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface UserLocks {
  users: Record<string, string>;
  elecINFOS: Record<string, number>;
  kontostandINFOS: Record<string, number>;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, newAddition, userLocksCheckNUMB } = req.body;

  try {
    if(userLocksCheckNUMB == undefined) {
      console.error("userLocksCheckNUMB cant be unasigned!")
      return;
    }


    const filePath = path.join(process.cwd(), 'userLocks.json');
    const userLocks: UserLocks = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    switch (userLocksCheckNUMB) {
      case 0:
        // Ensure that the current value is a number
        const currentKontostand = userLocks.kontostandINFOS[userId];
        const updatedKontostand = currentKontostand + newAddition;
        // Update the kontostandINFOS with the new value
        userLocks.kontostandINFOS[userId] = updatedKontostand;

        break;
      case 1:
        const currentEnergy = userLocks.elecINFOS[userId];
        const updatedEnergy = currentEnergy + newAddition;

        userLocks.elecINFOS[userId] = updatedEnergy;
        break;
      case 2:
        console.error(userLocksCheckNUMB +" is currently not asigned")
        break;
      default:
        console.error(userLocksCheckNUMB + " is not a valid Value!");
    }

    fs.writeFileSync(filePath, JSON.stringify(userLocks, null, 2), 'utf-8');

    res.status(200).json({ message: 'UserKontostand updated successfully.', userLocks });

    // Write the updated userLocks object to the JSON file
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating UserKontostand.' });
  }
}
