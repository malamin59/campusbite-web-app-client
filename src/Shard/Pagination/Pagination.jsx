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
    <div className="w-full overflow-x-auto">
      <table className="table w-full mt-6 text-sm">
        <thead className="bg-base-200">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="whitespace-nowrap">
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
            {actions && <th className="whitespace-nowrap">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {headers.map((header, j) => (
                <td key={j} className="whitespace-nowrap">
                  {row[header.key]}
                </td>
              ))}
              {actions && (
                <td className="flex flex-wrap gap-2 py-2">
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
