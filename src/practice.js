require('dotenv').config()
const knex = require('knex')


const knexInstance = knex({
    client: 'pg', 
    connection: process.env.DB_URL
})



function searchByProductName(searchTerm){
    knexInstance
    .from('amazong_products')
    .select('name', 'product_id', 'category', 'price')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(res => {
        console.log(res)
    })
}

function paginateProducts(page){
    const productsPerPage = 10
    const offset = productsPerPage * (page -1)
    knexInstance
    .select('product_id', 'name', 'price', 'category')
    .from('amazong_products')
    .limit(productsPerPage)
    .offset(offset)
    .then(result => {
        console.log(result)
    })   
}

function getProductsWithImages(){
    knexInstance
    .select('product_id', 'name', 'price', 'category')
    .from('amazong_products')
    .whereNotNull('image')
    .then(res => {
        console.log(res)
    })
}

function mostPopularVideosForDays(days){
    knexInstance
    .select('video_name', 'region')
    .count('date_viewed AS views')
    .where(
        'date_viewed', 
        '>', 
        knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
    )
    .from('whopipe_video_views')
    .groupBy('video_name', 'region')
    .orderBy([
        {column: 'region', order: 'ASC'}, 
        {column: 'views', order: 'DESC'}
    ])
    .then(result => {
        console.log(result)
    })
}




