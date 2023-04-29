import { useRouter } from "next/router";
import Link from "next/link";

const Tabs = ({ activeTab = "data" }) => {
  const router = useRouter();
  const { query } = router;

  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
      <li className="mr-2">
        <Link
          href={{
            pathname: "/",
            query: {
              ...query,
              tab: "data",
            },
          }}
          aria-current="page"
          className={`tab ${
            !activeTab || activeTab === "data" ? "active" : ""
          }`}
        >
          Data
        </Link>
      </li>
      <li className="mr-2">
        <Link
          href={{
            pathname: "/",
            query: {
              ...query,
              tab: "chart",
            },
          }}
          className={`tab ${activeTab === "chart" ? "active" : ""}`}
        >
          Chart
        </Link>
      </li>
      <li className="mr-2">
        <Link
          href={{
            pathname: "/",
            query: {
              ...query,
              tab: "regression",
            },
          }}
          className={`tab ${activeTab === "regression" ? "active" : ""}`}
        >
          Regression
        </Link>
      </li>
    </ul>
  );
};

export default Tabs;
