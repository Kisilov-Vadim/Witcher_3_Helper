import db from '../index'; 

export default async ({lang}) => {
  return db
    .query(`select * from silver_swords${lang === 'en' ? '_en' : ''}`)
    .then(res => {
      return res.map( async (silverSword) => {
        let newComponents = silverSword.components.map(async (item) => {
          item.component = await db
            .query(`select * from components${lang === 'en' ? '_en' : ''} where id=$1`, [item.component])
            .then(component => component[0], (err) => console.log(err))
          return item
        })
        silverSword.components = newComponents;
        return silverSword;
      })
    })
    .catch(err => {
      console.log(err);
      return {status: false, message: 'Проблема с получением данных...'}
    })
}