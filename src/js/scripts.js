document.addEventListener('DOMContentLoaded', function () {
  var elementsDisabled = document.querySelectorAll('.enable-on-load');
  var pageForms = document.getElementsByTagName('form');

  elementsDisabled.forEach(function (element) {
    element.removeAttribute('disabled');
  });

  for (var i = 0; i < pageForms.length; i++) {
    var form = pageForms[i];
    form.addEventListener('submit', handleFormRequest);
  }
});

document.addEventListener('scroll', function (event) {
  var body = document.body;
  var html = document.documentElement;
  var scrollTop = body.scrollTop || html.scrollTop;
  var windowHeight = window.outerHeight;
  var firstNav = document.querySelector('.first-nav');
  var minWidth = window.matchMedia("(min-width: 961px)")

  if (minWidth.matches) {
    if (scrollTop >= (windowHeight / 2)) {
      firstNav.classList.add('scrolling');
    } else {
      firstNav.classList.remove('scrolling');
    }
  }
});

function handleFormRequest(event) {
  event.preventDefault();
  
  var thisForm = this;
  var reqUrl = thisForm.getAttribute('action');
  var data = {};

  for (var i = 0; i < thisForm.elements.length; i ++) {
    var input = thisForm.elements[i];
    var inputName = input.getAttribute('name');
    
    if (inputName) {
      data[inputName] = input.value;
    }
  }

  doRequest({
    url: reqUrl,
    method: thisForm.getAttribute('method'),
    data: data,
    onProgress: function (progress) {
      setLoading(thisForm, progress.readyState);
    },
    onSuccess: function (response) {
      removeLoading(thisForm);
      
      if (response.status !== 200) {
        showMessage('error', 'Hubo un error al enviar los datos, por favor intenta más tarde.');
      } else {
        showMessage('success', 'Tus datos se han enviado correctamente. Nos comunicaremos a la brevedar.');
      }
    },
    onError: function (error) {
      removeLoading(thisForm);
      showMessage('error', 'Hubo un error al enviar los datos, por favor intenta más tarde.');
    }
  })
}

function doRequest(request) {
  if (!request.url) {
    throw 'Error in doRequest: [url] argument cannot be undefined or null';
  }

  if (!request.onSuccess) {
    throw 'Unhandled success response, this will couse an error before, fix it';
  }

  // fake url to test
  // request.url = 'https://aka-course-landing-web-beta.herokuapp.com' + request.url;
  
  var req = new XMLHttpRequest();

  req.onreadystatechange = function (state) {
    request.onProgress ? request.onProgress(state.target) : null;
  };
  
  req.onerror = function (error) {
    request.onError ? request.onError({ status: error.target.status, response: error.target.responseText }) : console.error('Error:', JSON.parse(error.target.responseText) || 'Empty response');
  };
  
  req.onload = function (response) {
    request.onSuccess({ status: response.target.status, response: JSON.parse(response.target.responseText) });
  };
  
  req.open(request.method || 'GET', request.url);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify(request.data));
}

function setLoading(form, progress) {
  var loadingLayout = form.querySelector('.loading-form');

  if (!loadingLayout) {
    form.style.position = 'relative';
    form.style.overflow = 'hidden';
  
    var loadingLayout = document.createElement('div');
        loadingLayout.classList.add('loading-form');
        loadingLayout.style.display = 'flex';
        loadingLayout.style.justifyContent = 'center';
        loadingLayout.style.alignItems = 'center';
        loadingLayout.style.position = 'absolute';
        loadingLayout.style.top = 0;
        loadingLayout.style.right = 0;
        loadingLayout.style.bottom = 0;
        loadingLayout.style.left = 0;
        loadingLayout.style.backgroundColor = 'rgba(255,255,255,.3)';
        loadingLayout.style.fontSize = '32px';
  
    var progressBar = document.createElement('div');
        progressBar.classList.add('progress');
        progressBar.style.position = 'absolute';
        progressBar.style.height = '10px';
        progressBar.style.width = ((100 / 4) * progress ) + '%';
        progressBar.style.top = 0;
        progressBar.style.left = 0;
        progressBar.style.backgroundColor = 'yellow';
  
    var progressText = document.createTextNode('Enviando...');
  
    loadingLayout.append(progressBar);
    loadingLayout.append(progressText);
    form.append(loadingLayout);
  } else {
    var progressBar = loadingLayout.querySelector('.progress');
        progressBar.style.width = ((100 / 4 )* progress ) + '%';
  }
}

function removeLoading(form) {
  var loadingLayout = form.querySelector('.loading-form');

  if (loadingLayout) {
    setTimeout(function () {
      loadingLayout.remove();
    }, 700);
  }
}

function showMessage(type, message) {
  var messageDiv = document.querySelector('floating-message');
  
  if (!messageDiv) {
    var body = document.body;
    var messageDiv = document.createElement('div');
        messageDiv.classList.add('floating-message');
        messageDiv.classList.add(type);

    var messageText = document.createTextNode(message);

    messageDiv.append(messageText);
    body.append(messageDiv);
  }

  setTimeout(function() {
    messageDiv.classList.add('visible');
  }, 500);

  setTimeout(function() {
    messageDiv.classList.remove('visible');
    messageDiv.addEventListener('transitionends', function () {
      console.log('REMOVE MESSAGE');
    })
  }, 3500);
}