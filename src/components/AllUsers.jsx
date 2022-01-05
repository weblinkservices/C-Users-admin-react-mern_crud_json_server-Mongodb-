import { getUsers,deleteUser } from "../Services/api"
import { useEffect, useState } from "react";
import { Table, TableBody, TableRow,TableCell, TableHead, makeStyles, Button } from "@material-ui/core";
import {Link} from "react-router-dom";
const useStyle = makeStyles({
    table:{
        width:"90%",
        margin:'50px 0 0 50px'
    },
    thead:{
        '& > *':{  //all child apply this css
            background:'#000000',
            color:'#FFFFFF',
            fontSize:20
        },
    row:{
        '& > *':{
            fontSize:20
        }
    }

    }
})


const AllUsers = () => {
    const [users, setUsers]=useState([]);
    const classes = useStyle()
    useEffect(()=>{
        getAllUsers();
    },[])

    const getAllUsers=async()=>{
       const response = await getUsers();
       console.log(response);

       setUsers(response.data);
    }

    const deleteUserData= async(id)=>{
        await deleteUser(id);
        getAllUsers();// update

    }
    return (
        <div>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow className={classes.thead}>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>User Name</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {
                        users.map(user=>(
                            <TableRow className={classes.row}> 
                                <TableCell>{user._id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>
                                <Button variant="contained" color="primary" style={{marginRight:10}}
                                     component={Link} to={`/edit/${user._id}`}>Edit</Button>
                                 <Button variant="contained" onClick={()=>deleteUserData(user._id)} color="secondary">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        
        </div>
    )
}

export default AllUsers
