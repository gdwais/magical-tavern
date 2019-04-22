exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('users', {
        user_id: 'id',
        username: { type: 'varchar(1000)', notNull: true },
        email: { type: 'varchar(1000)', notNull: true },
        password: { type: 'varchar(1000)', notNull: true },
        created_date: {
          type: 'timestamp',
          notNull: true,
          default: pgm.func('current_timestamp')
        },
        updated_date: {
          type: 'timestamp',
          notNull: true,
          default:pgm.func('current_timestamp')
        }
      });

      pgm.createTable('characters', {
        character_id: 'id',
        user_id: { type: 'integer', notNull: true },
        character_data: { type: 'JSON', notNull: true }
      });
};

exports.down = (pgm) => {
  pgm.dropTable('users');
  pgm.dropTable('characters');
};
