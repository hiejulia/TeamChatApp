'use strict';

//create a slug from a text

function createSlug(value) {
   return value
   .toLowerCase()
   .replace(/[^\w\s]+/g,'')
   .trim()
   .replace(/[\s]+/g,'-');
}



module.exports.createSlug = createSlug;
