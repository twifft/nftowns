import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface UserLocks {
  users: Record<string, string>;
  elecINFOS: Record<string, number>;
  kontostandINFOS: Record<string, number>;
}

const userLocks: UserLocks = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'userLocks.json'), 'utf8'));

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.body;

  try {
    // Check if the address already exists in the userLocks object
    const existingUser = Object.entries(userLocks.users).find(([key, value]) => value === userId);
    if (existingUser) {
      return res.status(200).json({ message: 'User already exists.', number: existingUser[0], userLocks });
    }

    // Assign a new number to the new address
    const newNumber = Object.keys(userLocks.users).length + 1;
    userLocks.users[userId] = newNumber.toString();

    // Add the new user number to the elecINFOS object with a value of 300
    if (newNumber > Object.keys(userLocks.elecINFOS).length) {
      userLocks.elecINFOS[newNumber.toString()] = 300;
    }
    if (newNumber > Object.keys(userLocks.kontostandINFOS).length) {
      userLocks.kontostandINFOS[newNumber.toString()] = 0;
    }

    fs.writeFileSync(path.join(process.cwd(), 'userLocks.json'), JSON.stringify(userLocks));
    res.status(200).json({ message: 'User added to file.', number: newNumber, userLocks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding user to file.' });
  }
}