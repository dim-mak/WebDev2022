function checkPassword() {
    const pswd = document.querySelector('#reg_pswd').value;
    const pswdConf = document.querySelector('#reg_pswd_conf').value;

    if (pswd != pswdConf) {
        alert("Passwords are not the same");
    } else {
        const isValidLength = /^.{8,16}$/;
        if (!isValidLength.test(pswd)) {
            alert("Password must contain from 8 to 16 characters");
        } else {
            const isContainsUppercase = /^(?=.*[A-Z])/;
			const isContainsLowercase = /^(?=.*[a-z])/;
            if (!isContainsUppercase.test(pswd) || !isContainsLowercase.test(pswd)) {
                alert("Password must contain at least one letter");
			} else {
				const isContainsNumber = /^(?=.*[0-9])/;
				if (!isContainsNumber.test(pswd)) {
					alert("Password must contain at least one digit");
                }
            }
        }
    }

};