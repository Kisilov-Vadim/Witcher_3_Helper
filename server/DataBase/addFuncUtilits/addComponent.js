import db from '../index';

export const addComponentData = async (data) => {
  const {name, name_en, purchase, sale, weight, location, location_en, image} = data;
  let currentData = await db
    .query('select name from components where name=$1', [name])
    .then(res => res)
    .catch(err => console.log(err));
  let currentDataEN = await db
    .query('select name from components_en where name=$1', [name_en])
    .then(res => res)
    .catch(err => console.log(err));

  if (currentDataEN.length === 0 && currentData.length === 0) {
    return db
      .query(`insert into components(name, purchase, sale, weight, location, image) 
      values ($1, $2, $3, $4, $5, $6) returning id`, [name, purchase, sale, weight, location, image])
      .then(res => {
        return db
          .query(`insert into components_en(id, name, purchase, sale, weight, location, image) 
          values ($1, $2, $3, $4, $5, $6, $7) returning name`, [res[0].id, name_en, purchase, sale, weight, location_en, image])
          .then((data) => {
            return {status: true, message: `Компонент ${data[0].name} был успешно добавлен в базу`}
          })
          .catch((err) => {
            console.log(err);
            db.query('delete from components where id=$1', [+res[0].id])
            return {status: false, message: 'Произошла ошибка с добавлением компонента в components'}
          })
      })
      .catch(err => {
        console.log(err)
        return {status: false, message: 'Произошла ошибка с добавлением компонента в components'}
      }); 
  } else {
    return {status: false, message: 'Компонент уже есть в базе'}
  }
}; 