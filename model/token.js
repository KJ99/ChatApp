import Moment from 'moment'

export default class Token {
    constructor(data) {
        this._type = typeof data == 'object' && typeof data.tokenType == 'string' ? data.tokenType : ''
        this._content = typeof data == 'object' && typeof data.token == 'string' ? data.token : ''
        this._expires = typeof data == 'object' && typeof data.expires == 'number' ? data.expires : Date.now()
        this._expirationDate = new Moment(this._expires).format('YYYY-MM-DD hh:mm:ss')
        this._refresh = typeof data == 'object' && typeof data.refresh == 'string' ? data.refresh : ''
    }

    getType() {
        return this._type
    }

    getContent() {
        return this._content
    }

    getExpirationTime() {
        return this._expires
    }

    getExpirationDate() {
        return this._expirationDate
    }

    getToken() {
        return `${this._type} ${this._content}`
    }

    getRefresh() {
        return this._refresh
    }

    setContent(content) {
        if(typeof content == 'string') {
            this._content = content
        }
    }

    setExpiration(expiration) {
        if(typeof expiration == 'number') {
            this._expires = expiration
            this.setExpirationDate(new Moment(this._expires).format('YYYY-MM-DD hh:mm:ss'))
        }
    }

    setExpirationDate(date) {
        if(typeof date == 'string') {
            this._expirationDate = date
        }
    }

    setRefresh(refresh) {
        if(typeof refresh == 'string') {
            this._refresh = refresh
        }
    }

    isValid() {
        console.log('token validating')
        console.log(this._expires > Date.now())
        console.log('exp',this._expires)
        console.log('exp', new Moment(this._expires).format('YYYY-MM-DD hh:mm:ss'))
        console.log('now', Date.now())
        console.log('now', new Moment(Date.now()).format('YYYY-MM-DD hh:mm:ss'))
        console.log('/token validating')
        return this._type.length > 0 && this._content.length > 0 && this._expires > Date.now()
    }

    hasRefresh() {
        return this._content.length > 0 && this._refresh.length > 0
    }
}