function handleFileSelect(contents) {

      const payload = { 'contents': contents };
  
      fetch('/upload', {
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

  handleFileSelect('lorimer')