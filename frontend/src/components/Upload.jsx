/**************************************************************************************
 *  Goal: Input de upload de imagem
 *  Author: Luiz Gustavo
 *  Date: 20/01/2023
 *  Version: 1.0
 **************************************************************************************/

function UploadPhotoUser({value, onChange}) {

  function mudarFoto(e) {

    const inputFile = e.target

    const pictureImage = document.querySelector(".picture__image")

    const file = inputFile.files[0]

    
    if (file) {
      onChange(file)
      const img = document.createElement("img")

      img.src = URL.createObjectURL(file)

      img.classList.add("picture__img")

      pictureImage.textContent = ""
      pictureImage.appendChild(img)

    } else {
      const img = document.createElement("img");

      img.src = require('../assets/add-photo.png')
      img.alt = "icone de adicionar foto"
      img.classList.add("add-photo-icon")

      pictureImage.textContent = ""
      pictureImage.appendChild(img)
    }
  }

  return (
    <div className="uploadContainer">
      <label className="picture" htmlFor="picture__input" tabIndex="0">
        <span className="picture__image">
          <img src={require('../assets/add-photo.png')} alt="icone de adicionar foto" className='add-photo-icon' />
        </span>
      </label>
      <input type="file" onChange={mudarFoto} value={value} name="picture__input" id="picture__input"></input>
    </div>
  );
}

export default UploadPhotoUser;