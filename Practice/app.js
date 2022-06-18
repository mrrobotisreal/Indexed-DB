/*
  Had to use python3 http server and navigate to http://localhost:8000/index.html for it to work.
  Otherwise Chrome does not allow it.
*/

//qID, questionText, correctAnswer, studentAnswer, result
const Queue = require('./queue');

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
  tx = db.transaction('QuestionsStore', 'readwrite');
  store = tx.objectStore('QuestionsStore');
  index = store.index('questionText');

  db.onerror = function(e) {
    console.error('ERROR: ', e.target.errorCode);
  }

  store.put({
    qID: 1,
    questionText: 'The sky is blue.',
    correctAnswer: true,
    studentAnswer: true,
    result: true,
  });

  store.put({
    qID: 2,
    questionText: 'The grass is green.',
    correctAnswer: true,
    studentAnswer: true,
    result: true,
  });

  let q1 = store.get(1);
  let qs = index.get('The grass is green.');
  let queue = new Queue();

  q1.onsuccess = function() {
    console.log('q1: ', q1.result);
    console.log('q1 questionText: ', q1.result.questionText);
    queue.enqueue(q1.result);
  };

  qs.onsuccess = function() {
    console.log('qs: ', qs.result);
    console.log('qs questionText: ', qs.result.questionText);
    queue.enqueue(qs.result);
  };

  tx.oncomplete = function() {
    db.close();
  }
};