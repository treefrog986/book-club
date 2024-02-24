import { Button, DialogContent, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { styled } from "@mui/system";

export const Title = styled(DialogContent)(
    {
    backgroundColor:' rgb(96, 180, 223)',
    color:'white'
  }
  );
  
  export const SignInButton = styled(Button)(
  {
    backgroundColor: 'rgb(78, 174, 206)',
    '&:hover': {
        background: "rgb(130, 205, 230)",
      },
    color:'white',
    width:200,
    borderRadius:'10px',
    margin:'10px',
    }
  )


  export const ViewBookButton = styled(Button)(
    {
      backgroundColor: 'rgb(232, 111, 35)',
      '&:hover': {
        background: "rgb(231, 131, 69)",
      },
      color:'white',
      width:200,
      borderRadius:'10px',
      margin:'10px',
      }
    )

    export const AddBookButton= styled(Button)(
      {
        backgroundColor: 'rgb(25, 102, 158)',
        '&:hover': {
          background: "rgb(74, 143, 194)",
        },
        color:'white',
        width:120,
        borderRadius:'10px',
        margin:'10px',
        }
      )

  export const DrawerItem=({color, children, onClick})=>
        <ListItem>
          <ListItemButton
          sx={{
            backgroundColor:color,
            borderColor:color,
            color:'white',
            borderStyle:"solid",
            borderRadius:3,
            borderWidth:"1px",
            "&:hover":{
                backgroundColor:"white",
                color:color,
                
            }
        }}
        onClick={onClick}
          >
            <ListItemText>
            {children}
            </ListItemText>
          </ListItemButton>
        </ListItem>