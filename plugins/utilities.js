import Vue from 'vue'
import moment from 'moment'

Vue.mixin({
  methods: {
    /**
     * @function dateTimeFullFormat : sebuah function untuk membuat format tanggal DD MMMM YYYY HH:mm:ss
     * @param {string} date : tanggal dengan format 01/01/1990 atau 01-01-1990 00:00:00
     * @success : akan memunculkan format tanggal 01 January 1990 00:00:00
     * @fail : akan memunculkan teks strip '-'
     */
    dateTimeFullFormat(date) {
      return date ? moment(date).format('DD MMMM YYYY HH:mm:ss') : '-'
    },
    /**
     * @function dateFormat : sebuah function untuk membuat format tanggal DD MMMM YYYY
     * @param {string} date : tanggal dengan format 01/01/1990 atau 01-01-1990
     * @success : akan memunculkan format tanggal 01 January 1990
     * @fail : akan memunculkan teks strip '-'
     */
     dateFormat(date) {
      return date ? moment(date).format('DD MMMM YYYY') : '-'
    },
    /**
     * @function timeFormat : sebuah function untuk membuat format waktu HH:MM
     * @param {string} date : tanggal dengan format 01/01/1990 atau 01-01-1990
     * @success : akan memunculkan format 10:00
     * @fail : akan memunculkan teks strip '-'
     */
    //  timeFormat(date) {
    //   return date ? moment(date).format('HH:MM') : '-'
    // },
    /**
     * @function currencyFormat : sebuah function untuk membuat format nominal dengan separator comma (,)
     * @param {number} nominal : numeric atau string seperti 100000 atau '100000'
     * @success : akan memunculkan format nominal dengan 100.000
     * @fail : akan memunculkan teks kosong ''
     */
    currencyFormat(nominal) {
      const nom = parseInt(nominal, 10)
      if (!!nom || nom === 0) {
        const numberNom = nom
        return numberNom
          .toFixed(0)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
          .replace(/\./g, ',')
          .toString()
      }
      return ''
    },
    /**
     * @function isNumber : sebuah function untuk memvalidasi apakah pengguna mengetik angka atau tidak
     * @param {event} event : event keyboard
     * @success : akan memunculkan inputan angka saja, selain angka tidak akan ter-input
     * @fail : selain angka dianggap bukan inputan
     */
    isNumber(event) {
      const evt = event || window.event
      const charCode = evt.which ? evt.which : evt.keyCode
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault()
      }
      return true
    },
    /**
     * @function isNumberWithoutZero : sebuah function untuk memvalidasi apakah pengguna mengetik angka kecuali 0 atau tidak
     * @param {event} event : event keyboard
     * @success : akan memunculkan inputan angka saja, selain angka tidak akan ter-input, dan input 0 juga tidak terbaca
     * @fail : selain angka kecuali 0 dianggap bukan inputan
     */
    isNumberWithoutZero(event) {
      const evt = event || window.event
      const charCode = evt.which ? evt.which : evt.keyCode
      const targetValue = evt.target.value
      if (targetValue.length === 0 && charCode === 48) {
        evt.preventDefault()
      }
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault()
      }
      return true
    },
    /**
     * @function convertPhoneNumber : sebuah function untuk handling nomor telepon
     * @param {string} phone : angka atau string
     * @success : akan menampilkan apapun menjadi +62xxxxx, jika user menginput 0, 8, maupun 62
     * @fail : handling gagal dengan hasil null
     */
    convertPhoneNumber(phone) {
      let phoneNumber = phone.toString()
      if (phoneNumber.startsWith('08')) {
        const newphone = phoneNumber.substring(1)
        phoneNumber = `+62${newphone}`
        return phoneNumber
      }
      if (phoneNumber.startsWith('8')) {
        phoneNumber = `+62${phoneNumber}`
        return phoneNumber
      }
      if (phoneNumber.startsWith('62')) {
        const newphone = phoneNumber.replace(/[^0-9\\.]+/g, '')
        const numPhone = newphone.replace('62', '+62')
        phoneNumber = numPhone
        return phoneNumber
      }
      return null
    },
    /**
     * @function dontAllowSpace : sebuah function untuk tidak memperbolehkan menggunakan spasi
     * @param {event} event : event keyboard
     * @success : saat user mencoba menekan spasi tidak akan bisa
     * @fail : saat user mencoba menekan spasi ternyata bisa
     */
    dontAllowSpace(event) {
      const evt = event || window.event
      const charCode = evt.which ? evt.which : evt.keyCode
      if (charCode === 32) {
        evt.preventDefault()
      }
      return true
    },
    /**
     * @function convertPhoneNumberWithoutZero : sebuah function untuk handling nomor telepon
     * @param {string} phone : angka atau string
     * @success : akan menampilkan apapun menjadi 8xxxxx, jika user menginput 0, maupun 62
     * @fail : handling gagal dengan hasil null
     */
    convertPhoneNumberWithoutZero(phone) {
      let phoneNumber = phone.toString()
      if (phoneNumber.startsWith('08')) {
        const newphone = phoneNumber.substring(1)
        phoneNumber = newphone
        return phoneNumber
      }
      if (phoneNumber.startsWith('62')) {
        const newphone = phoneNumber.substring(2)
        phoneNumber = newphone
        return phoneNumber
      }
      return null
    },
    /**
     * @function convertPhoneNumberWithoutPlus : sebuah function untuk handling nomor telepon
     * @param {string} phone : angka atau string
     * @success : akan menampilkan apapun menjadi 62xxxxx, jika user menginput 0, 8
     * @fail : handling gagal dengan hasil null
     */
    convertPhoneNumberWithoutPlus(phone) {
      let phoneNumber = phone.toString()
      if (phoneNumber.startsWith('08')) {
        const newphone = phoneNumber.substring(1)
        phoneNumber = `62${newphone}`
        return phoneNumber
      }
      if (phoneNumber.startsWith('8')) {
        phoneNumber = `62${phoneNumber}`
        return phoneNumber
      }
      return null
    },
    /**
     * @function convertPhoneNumberFirstZero : sebuah function untuk handling nomor telepon
     * @param {string} phone : angka atau string
     * @success : akan menampilkan apapun menjadi 08xxxxx, jika user menginput 8, 62, +62
     * @fail : handling gagal dengan hasil null
     */
    convertPhoneNumberFirstZero(phone) {
      let phoneNumber = phone.toString()
      if (phoneNumber.startsWith('8')) {
        phoneNumber = `0${phoneNumber}`
        return phoneNumber
      }
      if (phoneNumber.startsWith('62')) {
        const newphone = phoneNumber.replace(/[^0-9\\.]+/g, '')
        const numPhone = newphone.replace('62', '0')
        phoneNumber = numPhone
        return phoneNumber
      }
      return phone
    },
  },
})
