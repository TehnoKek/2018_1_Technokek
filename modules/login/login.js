(function(){
	class LoginForm {
		constructor(selector = 'body'){
			// прочитать что такое node-list
			this._el = document.getElementsByClassName(selector);
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
			if (!this._data){
				return;
			}
			const loginBlock = document.createElement('div');
			loginBlock.id = 'login';
			const form = document.createElement('form');
			form.classList.add('form-1');
			const labelLogin = document.createElement('label');
			labelLogin.for = 'email';
			labelLogin.classList.add('label');
			labelLogin.textContent = 'Email';
			const labelPassword = document.createElement('label');
			labelLogin.for = 'password';
			labelLogin.classList.add('label');
			labelLogin.textContent = 'Password';
			const passwordInput = document.createElement('input');
			passwordInput.type = 'password';
			passwordInput.id = 'password';
			passwordInput.name = 'password';
			passwordInput.placeholder = 'password';
			passwordInput.classList.add('field');
			const loginInput = document.createElement('input');
			passwordInput.type = 'text';
			passwordInput.id = 'email';
			passwordInput.name = 'login';
			passwordInput.placeholder = 'email';
			passwordInput.classList.add('field');
			const buttons = document.createElement('p');
			const buttonSubmit = document.createElement('button');
			buttonSubmit.classList.add('submit');
			buttonSubmit.type = 'submit';
			buttonSubmit.name = 'submit';
			buttonSubmit.textContent = 'Login';
			const refRegistration = document.createElement('a');
			refRegistration.href = '#';
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
	}

	renderDOM(){

	}

	renderString(){
		if (!this._data){
			return;
		}
		this._el.innerHtml = `
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

	window.ScoreboardComponent = ScoreboardComponent;
})();

//const data = ScoreboardComponents.data
// вызывается гетер\ сетер scrbComponentdata = 'safasfas'