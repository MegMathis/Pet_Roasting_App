



const getComments = () =>
  fetch('/api/comments', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  getComments




  document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);