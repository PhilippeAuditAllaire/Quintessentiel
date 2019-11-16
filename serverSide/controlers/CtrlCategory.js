const Category = require("../class/Category.js");
const CategoryInfos = require("../class/CategoryInfos.js");
const MgrCategory = require("../managers/MgrCategory.js");

class CtrlCategory {

    constructor() {
        this._mgrCategory = new MgrCategory();
    }


    //Loads all the categories with
    //all their traductions
    loadAllCategoriesAdmin()
    {
        let context = this;
        let categoriesArray = [];

        return this._mgrCategory.loadAllCategoriesBasicInfos().then(function(categories){ //Load the basic categories infos

            return context._mgrCategory.loadAvailableLanguages().then(function(resLang){ //Load the languages

                async function asyncForEach(array, callback) { //Async foreach
                  for (let index = 0; index < array.length; index++) {
                    await callback(array[index], index, array);
                  }
                }
                

                const loadAllCategoriesInfos = async () => {

                    await asyncForEach(categories, async (cat) => {    //For each categories

                        let category = new Category({id:cat.id,isVisible:cat.isVisible});
                        categoriesArray.push(category);
               
                        await asyncForEach(resLang, async (lang) => {    //For each languages, find all their traductions

                            await context._mgrCategory.loadCategoryAttributes(category.id,lang.id).then(function(categoryAttributes){ //Load its infos
                                categoryAttributes = categoryAttributes[0]
                                let traduction = new CategoryInfos(category.id,categoryAttributes.idLang,categoryAttributes.value)
                                category.traductions.push(JSON.stringify(traduction));  

                            })

                        });


                    });

                }

                return loadAllCategoriesInfos();
            });



        }).then(function(){
            return categoriesArray;
        });
    }
}

module.exports = CtrlCategory;