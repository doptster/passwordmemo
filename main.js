var settings_hide = true;

function user_exist(){
	if(localStorage.getItem("main")){
	//user already exist
		//user login
		var login_button = "<button class='button' onclick='login()'>Log In</button>";
		document.getElementById("check").innerHTML = login_button;
		var pass = "<input id='pass' type=password />";
		document.getElementById("fill").innerHTML = "Password: "+pass;
	} else {
	//ask to create new user
		var new_user_html = "<button class='button' onclick='create_new()'>New User</button>";
		document.getElementById("check").innerHTML = new_user_html;
		var new_user_password = "<input id='new_p' type=password />";
		var confirm_password = "<input id='con_p' type=password />";
		document.getElementById("fill").innerHTML = "New password: "+new_user_password+"<br/>Confirm password: "+confirm_password;
	}
}
function create_new(){
	var new_password = document.getElementById("new_p").value;
	var con_password = document.getElementById("con_p").value;
	if(new_password.length == 0 || con_password.length == 0){
	//if one of the password field is empty
		alert("Please don't let new password or confirm password field empty.");
		return;
	} else if(new_password.length < 6){
	//if the password length is less than 6
		alert("New password must be at least 6 characters.");
		return;
	} else if(new_password != con_password){
	//if both of the password does not match
		alert("New password and Confirm password does not match.");
		return;
	} else {
	//new user creation successful
		localStorage.setItem("main", new_password);//local storage
		alert("New user creation successful! Try to log in now!");
		user_exist();//reload the user check function
	}
}
function login(){
	var password = document.getElementById("pass").value;
	var pass_local = localStorage.getItem("main");
	if(password.length == 0){
		alert("PLease fill something in the password field!");
	} else if(password != pass_local){
		alert("Password does not match!");
	} else {
	//Log in successful
		var new_com = "<button class='button' onclick='new_comb()'>New Combination</button>";
		document.getElementById("check").innerHTML = new_com;
		var new_form = "Username: <input id='username' type=text /><br/>Password: <input id='pass' type=password /><br/>Website (Unique): <input id='website' type=text />";
		document.getElementById("fill").innerHTML = new_form;
		new_form = "<button class='button' onclick='generate()'>Generator</button><button class='button' onclick='settings_toggle()'>Settings</button><br/><br/>";
		new_form += "<div id='settings_area' class='hidden'>";
		new_form += "Generated password <input id='result_pass' readonly><br/>"
		new_form += "Password length <input id='pass_length' type=text value='7' readonly/><br/>";
		new_form += "Lower case Alphabet length <input id='lower_case_id' type=text value='7' onkeyup='auto_pass_length();'/><br/>";
		new_form += "Upper case Alphabet length <input id='upper_case_id' type=text value='0' onkeyup='auto_pass_length();'/><br/>";
		new_form += "Number length <input id='number_id' type=text value='0' onkeyup='auto_pass_length();'/><br/>";
		new_form += "</div>";
		document.getElementById("generate").innerHTML = new_form;
		//display the 'secret'(password)
		display_info();
		
	}
}
function new_comb(){
	var username = document.getElementById("username").value;
	var password = document.getElementById("pass").value;
	var website = document.getElementById("website").value;
	if(username.length == 0 || password.length == 0 || website.length == 0){
		alert("Please don't let the form empty.");
	} else if(username.indexOf("+") >= 0){
	//note that the username cannot contain +, because we use + as the combination of the keyvalue, e.g. username+password
		alert("Your username cannot contain '+' character");
	} else {
	//not much restriction, we save the the new combination
		//how we save? website as key, username+password as key value
		localStorage.setItem(website, username+"+"+password);
		alert("New password combination saved successful!");
		display_info();
	}
}
function display_info(){
	var table_head = "<table><th>Username</th><th>Password</th><th>Website (Unique) </th>";
	var table_body = "";
	var table_end = "</table>";
	
	for(var i=0; i<localStorage.length; i++){
			var website = localStorage.key(i);
			var pos_of_plus = localStorage.getItem(website).indexOf('+');
			//the key value is made from username+'+'+pasword
			var username = localStorage.getItem(website).substr(0, pos_of_plus);
			var password = localStorage.getItem(website).substr(pos_of_plus+1);
		
			table_body = table_body + "<tr><td>"+username+"</td><td>"+password+"</td><td>"+website+"</td></tr>";
	}
	
	document.getElementById("secret").innerHTML = table_head + table_body + table_end;
}

function generate(){
	var generate_result = "";
	var pass_length = document.getElementById("pass_length").value;
	//check validation before start generation----
	if(Number(pass_length > 20)){
		alert("Password length is too long.");
	}
	if(!Number(pass_length)){
		alert("Invalid password length.");
	}
	//--------------------------------------------
	
	//gererator starts here
	for(var i = 0; i < Number(document.getElementById("lower_case_id").value); i++){
		generate_result += random_alphabet();
	}
	for(var i = 0; i < Number(document.getElementById("upper_case_id").value); i++){
		generate_result += random_alphabet().toUpperCase();
	}
	for(var i = 0; i < Number(document.getElementById("number_id").value); i++){
		generate_result += Math.floor(Math.random()*10);//random 0~9
	}
	//--------------------
	
	document.getElementById("pass").value = generate_result;
	document.getElementById("result_pass").value = generate_result;
}
function settings_toggle(){
	if(settings_hide){
		settings_hide = false;
		document.getElementById("settings_area").className = "";
	} else {
		settings_hide = true;
		document.getElementById("settings_area").className = "hidden";
	}
}
function auto_pass_length(){
	document.getElementById("pass_length").value = 
		Number(document.getElementById("lower_case_id").value) +
		Number(document.getElementById("upper_case_id").value) + 
		Number(document.getElementById("number_id").value);
}
function random_alphabet(){
	var rand = Math.floor(Math.random()*26);//0~25
	switch(rand){
	case 0:return 'a';
	case 1:return 'b';
	case 2:return 'c';
	case 3:return 'd';
	case 4:return 'e';
	case 5:return 'f';
	case 6:return 'g';
	case 7:return 'h';
	case 8:return 'i';
	case 9:return 'j';
	case 10:return 'k';
	case 11:return 'l';
	case 12:return 'm';
	case 13:return 'n';
	case 14:return 'o';
	case 15:return 'p';
	case 16:return 'q';
	case 17:return 'r';
	case 18:return 's';
	case 19:return 't';
	case 20:return 'u';
	case 21:return 'v';
	case 22:return 'w';
	case 23:return 'x';
	case 24:return 'y';
	case 25:return 'z';
	}
}