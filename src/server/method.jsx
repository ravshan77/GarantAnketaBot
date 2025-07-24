import { Axios } from "./axios";

export const POST = (url, data, met) => {
  return Axios({ url: url, method: "POST", data: { ...data } });
};

export const GET = (url, message) => {
  if (url) {   
    return Axios({ url: url, method: "GET", message: message });
  };
}

export const DELETE = (url, data) => {
  return Axios({ url, method: "DELETE", data});
};

export const PUT = (url, data) => {
  return Axios({ url, method: "PUT", data: data });
};
