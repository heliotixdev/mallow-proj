type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type RequestType = 'login' | 'userdetails' | 'add' | 'delete' | 'update';

interface User {
  id: string;
  [key: string]: any;
}

type RequestData = any;

interface APIResponse {
  [key: string]: any;
}

export default async function API(
  method: HttpMethod,
  requestType: RequestType,
  data?: RequestData
): Promise<APIResponse> {
  const APIPATH = "https://reqres.in/api";
  const APIKEY = "reqres-free-v1"; 

  let APIURL = '';

  if (requestType === 'login') {
    APIURL = '/login';
  } else if (requestType === 'userdetails' || requestType === 'add') {
    APIURL = '/users';
  } else if (requestType === 'delete') {
    APIURL = `/users/${data}`;
  } else if (requestType === 'update') {
    APIURL = `/users/${(data as User).id}`;
  } else {
    throw new Error('Invalid request type');
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-api-key': APIKEY || '',
  };

  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method,
    headers,
  };

  if (method === 'POST' || method === 'PUT') {
    options.body = JSON.stringify(data);
  }

  try {
    const res = await fetch(`${APIPATH}${APIURL}`, options);
    const resData = await res.json();
    return resData;
  } catch {
    return { error: 'Network error' };
  }
}

export {};
