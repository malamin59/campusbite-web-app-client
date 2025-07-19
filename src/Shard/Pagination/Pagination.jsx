import PropTypes from "prop-types";

const Pagination = ({
  headers,
  rows,
  actions,
  page,
  total,
  setPage,
  onSort,
}) => {
  return (
    // 1. Wrapping div allows horizontal scroll but prevent page scroll
    <div
      className="w-full overflow-x-auto"
      style={{ maxWidth: "100vw" }} // prevent div expanding beyond viewport
    >
      <table className="table w-full min-w-[700px] mt-6 text-sm">
        <thead className="bg-base-200">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="whitespace-nowrap max-w-[200px] truncate"
                title={header.label} // tooltip for truncated headers
              >
                {header.sortKey ? (
                  <button
                    onClick={() => onSort(header.sortKey)}
                    className="font-bold hover:underline"
                  >
                    {header.label}
                  </button>
                ) : (
                  header.label
                )}
              </th>
            ))}
            {actions && (
              <th className="whitespace-nowrap max-w-[200px] truncate" title="Actions">
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {headers.map((header, j) => (
                <td
                  key={j}
                  className="whitespace-nowrap max-w-[200px] truncate"
                  title={row[header.key]}
                >
                  {row[header.key]}
                </td>
              ))}
              {actions && (
                <td className="flex flex-wrap gap-2 py-2 max-w-[200px] truncate" title="Actions">
                  {actions(row).map((actionBtn, k) => (
                    <span key={k}>{actionBtn}</span>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex flex-wrap justify-center mt-4 gap-2">
        {Array.from({ length: Math.ceil(total / 10) }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`btn btn-sm ${
              page === i + 1 ? "btn-info" : "btn-outline"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

Pagination.propTypes = {
  headers: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  actions: PropTypes.func,
  page: PropTypes.number,
  total: PropTypes.number,
  setPage: PropTypes.func,
  onSort: PropTypes.func,
};

export default Pagination;
