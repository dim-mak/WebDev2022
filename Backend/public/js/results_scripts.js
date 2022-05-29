// document.addEventListener('click', function handleClick(event) {
//     event.target.classList.add('.effect');
// });

btn = document.querySelector('.res-btn');

btn.addEventListener("click", function handleClick(event) {
    event.target.classList.add('.effect');
});


resbtn = document.querySelectorAll('.res-btn');

resbtn.addEventListener("click", function handleClick(event) {
    event.target.setAttribute("name", "clicked")
    console.log(event.target.class)
});


function clicked (event) {
    event.target.setAttribute("name", "clicked")
    console.log(event.target.class)
}