const Mask = {
  apply(input, func) {
    setTimeout(function(){
        // = Mask.formatBRL, ou qualquer outra função dentro de Mask
        input.value = Mask[func](input.value) 
        //Após  1 ms, a função pega o value do input e executa a função formatBR
    }, 1)
  },
  formatBRL(value) {
    value = value.replace(/\D/g,"")

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency', //1.000.00
      currency: 'BRL'
    }).format(value/100)
  }
}

const PhotosUpload = {
  uploadLimit: 6,
  handleFileInput(event) {
    const { files: fileList } = event.target
    const { uploadLimit } = PhotosUpload

    if (fileList.length > uploadLimit) {
      alert(`Envie no máximo ${uploadLimit} fotos`)
      event.preventDefault()
      return
    }

    Array.from(fileList).forEach(file => {
      const reader = new FileReader()

      reader.onload = () => { //Quando o arquivo estiver pronto, executa a arrow function
        const image = new Image()
        image.src = String(reader.result)

        const div = document.createElement('div')
        div.classList.add('photo') //Adiciona a classe 'photo' na div

        div.onclick = () => alert('remover foto')

        div.appendChild(image)

        document.querySelector('#photos-preview').appendChild(div)
      }

      reader.readAsDataURL(file) // Quando carregado, executa a função onload
    })
  }
}
