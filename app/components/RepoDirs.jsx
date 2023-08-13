import Link from "next/link";

async function fetchRepoContents(name) {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const response = await fetch(
    `https://api.github.com/repos/RealThomasCat/${name}/contents`,
    {
      next: {
        revalidate: 60, //cash optimization
      },
    }
  );

  const contents = await response.json();
  return contents;
}

const RepoDirs = async ({ name }) => {
  const contents = await fetchRepoContents(name);

  const dirs = contents.filter((contents) => contents.type === "dir");

  return (
    <>
      <h3>Directorires</h3>
      <ul>
        {dirs.map((dir) => (
          <li key={dir.path}>
            <Link href={`/code/repos/${name}/${dir.path}`}>{dir.path}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default RepoDirs;
