import axios from 'axios'
import * as constants from '../shared/Constants'

export class CommonService {

    async registerUser(obj) {
        try {
            console.log('calling registerUser service...')
            let response = await axios({
                url: constants.BASE_URL + constants.REGISTER_URL,
                method: 'POST',
                headers: {
                    'Access-Control-Allow-origin': '*',
                    'Content-Type': 'application/json'
                },
                crossdomain: true,
                data: obj
            })
            return response.data
        } catch(err) {
            console.log(err)
        }       
    }

    async loginUser(obj) {
        try {
            console.log('calling loginUser service...')
            let response = await axios({
                url: constants.BASE_URL + constants.LOGIN_URL,
                method: 'POST',
                headers: {
                    'Access-Control-Allow-origin': '*',
                    'Content-Type': 'application/json'
                },
                crossdomain: true,
                data: obj
            })
            return response.data
        } catch(err) {
            console.log(err)
        }       
    }

    async changePwd(obj) {
        try {
            console.log('calling changePwd service...')
            let response = await axios({
                url: constants.BASE_URL + constants.RESET_URL,
                method: 'POST',
                headers: {
                    'Access-Control-Allow-origin': '*',
                    'Content-Type': 'application/json'
                },
                crossdomain: true,
                data: obj
            })
            return response.data
        } catch(err) {
            console.log(err)
        }       
    }

    async getResetPwdToken(email) {
        try {
            console.log('calling getResetPwdToken service...')
            let response = await axios({
                url: constants.BASE_URL + constants.RESET_URL + '?email=' + email,
                method: 'GET',
                headers: {
                    'Access-Control-Allow-origin': '*',
                    'Content-Type': 'application/json'
                },
                crossdomain: true
            })
            return response.data
        } catch(err) {
            console.log(err)
        }       
    }

    async verifyPwdToken(token) {
        try {
            console.log('calling verifyPwdToken service...')
            let response = await axios({
                url: constants.BASE_URL + constants.RESET_URL + '/' + token,
                method: 'GET',
                headers: {
                    'Access-Control-Allow-origin': '*',
                    'Content-Type': 'application/json'
                },
                crossdomain: true
            })
            return response.data
        } catch(err) {
            console.log(err)
        }       
    }

    async createJob(obj, token) {
        try {
            console.log('calling createJob service...')
            let response = await axios({
                url: constants.BASE_URL + constants.JOBS_URL,
                method: 'POST',
                headers: {
                    'Access-Control-Allow-origin': '*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                crossdomain: true,
                data: obj
            })
            return response.data
        } catch(err) {
            console.log(err)
        }       
    }

    async getJobById(id, token) {
        try {
            console.log('calling getJobById service...')
            let response = await axios({
                url: constants.BASE_URL + constants.JOBS_URL + '/' + id,
                method: 'GET',
                headers: {
                    'Access-Control-Allow-origin': '*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                crossdomain: true
            })
            return response.data
        } catch(err) {
            console.log(err)
        }       
    }

    async getAllJobs(token) {
        try {
            console.log('calling getAllJobs service...')
            let response = await axios({
                url: constants.BASE_URL + constants.JOBS_URL,
                method: 'GET',
                headers: {
                    'Access-Control-Allow-origin': '*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                crossdomain: true
            })
            return response.data
        } catch(err) {
            console.log(err)
        }       
    }

    async createCandJob(obj) {
        try {
            console.log('calling createCandJob service...')
            let response = await axios({
                url: constants.BASE_URL + constants.CAND_JOB_URL,
                method: 'POST',
                headers: {
                    'Access-Control-Allow-origin': '*',
                    'Content-Type': 'application/json'
                },
                crossdomain: true,
                data: obj
            })
            return response.data
        } catch(err) {
            console.log(err)
        }       
    }

    async getAvailableJobs() {
        try {
            console.log('calling getAvailableJobs service...')
            let response = await axios({
                url: constants.BASE_URL + constants.CAND_JOB_URL,
                method: 'GET',
                headers: {
                    'Access-Control-Allow-origin': '*',
                    'Content-Type': 'application/json'
                },
                crossdomain: true
            })
            return response.data
        } catch(err) {
            console.log(err)
        }       
    }

    async getAlreadyAppliedJobs() {
        try {
            console.log('calling getAlreadyAppliedJobs service...')
            let response = await axios({
                url: constants.BASE_URL + constants.ALREADY_CAND_JOB_URL,
                method: 'GET',
                headers: {
                    'Access-Control-Allow-origin': '*',
                    'Content-Type': 'application/json'
                },
                crossdomain: true
            })
            return response.data
        } catch(err) {
            console.log(err)
        }       
    }

    async getPostedJobs() {
        try {
            console.log('calling getPostedJobs service...')
            let response = await axios({
                url: constants.BASE_URL + constants.RECT_JOB_URL,
                method: 'GET',
                headers: {
                    'Access-Control-Allow-origin': '*',
                    'Content-Type': 'application/json'
                },
                crossdomain: true
            })
            return response.data
        } catch(err) {
            console.log(err)
        }       
    }

    async getJobCandById(id) {
        try {
            console.log('calling getPostedJobs service...')
            let response = await axios({
                url: constants.BASE_URL + constants.RECT_JOB_URL + '/' + id,
                method: 'GET',
                headers: {
                    'Access-Control-Allow-origin': '*',
                    'Content-Type': 'application/json'
                },
                crossdomain: true
            })
            return response.data
        } catch(err) {
            console.log(err)
        }       
    }

}