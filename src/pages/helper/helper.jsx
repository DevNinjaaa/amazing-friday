
export const getUesrInfo = function getUserInfo(token){

    
    axios.get('http://localhost:5112/api/Auth/user-info', {
        headers: {
            'Authorization': `Bearer ${token}`, 
        }
    })
    .then(response => {
        console.log('Data received from API:', response.data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}