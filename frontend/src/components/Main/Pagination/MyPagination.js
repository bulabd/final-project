// import Pagination from "@material-ui/lab/Pagination"
const Pagination = () => {
  return <h1>Help</h1>
}

export default function MyPagination(props) {
  return (
    <div>
      <Pagination 
        count={props.numOfPages}
        onChange={(event) => props.onChange(event.target.textContent)}
        page={Number(props.pageState)}
      />
    </div>
  );
}