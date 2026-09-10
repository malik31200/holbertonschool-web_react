function CourseListRow({
    isHeader = false,
    textFirstCell = '',
    textSecondCell = null
}) {
    if (isHeader || textSecondCell === null) {
        return (
            <tr className="bg-[color:var(--color-table-header)]/66">
                <th
                    className="border border-gray-400 pl-2"
                    colSpan="2"
                >
                    {textFirstCell}
                </th>
            </tr>
        );
    }

    return (
        <tr className="bg-[color:var(--color-table-rows)]/45">
            <td className="border border-gray-400 pl-2">
                {textFirstCell}
            </td>
            <td className="border border-gray-400 pl-2">
                {textSecondCell}
            </td>
        </tr>
    );
}

export default CourseListRow;