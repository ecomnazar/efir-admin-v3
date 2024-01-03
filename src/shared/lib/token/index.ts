import Cookies from 'js-cookie'

export const saveToken = (token: string) => Cookies.set('access_token', token)

export const getToken = () => Cookies.get('access_token')

export const removeToken = () => Cookies.remove('access_token')