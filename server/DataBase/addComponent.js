import db from './index';

export const addComponentData = async (data) => {
  const {name, name_en, purchase, sale, weight, location, location_en, image} = data;
  let currentData = await db
    .query('select name from components')
    .then(res => res)
    .catch(err => console.log(err));
  let currentDataEN = await db
    .query('select name from components_en')
    .then(res => res)
    .catch(err => console.log(err));

  if (currentData.find(item => item.name === name)) {
    return {name: name};
  } else if (currentDataEN.find(item => item.name === name_en)) {
    return {name: name_en};
  } else {
    return db
      .query('insert into components(name, purchase, sale, weight, location, image) values ($1, $2, $3, $4, $5, $6) returning *', [name, purchase, sale, weight, location, image])
      .then(res => {
        db
          .query('insert into components_en(id, name, purchase, sale, weight, location, image) values ($1, $2, $3, $4, $5, $6, $7) returning *', [res[0].id, name_en, purchase, sale, weight, location_en, image])
        return res[0]
      })
      .catch(err => console.log(err)); 
  }
}; 