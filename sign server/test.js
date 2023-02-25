function handleFileSelect(contents) {

  const payload = { 'contents': contents };

  // fetch('http://localhost:7775/file-upload', {
  fetch('https://weavetransfer.pythonanywhere.com/file-upload', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.text())
  .then(responseText => {
    console.log(responseText);
  })
  .catch(error => {
    console.error(error);
  });

}

handleFileSelect('e')

