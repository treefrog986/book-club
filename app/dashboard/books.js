import { getBooks } from "../lib/server";
import Grid from "@mui/system/Unstable_Grid/Grid";
import { ViewBookButton } from "../styles";
export default async function Books({id}){
    console.log(id)
    const res = await getBooks(id)
    console.log(res)
    return(<>
    {res.map(book=>
          <Grid key={book.id} item xs={4}>
              <p>{book.title}</p>
              <p style={{color:"gray", fontSize:".8em"}}>By {book.author}</p>
              <ViewBookButton onClick={()=>route.push(`/dashboard/${book.id}`)}>View Book</ViewBookButton>
          </Grid>
        )}
    </>)
}