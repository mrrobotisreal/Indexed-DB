//qID, questionText, correctAnswer, studentAnswer, result

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

if (!window.indexedDB) {
  alert('Uh oh! Looks like indexedDB isn\'t supported.');
}

let request = window.indexedDB.open('QuizQuestDatabase', 1), db, tx, store, index;

request.onupgradeneeded = function(e) {
  let db = request.result, store = db.createObjectStore('QuestionsStore', {keyPath: 'qID'}), index = store.createIndex('questionText', 'questionText', {unique: false});
  // store = db.createObjectStore('QuestionsStore', {autoIncrement: true});

};

request.onerror = function(e) {
  console.error('There was an error: ', e.target.errorCode);
};

request.onsuccess = function(e) {
  db = request.result;
};