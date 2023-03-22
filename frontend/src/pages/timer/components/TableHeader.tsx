type TableHeaderProps = {};

function TableHeader(props: TableHeaderProps) {
  const styles = {
    width: "10%",
  };
  return (
    <thead>
      <tr>
        <th>Task</th>
        <th style={styles}>Start Time</th>
        <th style={styles}>End Time</th>
        <th style={styles}>Duration</th>
        <th
          style={{
            ...styles,
            width: "20%",
          }}
        >
          Actions
        </th>
      </tr>
    </thead>
  );
}

export default TableHeader;
