//QUESTIONS: 
/*Why are certain where statements with ids written within curly braces? 
why are some not? 

.update requires that newItemFields be an object where every key\value pair
that's part of the row is specified? As opposed to just providing the updated
key/value pairs as you would do in a spread operator? 

Trying to better understand what knex does, and why 
it's used in the shopping-list-service as a paramter, where the 
database is later the argument 

Is the table, such as shopping-list, 
itself a giant array containing objects? 
As opposed to an object containing objects? 
*/

const ShoppingListService = {
    getAllItems(knex){
        return knex
        .select('*')
        .from('shopping_list')
    },
    insertItem(knex, newItem){
        return knex
        .insert(newItem)
        .into('shopping_list')
        .returning('*')
        .then(rows => {
            return rows[0]
        })
    },
    getItemById(knex, product_id){
        return knex
        .from('shopping_list')
        .select('*')
        .where('product_id', product_id).first()
    },
    deleteItemById(knex, product_id){
        return knex
        .from('shopping_list')
        .where({product_id})
        .delete(); 
    }, 
    updateItemById(knex, product_id, newItemFields){
        return knex
        .from('shopping_list')
        .where({product_id})
        .update(newItemFields)
    }, 
}

module.exports = ShoppingListService; 