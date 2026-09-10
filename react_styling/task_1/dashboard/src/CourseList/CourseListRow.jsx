function CourseListRow({
    isHeader = false, 
    textFirstCell = '', 
    textSecondCell = null
}) {
   if (isHeader) {
    return (
        <tr className="bg-[color:var(--color-table-header)]/66">
            {textSecondCell === null ? (
                <th className="border border-gray-400 pl-2" colSpan="2">
                    {textFirstCell}
                </th>
            ) : (
                <>
                    <th className="border border-gray-400 pl-2">
                        {textFirstCell}
                    </th>
                    <th className="border border-gray-400 pl-2">
                        {textSecondCell}
                    </th>
                </>
            )}
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
