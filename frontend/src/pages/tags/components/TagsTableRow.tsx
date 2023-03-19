import { Tag, TagWithCount } from "../../../types/tags";
import TagActions from "./TagActions";

type TagsTableRowProps = {
  tag: TagWithCount;
};

function TagsTableRow(props: TagsTableRowProps) {
  return (
    <tr>
      <td>{props.tag.name}</td>
      <td>{props.tag.count}</td>
      <td>
        <TagActions tag={props.tag} />
      </td>
    </tr>
  );
}

export default TagsTableRow;
