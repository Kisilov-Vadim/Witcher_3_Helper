import db from './index';

export default async (data) => {
  const {
    name, name_en, type, type_en, category, 
    category_en, effect, effect_en, rune_slots, 
    damage, purchase, sale, weight, location, 
    location_en, image, components
  } = data; 
 
  let DataBaseCheck_EN = await db
    .query('select name from silver_swords_en where name=$1', [data.name_en])
    .then(res => res)
    .catch(err => console.log(err)); 
  let DataBaseCheck_RU = await db
    .query('select name from silver_swords where name=$1', [data.name])
    .then(res => res)
    .catch(err => console.log(err)); 

    // db.query('TRUNCATE silver_swords_en RESTART IDENTITY CASCADE')
    //   .then(() => {
    //     db.query('TRUNCATE silver_swords RESTART IDENTITY CASCADE')
    //   })

  if (DataBaseCheck_EN.length === 0 && DataBaseCheck_RU.length === 0) {
    return db
      .query(`insert into silver_swords_en(name, type, category, effect, rune_slots, 
        damage, purchase, sale, weight, location, image, components)
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) returning *`, [name_en, type_en, category_en, effect_en, rune_slots, damage, purchase, sale, weight, location_en, image, JSON.stringify(components)])
      .then(res => {
        return db
          .query(`insert into silver_swords(id, name, type, category, effect, rune_slots, 
            damage, purchase, sale, weight, location, image, components) 
            values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) returning name`, [res[0].id, name, type, category, effect, rune_slots, damage, purchase, sale, weight, location, image, JSON.stringify(components)])
            .then(secondRes => {
              return {status: true, message: `Серебряный меч ${secondRes[0].name} был успешно добавлен`}
            }) 
            .catch(err => {
              console.log(err);
              return db
                .query('delete from silver_swords_en where id=$1', [+res[0].id])
                .then(res => ({status: false, message: 'Проблема с запросом к silver_swords_en, меч был успешно удален с silver_swords'}))
                .catch(err => {
                  console.log(err)
                  return {status: false, message: 'Проблема с удаленем меча в silver_swords_en по айди'}
                })
            })
        
      })
      .catch(err => {
        console.log(err);
        return {status: false, message: 'Проблема с запросом к silver_swords_en'}
      }); 
  } else {
    return {status: false, message: 'Меч не был добавлен в базу. Скорей всего он уже есть в базе.'}
  }
}