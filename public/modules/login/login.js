(function(){
	class LoginForm {
		constructor(selector = 'login') {
			console.log('сработал конструктор');
			this._el = document.getElementsByClassName(selector)[0];
		}

		get data() {
			return this._data;
		}

		set data( data = ''){
			this._data = data;
		}

		clear(){
			this._el.innerHtml = '';
		}

		render(){
			console.log(this._el);
			const loginBlock = document.createElement('div');
			loginBlock.id = 'login';

			const form = document.createElement('form');
			form.classList.add('form-1');

			const labelLogin = document.createElement('label');
			labelLogin.setAttribute('for', 'email');
			labelLogin.classList.add('label');
			labelLogin.textContent = 'Email';

			const labelPassword = document.createElement('label');
			labelPassword.setAttribute('for', 'password');
			labelPassword.classList.add('label');
			labelPassword.textContent = 'Password';

			const passwordInput = document.createElement('input');
			passwordInput.setAttribute('type', 'password');
			passwordInput.setAttribute('id', 'password');
			passwordInput.setAttribute('name', 'password');
			passwordInput.setAttribute('placeholder', 'password');
			passwordInput.classList.add('field');

			const loginInput = document.createElement('input');
			loginInput.setAttribute('type', 'text');
			loginInput.setAttribute('id', 'email');
			loginInput.setAttribute('name', 'login');
			loginInput.setAttribute('placeholder', 'email');
			loginInput.classList.add('field');

			const buttons = document.createElement('p');
			const buttonSubmit = document.createElement('button');

			buttonSubmit.classList.add('submit');
			buttonSubmit.setAttribute('type', 'submit');
			buttonSubmit.setAttribute('name', 'submit');
			buttonSubmit.textContent = 'Login';

			const refRegistration = document.createElement('a');
			refRegistration.setAttribute('href', '#');
			refRegistration.classList.add('Registration');
			refRegistration.textContent = 'Registration';
			
			buttons.appendChild(buttonSubmit);
			buttons.appendChild(refRegistration);
			form.appendChild(labelLogin);
			form.appendChild(loginInput);
			form.appendChild(labelPassword);
			form.appendChild(passwordInput);
			form.appendChild(buttons);
			loginBlock.appendChild(form);

			this._el.appendChild(loginBlock);
		}

		renderDOM(){

		}

		renderString(){
			this._el.innerHTML = `
				<div id="login">
					<form class="form-1">
						<label for="email" class="label"> Email </label>
						<input type="text" id="email" class="field" name="login" placeholder="email">
						<label for="password" class="label"> Password </label>
						<input type="password" id="password" class="field" name="password" placeholder="password">      
						<p>
							<button class="submit" type="submit" name="submit"> Login </button>
							<a href="#" class="Registration">Registration</a>
						</p>
					</form>
				</div>

			`;
		}
		
	}
	window.LoginForm = LoginForm;
})();