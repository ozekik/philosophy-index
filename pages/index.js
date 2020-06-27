import Head from 'next/head';

import yaml from 'js-yaml';

export default function Home({ index }) {
  return (
    <div className="App relative min-h-screen">
      <Head>
        <title>私家版 哲学索引 (β)</title>
      </Head>

      <nav className="navbar flex px-6 py-4 border-b">
        <div className="flex items-center">
          <div>
            <a href="#">
              <span className="font-semibold text-xl">私家版 哲学索引 (β)</span>
            </a>
          </div>
        </div>
        <div className={`inline-block flex-grow flex items-center w-auto`}>
          <div className="flex-grow mt-3 mt-auto">
            <div className="max-w-lg"></div>
          </div>
          <div className="text-sm">
            <a
              href="https://github.com/ozekik/philosophy-index"
              className="block lg:inline-block lg:mt-0 mr-4 text-gray-600 hover:text-gray-800"
            >
              <svg
                style={{ width: '24px', height: '24px' }}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
                />
              </svg>
            </a>
          </div>
        </div>
      </nav>

      <main className="flex-col px-6 py-4">
        {index.map((person) => (
          <div className="mb-6">
            <div>
              <div className="inline-block text-lg font-semibold">
                {person.name}
              </div>
              <div className="inline-block ml-1 text-sm">
                {(person.names || []).join(' · ')}
              </div>
              {Array.isArray(person.range) && (
                <div className="inline-block ml-1 text-xs">
                  (c. {person.range.join(' – ')})
                </div>
              )}
            </div>
            {person.tags && (
              <div className="my-2 text-xs">
                {person.tags.map((tag) => (
                  <div className="inline-block px-2 py-1 mr-1 rounded-sm bg-gray-500 text-white font-medium">
                    {tag}
                  </div>
                ))}
              </div>
            )}
            {person.note && (
              <div
                className="mt-4 mb-4 text-sm"
                dangerouslySetInnerHTML={{ __html: person.note }}
              ></div>
            )}
            {person.links && (
              <div className="mt-4 text-xs">
                <ul className="list-disc list-inside">
                  {person.links.map((v) => (
                    <li>
                      <a href={v} className="text-blue-600" target="_blank">
                        {v}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </main>

      <style jsx>{``}</style>

      <style jsx global>{``}</style>
    </div>
  );
}

export async function getStaticProps() {
  const data = await fetch(`http://localhost:3000/index.yaml`).then((resp) =>
    resp.text(),
  );
  const index = yaml.safeLoad(data);
  return { props: { index } };
}
