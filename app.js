async function carregarDados() {
    const url = 'http://localhost:3000/fotos'
    const response = await fetch(url)
    const data = await response.json()
    return data
  }
  
  async function carregarImagensEDados() {
    const dados = await carregarDados()
  
    const carousel = document.getElementById('carousel')
    const indicators = document.getElementById('indicators')
    const prevBtn = document.getElementById('prevBtn')
    const nextBtn = document.getElementById('nextBtn')
  
    let currentIndex = 0
  
    // Limpa qualquer conteúdo anterior
    carousel.innerHTML = ''
    indicators.innerHTML = ''
  
    // Cria os slides e indicadores
    dados.forEach((item, index) => {
      // Slide
      const slide = document.createElement('div')
      slide.classList.add('carousel-item')
      if (index !== 0) {
        slide.style.display = 'none'
      }
  
      const img = document.createElement('img')
      img.src = item.imagem
      img.alt = item.legenda || 'Foto'
  
      const overlay = document.createElement('div')
      overlay.classList.add('overlay')
  
      const legenda = document.createElement('h3')
      legenda.textContent = item.legenda
  
      const data = document.createElement('p')
      data.textContent = item.data
  
      overlay.appendChild(legenda)
      overlay.appendChild(data)
      slide.appendChild(img)
      slide.appendChild(overlay)
      carousel.appendChild(slide)
  
      // Indicador
      const indicador = document.createElement('button')
      indicador.classList.add('indicator')
      if (index === 0) indicador.classList.add('active')
      indicador.addEventListener('click', () => {
        mostrarSlide(index)
      })
      indicators.appendChild(indicador)
    })
  
    const slides = Array.from(document.getElementsByClassName('carousel-item'))
    const indicadores = Array.from(document.getElementsByClassName('indicator'))
  
    function mostrarSlide(index) {
      slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none'
      })
      indicadores.forEach((dot, i) => {
        dot.classList.toggle('active', i === index)
      })
      currentIndex = index
    }
  
    prevBtn.addEventListener('click', () => {
      const newIndex = (currentIndex - 1 + slides.length) % slides.length
      mostrarSlide(newIndex)
    })
  
    nextBtn.addEventListener('click', () => {
      const newIndex = (currentIndex + 1) % slides.length
      mostrarSlide(newIndex)
    })
  }
  
  carregarImagensEDados()
  