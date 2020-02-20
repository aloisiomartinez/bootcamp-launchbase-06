const db = require('../../config/db')

const Base = {
    init({ table }) {
        if(!table) throw new Error('Invalid Params')

        this.table = table // this significa que está falando do objeto Base

        return this
    },
    async findOne(filters) {
        let query = `SELECT * FROM ${this.table}`
    
        Object.keys(filters).map(key => {
          // WHERE | OR | AND
          query = `${query}
                ${key}
                `
    
          Object.keys(filters[key]).map(field => {
            query = `${query} ${field} = '${filters[key][field]}'`
          })
        })
    
        const results = await db.query(query)
    
        return results.rows[0]
      },
    async create(fields) { // User.create({ name: 'Aloisio'})
      try {
        let keys = [],
            values = []


        // Cria um array e pega as chaves dos fields (Ex: name)
        Object.keys(fields).map(key => {
            // keys
            // name, age, addres
            keys.push(key)
            values.push(fields[key])
            // values
            // 'Aloisio', '30', 'Rua alguma coisa' 
        }) 

        const query = `INSERT INTO ${this.table} (${keys.join(',')})
            VALUES (${values.join(',')})
            RETURNING id`

        const results = await db.query(query)
        return results.rows[0].id
      } catch(err) {
          console.error(err)
      }
    },
    update(id, fields) {
        try {
            let update = []

            Object.keys(fields).map(key => {
                // category_id=($1)
                const line = `${key} = '${fields[key]}'`
                update.push(line)
            })
      
            let query = `UPDATE ${this.table} SET
            ${update.join(',')} WHERE id = ${id}
            `
            
          
            return await db.query(query)     

        } catch (err) {
            console.error(err)
        }
        
      },
    delete(id) {
        return db.query('DELETE FROM products WHERE id = $1', [id])
    },
}

module.exports = Base