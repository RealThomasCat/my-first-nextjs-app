import Link from "next/link";
import { FaStar, FaCodeBranch, FaEye } from "react-icons/fa";

async function fetchRepos() {
  const response = await fetch(
    "https://api.github.com/users/RealThomasCat/repos",
    {
      next: {
        revalidate: 60, //cash optimization
      },
    }
  );

  //wait one second
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const repos = await response.json();
  return repos;
}

const ReposPage = async () => {
  const repos = await fetchRepos();
  // console.log(repos);

  return (
    <div className="repos-container">
      <ul className="repo-list">
        {repos.map((repo) => (
          <li key={repo.id}>
            <Link href={`/code/repos/${repo.name}`}>
              <h3>{repo.name}</h3>
              <p>{repo.description}</p>
              <div className="repo-details">
                <span>
                  <FaStar /> {repo.stargazers_count}
                </span>
                <span>
                  <FaCodeBranch /> {repo.forks_count}
                </span>
                <span>
                  <FaEye /> {repo.watchers_count}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReposPage;
