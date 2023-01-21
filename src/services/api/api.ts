import axios, { isCancel } from "axios";
import { OutgoingHttpHeaders } from "http2";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type MockType = boolean | string;

type AxiosOpts = {
  url: string;
  method: Method;
  headers?: OutgoingHttpHeaders;
  params?: Record<string, number | string>;
  data?: unknown;
  timeout?: number;
};

type APIArgs = Partial<Omit<AxiosOpts & { mock: MockType }, "url" | "method">>;

const defaultHeaders: OutgoingHttpHeaders = {
  "Content-Type": "application/json",
};

const getHTTPHeaders = (headers: OutgoingHttpHeaders) => {
  const result = { ...defaultHeaders, ...headers };

  return Object.keys(result).reduce((accum: OutgoingHttpHeaders, val) => {
    if (result[val]) accum[val] = result[val];

    return accum;
  }, {});
};

const makeRequest = async ({
  url,
  method = "GET",
  headers = {},
  params = {},
  data,
  mock = false,
  timeout = 0,
}: AxiosOpts & { mock?: MockType }) => {
  if (mock) return require(`../../assets/mocks/${mock}`);
  try {
    const opts: AxiosOpts = {
      method,
      headers: getHTTPHeaders({ ...headers }),
      url,
      params,
      timeout,
    };
    if (data) {
      opts.data = data;
    }
    const res = await axios(opts);

    return res.data;
  } catch (e) {
    if (isCancel(e)) return null;
    throw e;
  }
};

const get = async (url: string, opts: APIArgs) =>
  await makeRequest({ ...opts, url, method: "GET" });

const post = async (url: string, opts: APIArgs) =>
  await makeRequest({ ...opts, url, method: "POST" });

const put = async (url: string, opts: APIArgs) =>
  await makeRequest({ ...opts, url, method: "PUT" });

const patch = async (url: string, opts: APIArgs) =>
  await makeRequest({ ...opts, url, method: "PATCH" });

const remove = async (url: string, opts: APIArgs) =>
  await makeRequest({ ...opts, url, method: "DELETE" });

export { get, post, put, patch, remove };
