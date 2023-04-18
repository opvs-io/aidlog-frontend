import supabase from '@/configs/supabase';
import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:5000',
});

http.interceptors.request.use(
  async (config) => {
    console.log(1);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }

    return config;
  },
  (error) => {
    if (error) {
      return Promise.reject(error);
    }

    return Promise.resolve();
  },
);

export default http;
