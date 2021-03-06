const ArticlesService = {
    getAllArticles(knex){
        return knex
        .from('blogful_articles')
        .select('*')
    },
    insertArticle(knex, newArticle){
        return knex
        .insert(newArticle)
        .into('blogful_articles')
        .returning('*')
        .then(rows => {
            return rows[0]
        })
    },
    getById(knex, id) {
        return knex
        .from('blogful_articles')
        .select('*')
        .where('id', id).first()
    },
    deleteArticle(knex, id){
        return knex
        .from('blogful_articles')
        .where({id})
        .delete()
    },
    updateArticle(knex, id, newArticleFields){
        return knex
        .from('blogful_articles')
        .where({id})
        .update(newArticleFields)
    }
}

module.exports = ArticlesService