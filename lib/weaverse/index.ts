const weaverseHost = process.env.WEAVERSE_HOST;
const endpoint = `${weaverseHost}/api/public/project`;
const weaverseProjectId = process.env.WEAVERSE_PROJECT_ID;
export async function weaverseFetch<T>({
  cache = 'force-cache',
  headers,
  body
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  body: any;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'X-Shopify-Storefront-Access-Token': key,
        ...headers
      },
      body: JSON.stringify(body),
      cache
    });

    const res = await result.json();

    if (res.errors) {
      throw res.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    throw {
      error: e,
      body
    };
  }
}

export async function getWeaverseProject({
  type,
  locale = 'en-us',
  handle
}: {
  type: string;
  locale?: string;
  handle: string;
}) {
  const res = await weaverseFetch({
    body: {
      projectId: weaverseProjectId,
      type,
      locale,
      handle
    }
  } as any);

  return res.body;
}
