function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const sandbox = async () => {
    // add(1, 2, logResult);

    // fetch('https://jsonplaceholder.typicode.com/posts')
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    //     .catch(error => console.error('Error:', error))

    // Fetch the post with ID 1
    console.log("Waiting 2 seconds then fetching post 1...")
    return delay(2000)
    .then(() => fetch('https://jsonplaceholder.typicode.com/posts/1'))
        .then(response => { return response.json(); })
        .then(postData => {
            console.log('Post:', postData);
            return postData;
        })
        // Then fetch its comments
        .then(post => fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`))
        .then(response => response.json())
        .then(comments => console.log('Comments:', comments))
        .catch(error => console.error('Error:', error))
}