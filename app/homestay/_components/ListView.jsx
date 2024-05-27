'use client'
import React, { useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/table";
import {Pagination, PaginationItem, PaginationCursor} from "@nextui-org/pagination";
import {Tooltip} from "@nextui-org/tooltip";
import { IoCheckmarkCircle, IoCloseCircle,IoAlertCircle } from "react-icons/io5";
import { FaRegEdit, FaRegEye, FaTrash } from "react-icons/fa";
import Link from "next/link";
import WhiteModal from "@/components/WhiteModal";
import { toast } from "react-toastify";
import ConfirmModal from "@/components/ConfirmModel";


export default function  PaginatedTable({inputData,handleUpdate,handleDelete,handleChange}) {
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState('');
  const [isProcessing, setProcessing] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [delId, setDelId] = useState('');
  
  const rowsPerPage = 10;

  const pages = Math.ceil(inputData.length / rowsPerPage);

  //const [state,formAction] = useFormState(handleUpdate,{errors:''})
  //const [errMessage, setErrMessage] = useState(state.errors);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return inputData.slice(start, end);
  }, [page, inputData]);

  const handleUpdateClick = (e,val,id) => {
    console.log('Updating Status ' ,val,id)
    setProcessing(true)
    setMessage('Updating Status ')
    let callUpdate = async () => {
      let response = await handleUpdate(null,{status:val,id})
      if(response.errors){
        toast.error(response.errors)
        setProcessing(false)
      }else{
        setProcessing(false)
        toast.success('Homestay status Updated')
        handleChange(id,'u',val)
      }
      
    }
    callUpdate()
  }
  const handleDeleteClick = (e,id) => {
    console.log('1.  Homestay ' ,delId)
    setDeleting(true)
    setDelId(id)
  }

  const handleDeleteOperation = (e,id) => {
    console.log('Deleting Homestay ' ,delId)
    setDeleting(false)
    setProcessing(true)
    setMessage('Deleting Homestay')
    let callDelete = async () => {
      let response = await handleDelete(null,{id:delId})
      if(response.errors){
        setProcessing(false)
        toast.error(response.errors)
      }else{
        setProcessing(false)
        toast.success('Homestay Deleted Sucessfully')
        handleChange(delId,'d')
      }
    }
    callDelete()
  }

  const renderCell = React.useCallback((data, columnKey) => {
    const cellValue = data[columnKey];
    let val = ''
    switch (columnKey) {
      case "identity":
        val = (cellValue.trim()).split('^')
        return (
          <div className="flex flex-col text-xs md:text-sm">
            <h1 className="font-bold">{val[0]}</h1> 
            <p>{val[1]},</p>
            <p>{val[2]},</p>
            <p>{val[3]}</p>
          </div>
        );
        case "location":
          val = (cellValue.trim()).split('^')
          return (
            <div className="flex flex-col text-xs md:text-sm">
              <p>{val[0]},</p>
              <p>{val[1]},</p>
              <p>{val[2]}</p>
            </div>
          );
      case "type":
        val = (cellValue.trim()).split('^')
        return (
          <div className="flex align-middle flex-col md:flex-row md:flex-wrap gap-px">
              {val[0].trim()=='R' && <div className="flex items-center justify-center  p-1 
                rounded-full text-white  bg-orange-300 font-bold
                text-xs md:text-sm h-4 w-4 md:h-6 md:w-6">R</div>}
              {val[0].trim()=='U' && <div className="flex items-center justify-center  p-1 
                rounded-full text-white  bg-blue-300 font-bold
                text-xs md:text-sm h-4 w-4 md:h-6 md:w-6">U</div>}
              {val[1].trim()=='G' && <div className="flex items-center justify-center  p-1
                 text-white rounded-full   bg-green-300 font-bold
                 text-xs md:text-sm h-4 w-4 md:h-6 md:w-6">G</div>}
              {val[1].trim()=='P' && <div className="flex items-center justify-center  p-1
                 text-white rounded-full   bg-yellow-300 font-bold
                 text-xs md:text-sm h-4 w-4 md:h-6 md:w-6">P</div>}
              {val[2].trim()=='N' && <div className="flex items-center justify-center p-1
                 text-white rounded-full   bg-slate-300 font-bold
                 text-xs md:text-sm h-4 w-4 md:h-6 md:w-6">N</div>}
              {val[2].trim()=='H' && <div className="flex items-center justify-center  p-1
                 text-white rounded-full   bg-lime-300 font-bold
                 text-xs md:text-sm h-4 w-4 md:h-6 md:w-6">H</div>}
          </div>
        );
      case "register":
        val = cellValue.split('^')  
        return (
          <div className="flex align-middle text-xl">
            {
              val[0].trim()=='Yes' && <Tooltip color='success' content='Registered with DOT&CAV' placement='bottom'>
                <div className="flex align-middle">
                  <IoCheckmarkCircle className="m-2 text-green-500"/>
                </div>
              </Tooltip>
            }
            {
              val[0].trim()=='No' && <Tooltip color='danger' content='Not Registered with DOT&CAV' placement='bottom'>
                <div className="flex align-middle">
                  <IoCloseCircle className="m-2 text-red-500"/>
                </div>
              </Tooltip>
            }
            {
              val[1].trim()=='Yes' && <Tooltip color='success' content='Registered with Local Bodies' placement='bottom'>
                <div className="flex align-middle">
                  <IoCheckmarkCircle className="m-2 text-green-500"/>
                </div>
              </Tooltip>
            }
            {
              val[1].trim()=='No' && <Tooltip color='danger' content='Not Registered with Local Bodies' placement='bottom'>
                <div className="flex align-middle">
                  <IoCloseCircle className="m-2 text-red-500"/>
                </div>
              </Tooltip>
            }    
          </div>
        );
      case "isStatus":
        console.log('Status Test - ',cellValue)
        return (
          <div className="flex align-middle text-xl">
            {
              cellValue==1 && <Tooltip color='success' content='Active' placement='bottom'>
                <div className="flex align-middle">
                  <IoCheckmarkCircle className="m-2 text-green-500"/>
                </div>
              </Tooltip>
            }
            {
              cellValue==0 && <Tooltip color='danger' content='Deactive'>
              <div className="flex align-middle">
                <IoCloseCircle className="m-2 text-red-500"/>
              </div>
              </Tooltip>
            }
            {
              cellValue==-1 && <Tooltip color='warning' content='On Hold'>
                <div className="flex align-middle">
                  <IoAlertCircle className="m-2 text-yellow-500"/>
                </div>
              </Tooltip>
            } 
          </div>
        );
      case "statuswithid":
        val = cellValue.split("^")
        return (
          <div className="flex items-center flex-col md:flex-row text-sm md:text-xl ">
            <div>
              <Tooltip color='secondary' content='View Details'>
                  <Link href={`/homestay/${val[0].trim()}`} className="">
                    <FaRegEye className="m-px md:m-2 text-purple-500"/>
                  </Link>
              </Tooltip>
            </div>
            <div>
              <Tooltip color='primary' content='Edit Details'>
                  <Link href={`/homestay/${val[0].trim()}/edit`} className="">
                    <FaRegEdit className="m-px md:m-2 text-blue-500"/>
                  </Link>
              </Tooltip>
            </div>
            <div>
              <Tooltip color='danger' content='Delete Homestay'>
                  <button onClick={(e)=>handleDeleteClick(e,val[0].trim())}>
                    <FaTrash className="m-px md:m-2 text-red-500"/>
                  </button>
              </Tooltip>
            </div>
            <div className="flex flex-col md:flex-row md:flex-wrap">
                {
                    val[1].trim()==1 && 
                    <div  className="flex flex-col md:flex-row">
                      <Tooltip color='warning' content='On hold' placement='bottom' >
                        {/* //<form action={formAction.bind(null,{status:0,id:val[0].trim()})}>  */}
                            <button className="flex align-middle" onClick={(e)=>handleUpdateClick(e,-1,val[0].trim())}>
                                <IoAlertCircle className="m-px md:m-2 text-yellow-500"/>
                            </button>
                      </Tooltip>
                      <Tooltip color='danger' content='Deactivate' placement='bottom' >
                        {/* //<form action={formAction.bind(null,{status:0,id:val[0].trim()})}>  */}
                            <button className="flex align-middle" onClick={(e)=>handleUpdateClick(e,0,val[0].trim())}>
                              <IoCloseCircle className="m-px md:m-2 text-red-500"/>
                            </button>
                      </Tooltip>
                    </div>
                }
                {
                    val[1].trim()==0 && 
                    <div  className="flex flex-col md:flex-row">
                      <Tooltip color='success' content='Activate' placement='bottom' >
                        {/* //<form action={formAction.bind(null,{status:0,id:val[0].trim()})}>  */}
                            <button className="flex align-middle" onClick={(e)=>handleUpdateClick(e,1,val[0].trim())}>
                              <IoCheckmarkCircle className="m-px md:m-2 text-green-500"/>
                            </button>
                      </Tooltip>
                      <Tooltip color='warning' content='On hold' placement='bottom' >
                        {/* //<form action={formAction.bind(null,{status:0,id:val[0].trim()})}>  */}
                            <button className="flex align-middle" onClick={(e)=>handleUpdateClick(e,-1,val[0].trim())}>
                                <IoAlertCircle className="m-px md:m-2 text-yellow-500"/>
                            </button>
                      </Tooltip>
                      
                    </div>
                }
                {
                    val[1].trim()==-1 && 
                    <div  className="flex flex-col md:flex-row">
                      <Tooltip color='success' content='Activate' placement='bottom' >
                        {/* //<form action={formAction.bind(null,{status:0,id:val[0].trim()})}>  */}
                            <button className="flex align-middle" onClick={(e)=>handleUpdateClick(e,1,val[0].trim())}>
                              <IoCheckmarkCircle className="m-px md:m-2 text-green-500"/>
                            </button>
                      </Tooltip>
                      <Tooltip color='danger' content='Deactivate' placement='bottom' >
                        {/* //<form action={formAction.bind(null,{status:0,id:val[0].trim()})}>  */}
                            <button className="flex align-middle" onClick={(e)=>handleUpdateClick(e,0,val[0].trim())}>
                              <IoCloseCircle className="m-px md:m-2 text-red-500"/>
                            </button>
                      </Tooltip>
                    </div>
                }
                
            </div>
            
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

    

  return (
    <div className="sm:mx-[3%] md:mx-[5%] lg:mx-[10%] overflow-scroll">
      
      <Table 
        aria-label="Homestay Table"
        bottomContent={
          <div className="flex w-full p-5 justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="success"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px] min-w-[360px]",
          th: 'bg-blue-500 text-white text-md'
        }}
        isStriped='true'

      >
        <TableHeader 
          classNames={{
              wrapper: "bg-blue-500 text-white",
            }}
        >
          <TableColumn key="identity">HomeStay</TableColumn>
          <TableColumn key="type">Type</TableColumn>
          <TableColumn key="register">Registration</TableColumn>
          <TableColumn key="location">Location</TableColumn>
          <TableColumn key="isStatus">Status</TableColumn>
          <TableColumn key="statuswithid">Action</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No homestay found"} items={items}>
          {(item) => (
            <TableRow key={item._id} className="hover:font-bold">
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
       
      <WhiteModal status={isProcessing} title={message}/>
      <ConfirmModal isDeleting={isDeleting} setDeleting={setDeleting}  handleDeleteOperation={handleDeleteOperation}
         delId={delId}/>
    </div>
    
  );
}
