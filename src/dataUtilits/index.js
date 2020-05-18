export const addComponent = async (data) => {
  const response = await fetch('http://localhost:4000/api/add/component', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return response.json();
} 