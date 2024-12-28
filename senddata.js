import axios from "axios";

async function register() {
    const url = 'http://localhost:5678/api/users/register';
    const userData = {
        name: 'vedant singh',
		username: 'vedantsinggh',
        email: 'vedantsinggh@gmail.com',
		password: 'vedantmi',
    };

    try {
        const response = await axios.post(url, userData);
        console.log('Response from server:', response.data);
    } catch (error) {
        console.error('Error sending data:', error.message);
    }
}

async function login(email, password){
	const url = 'http://localhost:5678/api/users/login';
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

login("vedantsinggh@gmail.com", "vedantmi");
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzA0NmFiNTQzNTNhMjk3ZmQxYmRmOCIsImlhdCI6MTczNTQxMTM3MSwiZXhwIjoxNzM1NDE0OTcxfQ.YP__Imu341zP-mmSCToxv4RGQd_aUy8m5fEIp1KosgU

