//send photo to sever
export const sendPhoto = async (data, name) => {
  const formData = new FormData(); 
  formData.append('file', data);
  formData.append('name', name)
  let response = await fetch('http://localhost:4000/admin/api/send-photo', {
    method: 'POST',
    body: formData
  })
  return response.json()
}

//create name for every download photo
export const createPhotoName = (name) => {
  let date = new Date(); 
  let newName = name.replace(' ', '_');
  return `${newName}-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}.png`
}