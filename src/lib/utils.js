module.exports = {
  age(timestamp) {
    const today = new Date()
    const birthDate = new Date(timestamp)

    let age = today.getFullYear() - birthDate.getFullYear()
    const month = today.getMonth() - birthDate.getMonth()

    // getDate = day 1 - 31 , getDay = day 0 - 6

    if ( month < 0 || month == 0  && today.getDate() <= birthDate()) {
      age = age - 1
    }

    return age
  },

  date(timestamp) {
    const date = new Date(timestamp)
    
    const year = date.getUTCFullYear()
    const month = `0${date.getUTCMonth() + 1}`.slice(-2)
    const day = `0${date.getUTCDate()}`.slice(-2)

    return {
      day,
      month,
      year,
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`,
      format: `${day}/${month}/${year}`
    }
  },
  formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency', //1.000.00
      currency: 'BRL'
    }).format(price/100)
  }
}