import { players } from '../src/data/players.ts'

const rows = players.map(p =>
  `('${p.id}', '${p.name.replace(/'/g, "''")}', ${p.level}, ARRAY[${p.clubs.map(c => `'${c.replace(/'/g, "''")}'`).join(', ')}])`
)

console.log(`INSERT INTO players (id, name, level, clubs) VALUES`)
console.log(rows.join(',\n') + ';')
