import db from './index';

export const addComponentData = async (data) => {
  const {name, price, weight, location, image} = data;
  console.log(image)
  let currentData = await db
    .query('select name from components')
    .then(res => res)
    .catch(err => console.log(err));

  if (currentData.find(item => item.name === name)) {
    return null;
  } else {
    return db
      .query('insert into components(name, price, weight, location) values ($1, $2, $3, $4) returning *', [name, price, weight, location])
      .then(res => res[0])
      .catch(err => console.log(err)); 
  }
  return currentData;
}; 