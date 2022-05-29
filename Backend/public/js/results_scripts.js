
let goBtns = document.querySelectorAll('.go-btn');
let backBtns = document.querySelectorAll('.back-btn');

for (let i of goBtns) {
    if (document.addEventListener) {
        i.addEventListener("click", function () {
            if (document.querySelectorAll('.go-btn.effect').length == 0) {
                i.classList.add('effect');
            }
            else{
                i.classList.remove('effect');
            }
        });
    }
};

for (let i of backBtns) {
    if (document.addEventListener) {
        i.addEventListener("click", function () {
            if (document.querySelectorAll('.back-btn.effect').length == 0) {
                i.classList.add('effect');
            }
            else {
                i.classList.remove('effect');
            }
        });
    }
};

console.log(goEffect)


// resbtn = document.querySelectorAll('.res-btn');

// resbtn.addEventListener("click", function handleClick(event) {
//     event.target.setAttribute("name", "clicked")
//     console.log(event.target.class)
// });


// function clicked (event) {
//     event.target.setAttribute("name", "clicked")
//     console.log(event.target.class)
// }