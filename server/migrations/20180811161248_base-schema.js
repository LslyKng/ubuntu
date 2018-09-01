exports.up = async (knex, Promise) => {
  await knex.schema.createTable('shelters', table => {
    table.increments('shelter_id')
    table.string('name')
    table.string('address')
    table.string('details')
    table.string('about')
  })

  await knex.schema.createTable('organisations', table => {
    table.increments('organisation_id')
    table.string('organisation_name')
    table.string('contact_name')
    table.string('address')
    table.string('email')
    table.string('phone_number')
  })

  await knex.schema.createTable('referrals', table => {
    table.increments('referral_id')
    table.string('name')
    table.string('address')
    table.string('email')
    table.string('phone')
    table.integer('shelter_id')
    table.integer('organisation_id')

    table.foreign('shelter_id').references('shelter_id').inTable('shelters')
    table
      .foreign('organisation_id')
      .references('organisation_id')
      .inTable('organisations')
  })
  await knex.schema.createTable('staff', table => {
    table.increments('staff_id')
    table.string('name')
    table.string('address')
    table.string('email')
    table.string('phone')
    table.string('role')
    table.string('experience')
    table.boolean('paid')

    table.integer('shelter_id')
    table.foreign('shelter_id').references('shelter_id').inTable('shelters')
  })
  await knex.schema.createTable('volunteers', function (table) {
    table.increments('volunteer_id')
    table.string('name')
  })

  await knex.schema.createTable('users', table => {
    table.increments('user_id')
    table.string('name')
    table.string('email')
    table.string('password')
  })
}

exports.down = async (knex, Promise) => {
  await knex.schema.dropTableIfExists('volunteers')
  await knex.schema.dropTableIfExists('staff')
  await knex.schema.dropTableIfExists('referrals')
  await knex.schema.dropTableIfExists('shelters')
  await knex.schema.dropTableIfExists('users')
  await knex.schema.dropTableIfExists('organisations')
}
