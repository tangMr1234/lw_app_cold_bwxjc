import axios from 'axios';

//Message.vue获取报警消息
export const getMessage = params => { return axios.get('http://services.pujiajia.com/message', params).then(res => res.data); };
