const template_af = document.createElement('template');

template_af.innerHTML = `
    <footer>
        <div class="col" id="logo-img" style="justify-content: center; padding: 2% 0%">
            <img id="logo" src="assets/img/logo_light.png" alt="logo" />
        </div>

        <div class="footer-copyright text-center py-2">© 2022 Copyright:
            <a id="company_name" href="search.html"> AirSky.com</a>
        </div>
    </footer>
`

document.body.appendChild(template_af.content)