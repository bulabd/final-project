import Pagination from "@material-ui/lab/Pagination"

export default function MyPagination(props) {
  return (
    <div>
      <Pagination count={props.numOfPages} />
    </div>
  );
}