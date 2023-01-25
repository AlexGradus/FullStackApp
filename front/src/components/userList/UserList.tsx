
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { s } from '.';
import axios from "axios";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import DoNotDisturbOffIcon from '@mui/icons-material/DoNotDisturbOff';
import DeleteIcon from '@mui/icons-material/Delete';
import { blockUser, deleteUser, unblockUser } from '../../api/api';
import { logout } from '../../store/appReducer';
import { useDispatch } from 'react-redux';
import { IuserData } from '../../interface/interface';



const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 250},
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 150 },
  { field: 'created', headerName: 'CreatedAt', width: 200 },
  { field: 'visited', headerName: 'VisitedAt', width: 200 },
  { field: 'status', headerName: 'Status', width: 150 },
];




const UserList = ()=> {

  const [userData, setUserData] = useState([] as IuserData[]);
  const [ checkedData, setCheckedData] = useState<string[]>([]);
  const [currentUser,setCurrentUser] = useState('');
  const dispatch = useDispatch();

  function getUsers(){
    try{
      axios.get("http://localhost:5000/api/auth/users")
      .then(res => {
       
        setUserData(res.data.user);
  
      })

    } catch(e){
      if (axios.isAxiosError(e))  {
        alert(e.response?.data.message );
      } 
    }
   
  }
  async function getCurrentuser(){
    try{
      const response = await axios.get("http://localhost:5000/api/auth/auth",{
          headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
      })
      setCurrentUser(response.data.user.id);
      
  } catch(e){
    if (axios.isAxiosError(e))  {
      alert(e.response?.data.message );
    } 
  }
  }
 
  useEffect(()=>{
      getCurrentuser();
      },[])

    
  const rowsData = userData.map((elem: { _id: string; name: string; email: string; createdAt: string; updatedAt: string; block: string; })=>({
    id:elem._id,
    name:elem.name,
    email:elem.email,
    created:elem.createdAt,
    visited:elem.updatedAt,
    status:elem.block,

  
  }));
  const deleteUsers = ()=> {
    deleteUser(checkedData);
    getUsers();
    if(checkedData.includes(currentUser)){
      dispatch(logout());
    }
  }
  const blockUsers = ()=> {
    blockUser(checkedData);
    getUsers();
    if(checkedData.includes(currentUser)){
      dispatch(logout());
    }
    
  
    
  }
  const unBlockUsers = ()=> {
    unblockUser(checkedData);
    getUsers();
  }
  useEffect(()=>{
    getUsers();
    },[deleteUsers,blockUsers,unBlockUsers])
  return (
    <>
    <div className={s.toolbar}>
      <Button onClick={deleteUsers}  startIcon={<DeleteIcon />}>
      </Button>
      <Button onClick={unBlockUsers}  startIcon={<DoNotDisturbOffIcon />}>
      </Button>
      <button className={s.button} onClick={blockUsers}>Block</button>

    </div>
     

      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rowsData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={(id)=>{
          setCheckedData(id as string[])
        }} />
    </div></>
  );
}
export default UserList;

