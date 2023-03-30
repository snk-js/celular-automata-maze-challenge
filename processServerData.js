import fs from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);

const loadTextFile = async (path) => {
  try {
    const data = await readFileAsync(path, 'utf-8');
    return data;
  } catch (error) {
    console.error('Error fetching the text file:', error);
    return null;
  }
};

export const input = loadTextFile('./data');