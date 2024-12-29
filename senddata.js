import axios from "axios";

const userid = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzA2NDU4YzVkNjkyZGViNmFhNzQzOSIsImlhdCI6MTczNTQxODk2OCwiZXhwIjoxODIxODE4OTY4fQ.9a5H-U9tTH0wWS9vONHTDk6QiIQhnfiHQ-Nkb3LwrAE"

async function register(name, username, email, password) {
    const url = 'http://localhost:5678/api/auth/register';
    const userData = {
        name: name,
		username: username,
        email: email,
		password: password,
		group: [],
		tasks: [],
    };

    try {
        const response = await axios.post(url, userData);
        console.log('Response from server:', response.data);
    } catch (error) {
        console.error('Error sending data:', error.message);
    }
}

async function login(email, password){
	const url = 'http://localhost:5678/api/auth/login';
	const data = {
		email: email,
		password: password,
	};

    try {
        const response = await axios.post(url, data);
        console.log('Response from server:', response.data);
    } catch (error) {
        console.error('Error sending data:', error.message);
    }
}

async function addTask(title, subt, priority, due, repeatition, userid) {
    const url = 'http://localhost:5678/api/task/create';

    const task = {
        title: title,
        subtitle: subt, 
        priority: priority,
        due: due,
        repeatition: repeatition,
    };

    const headers = {
        Authorization: "Bearer " + userid  
    };

    try {
        const response = await axios.post(url, task, { headers });  
        console.log('Response from server:', response.data);
    } catch (error) {
        console.error('Error sending data:', error.message);
    }
}


async function deleteTask(id, userid){

    const url = 'http://localhost:5678/api/task/delete';

	const data = {
		taskid: id
	}

    const headers = {
        Authorization: "Bearer " + userid  
    };

    try {
        const response = await axios.post(url, data, { headers });  
        console.log('Response from server:', response.data);
    } catch (error) {
        console.error('Error sending data:', error.message);
    }
}

//addTask( "This is new task title", "this is new long subtitle", "high", "30 Dec 2024", "week", userid)
deleteTask("4457696", userid)
