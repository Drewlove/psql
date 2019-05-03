const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')

describe("Shopping List service object", ()=> {
    let db; 

    let testItems = [
        {
            product_id: 1, 
            name: 'Cheerios', 
            price: '1.99', 
            date_added: new Date('2019-01-22T12:30:32.615Z'), 
            checked: true, 
            category: 'Breakfast',
        }, 
        {
            product_id: 2, 
            name: 'Dunkaroos', 
            price: '2.99', 
            date_added: new Date('2025-01-22T19:08:32.615Z'), 
            checked: false, 
            category: 'Snack',
        }, 
        {
            product_id: 3, 
            name: 'Bananas', 
            price: '3.99', 
            date_added: new Date('2022-01-22T06:42:32.615Z'), 
            checked: true, 
            category: 'Lunch',
        },
    ]

    before(() => {
        db = knex({
          client: 'pg',
          connection: process.env.TEST_DB_URL,
        })
      })

      beforeEach(()=> db('shopping_list').truncate())
      after(()=> db.destroy())
      
      context(`Given 'shopping_list has data`, ()=> {
          beforeEach(()=> {
              return db
              .into('shopping_list')
              .insert(testItems)
          })


          it(`deleteItemById() deletes item by id from shopping_list`, ()=> {
              const id = 1; 
              return ShoppingListService.deleteItemById(db, id)
              .then( () => ShoppingListService.getAllItems(db))
              .then(allItems => {
                  let expectedList = allItems.filter(item => item.product_id !== id)
                  expect(allItems).to.eql(expectedList)
              })
          })
          it(`getItemById() retrieves item by id`, ()=> {
              const id = 2; 
              const expectedItem = testItems.find(item => item.product_id == id)
              return ShoppingListService.getItemById(db, id)
              .then(actual => {
                  expect(actual).to.eql(expectedItem)
              })
          })
          it(`updateItemById() updates item by id`, ()=> {
              const id = 2; 
              const updatedItem = {
                  product_id: id, 
                  name: "Count Chocula", 
                  price: '4.99', 
                  date_added: new Date('2022-01-22T19:08:32.615Z'), 
                  checked: true,
                  category: 'Breakfast',
              }
              return ShoppingListService.updateItemById(db, id, updatedItem)
              .then( ()=> ShoppingListService.getItemById(db, id))
              .then(actual => {
                  expect(actual).to.eql(updatedItem); 
              })
          })
          it('getAllItems() resolves all items from shopping_list', ()=> {
            return ShoppingListService.getAllItems(db)
            .then(actual => {
                expect(actual).to.eql(testItems)
            })
        })
    })
    context(`Given shopping_list has no data`, ()=> {
        it(`getAllItems() returns empty array`, ()=> {
            return ShoppingListService.getAllItems(db)
            .then(actual => {
                expect(actual).to.eql([])
            })
        })
        it(`insertItem() inserts a new item and gives the article an id`, ()=> {
           const newItem = {
               product_id: 1,
                name: 'Cheerios', 
                price: '1.99', 
                date_added: new Date('2019-01-22T12:30:32.615Z'), 
                checked: true, 
                category: 'Breakfast'       
           }
           return ShoppingListService.insertItem(db, newItem)
           .then(actual => {
               expect(actual).to.eql(newItem)
           }) 
        })
    })
})
