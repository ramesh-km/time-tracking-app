type TableHeaderProps = {};

function TableHeader(props: TableHeaderProps) {
  return (
    <thead>
      <tr>
        <th>Task</th>
        <th>Start Time</th>
        <th>End Time</th>
        <th>Duration</th>
        <th>Actions</th>
      </tr>
    </thead>
  );
}

export default TableHeader;
