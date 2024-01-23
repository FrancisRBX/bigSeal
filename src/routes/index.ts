


// fetch('https://jsonplaceholder.typicode.com/todos/1', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         name: 'User 1'
//     })
// }).then(res => {
//     if (res.ok) {
//         console.log("success");
//     } else {
//         console.log("not successful");
//     }
// })
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

fetch('https://users.roblox.com/v1/users/210276149', {
    method: 'GET'
})
.then(res => res.json())
.then(data => console.log(data))

export async function getPlaceAvailability(placeID : number){

    let response = await fetch('https://games.roblox.com/v1/games/multiget-place-details?placeIds=' + placeID)

}