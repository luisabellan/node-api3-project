"use strict";

var db = require('../data/dbConfig.js');

module.exports = {
  get: get,
  getById: getById,
  insert: insert,
  update: update,
  remove: remove
};

function get() {
  return db('posts');
}

function getById(id) {
  return db('posts').where({
    id: id
  }).first();
}

function insert(post) {
  return db('posts').insert(post).then(function (ids) {
    return getById(ids[0]);
  });
}

function update(id, changes) {
  return db('posts').where({
    id: id
  }).update(changes);
}

function remove(id) {
  return db('posts').where('id', id).del();
}