//qID, questionText, correctAnswer, studentAnswer, result

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

if (!window.indexedDB) {
  alert('Uh oh! Looks like indexedDB isn\'t supported.');
}