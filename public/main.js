const update = document.querySelector('#update-button'); 
const deleteButton = document.querySelector("#delete-button"); 
const messageDiv = document.querySelector("#message") 

update.addEventListener('click', () => {
  // Send put request here
  fetch('/quotes', {
    method: 'put', 
    // tell the server we're sending json
    headers: {'Content-type': 'application/json'},
    // convert the data we send into JSON 
    body: JSON.stringify({
      name: 'Darth Vader', 
      quote: 'In find your lack of faith disturbing.'
    })
  }).then(res => {
    if (res.ok) return res.json()
  })
  .then(response => {
    // So we don't have to reload the browser manually, just when clicked
   
    window.location.reload(true)
  })
})

deleteButton.addEventListener('click',
() =>  {
  fetch("/quotes", {
    method: 'delete', 
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify({
      name: 'Darth Vader'
    })
  }).then(res => {
    if(res.ok) return res.json() 
  }).then(response => {
    if (response === 'No quote to delete') {
      messageDiv.textContent = 'No Darth Vader quote to delete'
    } else {
      window.location.reload(true)
    }
  })
})