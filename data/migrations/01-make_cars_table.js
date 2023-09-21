exports.up = async function (knex) {
  await knex.schema.createTable('cars', table =>{
    table.increments('id')
    table.string('vin',17).notNullable().unique()
    table.string('make',50).notNullable()
    table.string('model',50).notNullable()
    table.decimal('mileage',11).notNullable()
    table.string('title',25)
    table.string('transmission',30)
  })
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('cars')
  
};
