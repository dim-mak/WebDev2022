const template_ah = document.createElement('template');

template_ah.innerHTML = `
<header>
<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12">
      <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container-fluid">
          <div class="navbar-brand logo-img">
            <a href="search.html">
              <img id="logo" src="assets/img/logo_light.png" alt="logo" />
            </a>
          </div>
          <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbar-collapse">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>

        <div class="collapse navbar-collapse" id="navbar-collapse">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active navbar-buttons" href="admin_search.html" role="button">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plane-departure"
                  width="50" height="50" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M15 12h5a2 2 0 0 1 0 4h-15l-3 -6h3l2 2h3l-2 -7h3z"
                    transform="rotate(-15 12 12) translate(0 -1)"></path>
                  <line x1="3" y1="21" x2="21" y2="21"></line>
                </svg>
                <p>Find user</p>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link active navbar-buttons" href="admin_add.html" role="button">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plane" width="50"
                  height="50" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2 -7h-4l-2 2h-3l2 -4l-2 -4h3l2 2h4l-2 -7h3z"></path>
                </svg>
                <p>Add user</p>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link active navbar-buttons" href="admin_update.html" role="button">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plane" width="50"
                  height="50" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2 -7h-4l-2 2h-3l2 -4l-2 -4h3l2 2h4l-2 -7h3z"></path>
                </svg>
                <p>Update user</p>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link active navbar-buttons" href="admin_delete.html" role="button">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plane-arrival"
                  width="50" height="50" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M15 12h5a2 2 0 0 1 0 4h-15l-3 -6h3l2 2h3l-2 -7h3z"
                    transform="rotate(15 12 12) translate(0 -1)"></path>
                  <line x1="3" y1="21" x2="21" y2="21"></line>
                </svg>
                <p>Delete user</p>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</div>
</header>
`

document.body.appendChild(template_ah.content)