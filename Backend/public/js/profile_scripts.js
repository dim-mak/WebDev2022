const fname = document.querySelector('#prof_first');
const lname = document.querySelector('#prof_last');
const email = document.querySelector('#prof_email');
const sex = document.querySelector('#prof_sex');
const str = document.querySelector('#prof_str');
const num = document.querySelector('#prof_num');
const city = document.querySelector('#prof_city');
const state = document.querySelector('#prof_state');
const taxcode = document.querySelector('#prof_taxcode');
const country = document.querySelector('#prof_country');
const btn_edit = document.querySelector('#prof_btn_edit');
const btn_save = document.querySelector('#prof_btn_save');

btn_edit.classList.remove("hide");
btn_save.classList.add("hide");

function saveProfile() {
    fname.disabled = true;
    lname.disabled = true;
    email.disabled = true;
    sex.disabled = true;
    str.disabled = true;
    num.disabled = true;
    city.disabled = true;
    state.disabled = true;
    taxcode.disabled = true;
    country.disabled = true;

    btn_edit.classList.remove("hide");
    btn_save.classList.add("hide");
}


function editProfile() {
    fname.disabled = false;
    lname.disabled = false;
    sex.disabled = false;
    str.disabled = false
    num.disabled = false
    city.disabled = false;
    state.disabled = false;
    taxcode.disabled = false;
    country.disabled = false;

    btn_edit.classList.add("hide");
    btn_save.classList.remove("hide");
}