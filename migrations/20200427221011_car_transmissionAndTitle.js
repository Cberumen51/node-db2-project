
exports.up = async function(knex) {
  await knex.schema.alterTable("car-dealer", (table) => {
    table.text("transmission")
    table.text("title")
  })
}

exports.down = async function(knex) {
  await knex.schema.alterTable("car-dealer", (table) => {
      table.dropColumn("transmission")
      table.dropColumn("title")
  })
}