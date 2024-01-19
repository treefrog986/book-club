import { Button, DialogContent } from "@mui/material";
import { styled } from "@mui/system";

export const Title = styled(DialogContent)(
    () => `
    background-color: rgb(130, 216, 245);
  `,
  );
  
  export const SignInButton = styled(Button)(
    () =>`
    background-color: rgb(130, 216, 245);
    color:white;
    width:200px;
    borderRadius:100px;
    margin:10px
    `
  )