import Pagination from "@material-ui/lab/Pagination"

export default function MyPagination(props) {
  return (
    <div>
    <Pagination 
        count={props.numOfPages}
        onChange={(event) => props.onChange(event.target.textContent)}
        page={Number(props.pageState)}
        color={'primary'}
     />
    </div>
  );
}