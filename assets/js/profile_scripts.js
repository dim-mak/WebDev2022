var fname = document.getElementById('prof_first');
var lname = document.getElementById('prof_last');
var email = document.getElementById('prof_email');
var sex = document.getElementById('prof_sex');
var str = document.getElementById('prof_str');
var num = document.getElementById('prof_num');
var city = document.getElementById('prof_city');
var state = document.getElementById('prof_state');
var taxcode = document.getElementById('prof_taxcode');
var country = document.getElementById('prof_country');
var btn_edit = document.getElementById('prof_btn_edit');
var btn_save = document.getElementById('prof_btn_save');

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
    email.disabled = false;
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