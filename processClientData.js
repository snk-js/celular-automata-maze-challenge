
const loadTextFile = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.text();
    return data;
  } catch (error) {
    console.error('Error fetching the text file:', error);
    return null;
  }
};

export const input = loadTextFile('./data')