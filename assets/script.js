const urlBase = `https://jsonplaceholder.typicode.com/posts`

let posts = []  //se inicializan los posteos como array 

function getData(){
    fetch(urlBase)
        .then(res => res.json())
        .then(data => {
            posts = data
            //metodo para mostrar la informacion
            renderPostList()
        })
        .catch(error => console.error('ERROR CONNECTING THE API:', error))
}

function renderPostList(){
    const postList = document.getElementById('postList')
    postList.innerHTML = '';

    posts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.classList.add('postItem');
        listItem.innerHTML = `
        
            <strong>${post.title}</strong>
            <p>${post.body}</p>
            <button onclick="editpost(${post.id})" id="editButton">EDIT</button>     
            <button id="delete" onclick="deletepost(${post.id})">DELETE</button>       

            <div id="editForm-${post.id}" class="editForm" style="display:none">
                <label for ="editTtile">TITLE: </label>
                <input type="text" id="editTitle-${post.id}" value="${post.title}" required>
                <label for="editBody">COMMENT</label>
                <textarea id="editBody-${post.id}" required> </textarea>
                <button onclick="updatePost(${post.id})">UPDATE</button>

            </div>
        `
        postList.appendChild(listItem)
    })
}

function postData(){
    const postTitle =document.getElementById('postTitle').value
    const postBody = document.getElementById('postBody').value

    if(postTitle.trim() == ''|| postBody.trim() == ''){
        alert('You should fill the textarea')
        return
    }

    fetch(urlBase,  {
        method: 'POST',
        body: JSON.stringify({
          title: postTitle,
          body: postBody,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(res => res.json())
        .then(data => {
            posts.push(data)
        });
}
